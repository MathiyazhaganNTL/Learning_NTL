/**
 * Learn2PSG AI Learning Assistant - Qubrid Platform Integration
 * 
 * Setup:
 * 1. Get your API key from https://platform.qubrid.com/
 * 2. Add VITE_QUBRID_API_KEY=your_api_key_here to your .env file
 * 3. Restart the dev server
 * 
 * Uses Qubrid's OpenAI-compatible endpoint with Llama 3.3 70B Instruct.
 */

const QUBRID_API_KEY = import.meta.env.VITE_QUBRID_API_KEY || '';

// Qubrid OpenAI-compatible endpoint
// In development, we use Vite proxy to avoid CORS issues
// The proxy rewrites /api/qubrid → https://platform.qubrid.com/v1
const QUBRID_BASE_URL = import.meta.env.DEV ? '/api/qubrid' : 'https://platform.qubrid.com/v1';

// Model to use — Llama 3.3 70B Instruct (as shown in Qubrid playground)
const MODEL = 'meta-llama/Llama-3.3-70B-Instruct';

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2000;
const REQUEST_TIMEOUT_MS = 60000; // 60 seconds timeout

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
 * Build the messages array for the OpenAI-compatible chat completions API.
 */
function buildMessages(
    message: string,
    conversationHistory: ChatMessage[]
): Array<{ role: 'system' | 'user' | 'assistant'; content: string }> {
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        { role: 'system', content: SYSTEM_PROMPT },
    ];

    // Add conversation history (last 10 messages to stay within context window)
    const recentHistory = conversationHistory.slice(-10);
    for (const msg of recentHistory) {
        messages.push({
            role: msg.role,
            content: msg.content,
        });
    }

    // Add the current user message
    messages.push({ role: 'user', content: message });

    return messages;
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

export async function askAI(
    message: string,
    conversationHistory: ChatMessage[] = []
): Promise<string> {
    if (!QUBRID_API_KEY || QUBRID_API_KEY === 'your_qubrid_api_key_here') {
        return "⚠️ **AI Assistant not configured yet.**\n\nTo enable me, please:\n1. Get a Qubrid API key from [Qubrid Platform](https://platform.qubrid.com/)\n2. Add `VITE_QUBRID_API_KEY=your_api_key` to your `.env` file\n3. Restart the dev server\n\nI'll be ready to help you learn once connected! 🎓";
    }

    try {
        const chatMessages = buildMessages(message, conversationHistory);

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            try {
                const url = `${QUBRID_BASE_URL}/chat/completions`;

                console.log(`[Learn2PSG AI] Sending request to Qubrid (attempt ${attempt + 1}/${MAX_RETRIES + 1})...`);

                const response = await fetchWithTimeout(
                    url,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${QUBRID_API_KEY}`,
                        },
                        body: JSON.stringify({
                            model: MODEL,
                            messages: chatMessages,
                            max_tokens: 4096,
                            temperature: 0.7,
                            top_p: 0.9,
                            stream: false,
                        }),
                    },
                    REQUEST_TIMEOUT_MS
                );

                // Rate limited — wait and retry
                if (response.status === 429) {
                    console.warn(`[Learn2PSG AI] Rate limited, attempt ${attempt + 1}/${MAX_RETRIES + 1}`);
                    if (attempt < MAX_RETRIES) {
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (attempt + 1)));
                        continue;
                    }
                    return "⏳ **Rate limit reached.**\n\nThe AI service is receiving too many requests. Please wait a moment and try again.";
                }

                // Model is loading or temporarily unavailable
                if (response.status === 503) {
                    console.warn(`[Learn2PSG AI] Service temporarily unavailable, attempt ${attempt + 1}/${MAX_RETRIES + 1}`);
                    if (attempt < MAX_RETRIES) {
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (attempt + 1)));
                        continue;
                    }
                    return "⏳ **Model is loading.**\n\nThe AI model is warming up. Please wait 20-30 seconds and try again.";
                }

                // Invalid API key
                if (response.status === 401 || response.status === 403) {
                    return "⚠️ **Invalid API Key.**\n\nYour Qubrid API key appears to be invalid or expired.\n\nPlease:\n1. Check your API key at [Qubrid Platform](https://platform.qubrid.com/)\n2. Update `VITE_QUBRID_API_KEY` in your `.env` file\n3. Restart the dev server";
                }

                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    console.error(`[Learn2PSG AI] API error:`, response.status, errorData);
                    throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
                }

                const data = await response.json();
                console.log('[Learn2PSG AI] Response received successfully');

                // OpenAI-compatible response format
                const text = data?.choices?.[0]?.message?.content?.trim();

                if (!text) {
                    console.error('[Learn2PSG AI] Empty response:', data);
                    throw new Error('No response text received from Qubrid API');
                }

                return text;
            } catch (fetchError) {
                if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
                    console.warn(`[Learn2PSG AI] Request timed out, attempt ${attempt + 1}/${MAX_RETRIES + 1}`);
                } else {
                    console.warn(`[Learn2PSG AI] Attempt ${attempt + 1} failed:`, fetchError);
                }

                if (attempt === MAX_RETRIES) {
                    console.error('[Learn2PSG AI] All retries exhausted');
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
