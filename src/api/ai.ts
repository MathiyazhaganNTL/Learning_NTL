/**
 * Learn2PSG AI Learning Assistant - Manus AI Platform Integration
 * 
 * Setup:
 * 1. Get your API key from Manus AI platform
 * 2. Add VITE_MANUS_API_KEY=your_api_key_here to your .env file
 * 3. Restart the dev server
 * 
 * Uses Manus AI Task API:
 * - POST /v1/tasks → create a task
 * - GET  /v1/tasks/{id} → poll until completed
 */

const MANUS_API_KEY = import.meta.env.VITE_MANUS_API_KEY || '';

// Manus AI API endpoint
// In development, we use Vite proxy to avoid CORS issues
// The proxy rewrites /api/manus → https://api.manus.ai/v1
const MANUS_BASE_URL = import.meta.env.DEV ? '/api/manus' : 'https://api.manus.ai/v1';

// Agent profile to use (manus-1.6-lite for fast chat, manus-1.6 for full, manus-1.6-max for complex)
const AGENT_PROFILE = 'manus-1.6-lite';

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2000;
const REQUEST_TIMEOUT_MS = 30000; // 30 seconds per individual request
const TASK_POLL_INTERVAL_MS = 3000; // Poll every 3 seconds
const TASK_MAX_WAIT_MS = 120000; // Max 2 minutes to wait for task completion

// System prompt that constrains the AI to learning-related topics only
const SYSTEM_PROMPT = `You are "Learn2PSG AI", an Academic Learning Assistant embedded in the Learn2PSG Learning Management System.

Your role:
- You are a supportive, professional academic mentor
- You ONLY help with learning-related topics
- You provide course guidance, study plans, concept explanations, score analysis, and FAQ support
- You motivate learners and help them stay consistent

Capabilities:
1. Course Guidance: Suggest next courses, explain roadmaps, recommend based on skill level
2. Score & Progress Analysis: Analyze performance, suggest improvement areas, motivate
3. Concept Explanation: Explain technical topics clearly with simple examples and short summaries
4. Study Planner: Create weekly study plans, time management suggestions
5. FAQ: Course availability, certification info, enrollment help

Rules:
- NEVER discuss topics unrelated to education, learning, courses, or academic growth
- If asked about unrelated topics, politely redirect to learning-related assistance
- Keep responses concise, structured, and actionable
- Use bullet points and numbered lists for clarity
- Be encouraging and supportive in tone
- Format responses with markdown when helpful

Tone: Professional, supportive, motivating, structured.
You represent a university-grade Academic Intelligence Layer.`;

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

/**
 * Deeply extract the actual AI response text from a potentially nested API response.
 * Manus API can return various structures; this normalizes them all to a clean string.
 */
function extractTextFromResponse(data: unknown): string {
    if (!data) return '';

    // If it's already a plain string, return it
    if (typeof data === 'string') {
        return data.trim();
    }

    // If it's not an object, stringify it
    if (typeof data !== 'object') {
        return String(data);
    }

    const obj = data as Record<string, unknown>;

    // ── OpenAI-style: choices[].message.content ──
    if (Array.isArray(obj.choices) && obj.choices.length > 0) {
        const choice = obj.choices[0] as Record<string, unknown>;
        if (choice?.message && typeof choice.message === 'object') {
            const msg = choice.message as Record<string, unknown>;
            if (typeof msg.content === 'string') {
                return msg.content.trim();
            }
        }
        if (typeof choice?.text === 'string') {
            return choice.text.trim();
        }
    }

    // ── Array of messages: find the last assistant message ──
    if (Array.isArray(obj.messages) && obj.messages.length > 0) {
        // Walk backwards to find the last assistant message
        for (let i = obj.messages.length - 1; i >= 0; i--) {
            const msg = obj.messages[i] as Record<string, unknown>;
            if (msg?.role === 'assistant' && typeof msg.content === 'string') {
                return msg.content.trim();
            }
        }
    }

    // ── Array of content items (some APIs use [{type:"output_text", text:"..."}]) ──
    if (Array.isArray(obj.content)) {
        for (const item of obj.content) {
            if (typeof item === 'object' && item !== null) {
                const ci = item as Record<string, unknown>;
                if (typeof ci.text === 'string') {
                    return ci.text.trim();
                }
                if (typeof ci.content === 'string') {
                    return ci.content.trim();
                }
            }
            if (typeof item === 'string') {
                return item.trim();
            }
        }
    }

    // ── If response is an array at top level (e.g. an array of conversation turns) ──
    if (Array.isArray(data)) {
        // Try to find the last assistant-role item
        for (let i = (data as unknown[]).length - 1; i >= 0; i--) {
            const item = (data as unknown[])[i];
            if (typeof item === 'object' && item !== null) {
                const entry = item as Record<string, unknown>;
                if (entry.role === 'assistant') {
                    // Try to extract text from the assistant entry
                    if (typeof entry.content === 'string') {
                        return entry.content.trim();
                    }
                    if (Array.isArray(entry.content)) {
                        for (const c of entry.content) {
                            if (typeof c === 'object' && c !== null) {
                                const cc = c as Record<string, unknown>;
                                if (typeof cc.text === 'string') return cc.text.trim();
                            }
                        }
                    }
                    // Recurse into the entry
                    const nested = extractTextFromResponse(entry.content || entry.text || entry.output || entry.result);
                    if (nested) return nested;
                }
            }
        }
        // Fallback: try the last item if no assistant role found
        const lastItem = (data as unknown[])[(data as unknown[]).length - 1];
        const recursed = extractTextFromResponse(lastItem);
        if (recursed) return recursed;
    }

    // ── Direct string fields (common response shapes) ──
    const textKeys = ['result', 'output', 'content', 'text', 'response', 'answer', 'message', 'reply', 'data'];
    for (const key of textKeys) {
        if (typeof obj[key] === 'string' && obj[key]) {
            return (obj[key] as string).trim();
        }
    }

    // ── Nested objects in those fields ──
    for (const key of textKeys) {
        if (obj[key] && typeof obj[key] === 'object') {
            const nested = extractTextFromResponse(obj[key]);
            if (nested && !nested.startsWith('{') && !nested.startsWith('[')) {
                return nested;
            }
        }
    }

    // ── Last resort: stringify but try to make it readable ──
    console.warn('[Learn2PSG AI] Could not extract clean text, raw response:', obj);
    // Don't return raw JSON to the user — return a friendly fallback
    return "I received a response but couldn't parse it properly. Please try asking your question again.";
}

/**
 * Build a prompt string from conversation history for the Manus task.
 */
function buildPrompt(
    message: string,
    conversationHistory: ChatMessage[]
): string {
    let prompt = `${SYSTEM_PROMPT}\n\n`;

    // Add conversation history (last 10 messages)
    const recentHistory = conversationHistory.slice(-10);
    if (recentHistory.length > 0) {
        prompt += '--- Conversation History ---\n';
        for (const msg of recentHistory) {
            const role = msg.role === 'user' ? 'Student' : 'Learn2PSG AI';
            prompt += `${role}: ${msg.content}\n\n`;
        }
        prompt += '--- End of History ---\n\n';
    }

    prompt += `Student: ${message}\n\nLearn2PSG AI:`;
    return prompt;
}

/**
 * Fetch with timeout support
 */
async function fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeoutMs: number
): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        return response;
    } finally {
        clearTimeout(timeoutId);
    }
}

/**
 * Create a Manus AI task and poll until it completes.
 */
async function createAndPollTask(prompt: string): Promise<string> {
    const createUrl = `${MANUS_BASE_URL}/tasks`;

    console.log('[Learn2PSG AI] Creating Manus task...');

    // Step 1: Create the task
    const createResponse = await fetchWithTimeout(
        createUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'API_KEY': MANUS_API_KEY,
            },
            body: JSON.stringify({
                prompt: prompt,
                agentProfile: AGENT_PROFILE,
                taskMode: 'chat',
            }),
        },
        REQUEST_TIMEOUT_MS
    );

    // Handle error responses
    if (createResponse.status === 429) {
        return "⏳ **Rate limit reached.**\n\nThe AI service is receiving too many requests. Please wait a moment and try again.";
    }

    if (createResponse.status === 401 || createResponse.status === 403) {
        return "⚠️ **Invalid API Key.**\n\nYour Manus API key appears to be invalid or expired.\n\nPlease:\n1. Check your API key on the Manus AI platform\n2. Update `VITE_MANUS_API_KEY` in your `.env` file\n3. Restart the dev server";
    }

    if (createResponse.status === 503) {
        return "⏳ **Service temporarily unavailable.**\n\nThe Manus AI service is temporarily down. Please try again in a moment.";
    }

    if (!createResponse.ok) {
        const errorData = await createResponse.json().catch(() => null);
        console.error('[Learn2PSG AI] Task creation failed:', createResponse.status, errorData);
        throw new Error(`Task creation failed with status ${createResponse.status}: ${JSON.stringify(errorData)}`);
    }

    const taskData = await createResponse.json();
    const taskId = taskData?.id || taskData?.task_id || taskData?.taskId;

    if (!taskId) {
        console.error('[Learn2PSG AI] No task ID in response:', taskData);
        // If the response contains a direct result (some Manus responses are immediate)
        const directResult = extractTextFromResponse(taskData);
        if (directResult) {
            return directResult;
        }
        throw new Error('No task ID received from Manus API');
    }

    console.log(`[Learn2PSG AI] Task created: ${taskId}, polling for completion...`);

    // Step 2: Poll for task completion
    const startTime = Date.now();
    while (Date.now() - startTime < TASK_MAX_WAIT_MS) {
        await new Promise(resolve => setTimeout(resolve, TASK_POLL_INTERVAL_MS));

        const statusUrl = `${MANUS_BASE_URL}/tasks/${taskId}`;
        const statusResponse = await fetchWithTimeout(
            statusUrl,
            {
                method: 'GET',
                headers: {
                    'API_KEY': MANUS_API_KEY,
                },
            },
            REQUEST_TIMEOUT_MS
        );

        if (!statusResponse.ok) {
            console.warn(`[Learn2PSG AI] Task status check failed: ${statusResponse.status}`);
            continue;
        }

        const statusData = await statusResponse.json();
        const status = statusData?.status?.toLowerCase();

        console.log(`[Learn2PSG AI] Task ${taskId} status: ${status}`);

        if (status === 'completed' || status === 'done' || status === 'finished' || status === 'success') {
            const result = extractTextFromResponse(statusData);
            if (result) {
                return result;
            }
            throw new Error('Task completed but no result found');
        }

        if (status === 'failed' || status === 'error' || status === 'cancelled') {
            const errorMsg = statusData?.error || statusData?.message || 'Task failed';
            throw new Error(`Manus task failed: ${errorMsg}`);
        }

        // status is 'pending', 'running', 'processing', etc. — continue polling
    }

    return "⏳ **Task is still processing.**\n\nThe AI is taking longer than expected. Please try a simpler question or try again later.";
}

export async function askAI(
    message: string,
    conversationHistory: ChatMessage[] = []
): Promise<string> {
    if (!MANUS_API_KEY || MANUS_API_KEY === 'your_manus_api_key_here') {
        return "⚠️ **AI Assistant not configured yet.**\n\nTo enable me, please:\n1. Get a Manus API key from the Manus AI platform\n2. Add `VITE_MANUS_API_KEY=your_api_key` to your `.env` file\n3. Restart the dev server\n\nI'll be ready to help you learn once connected! 🎓";
    }

    try {
        const prompt = buildPrompt(message, conversationHistory);

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            try {
                console.log(`[Learn2PSG AI] Attempt ${attempt + 1}/${MAX_RETRIES + 1}...`);
                const result = await createAndPollTask(prompt);
                console.log('[Learn2PSG AI] Response received successfully');
                return result;
            } catch (fetchError) {
                if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
                    console.warn(`[Learn2PSG AI] Request timed out, attempt ${attempt + 1}/${MAX_RETRIES + 1}`);
                } else {
                    console.warn(`[Learn2PSG AI] Attempt ${attempt + 1} failed:`, fetchError);
                }

                if (attempt === MAX_RETRIES) {
                    console.error('[Learn2PSG AI] All retries exhausted');
                }

                if (attempt < MAX_RETRIES) {
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (attempt + 1)));
                }
            }
        }

        // All retries exhausted
        return "I'm experiencing high demand right now. Please wait a moment and try again. 🎓\n\n_If this keeps happening, please check your API key configuration and try again._";
    } catch (error) {
        console.error('[Learn2PSG AI] Fatal error:', error);
        return `I'm having trouble connecting right now. Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key configuration and try again.`;
    }
}
