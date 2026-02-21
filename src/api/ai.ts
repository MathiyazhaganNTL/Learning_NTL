/**
 * Learn2PSG AI Learning Assistant - Gemini API Integration
 * 
 * Setup:
 * 1. Get your API key from https://aistudio.google.com/apikey
 * 2. Add VITE_GEMINI_API_KEY=your_key_here to your .env file
 * 3. Restart the dev server
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// Fallback chain: try primary model first, then fall back
const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash'];
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2000;

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

export async function askAI(
    message: string,
    conversationHistory: ChatMessage[] = []
): Promise<string> {
    if (!GEMINI_API_KEY) {
        return "⚠️ **AI Assistant not configured yet.**\n\nTo enable me, please:\n1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)\n2. Add `VITE_GEMINI_API_KEY=your_key` to your `.env` file\n3. Restart the dev server\n\nI'll be ready to help you learn once connected! 🎓";
    }

    try {
        // Build conversation contents for Gemini
        const contents = [
            {
                role: 'user',
                parts: [{ text: SYSTEM_PROMPT }],
            },
            {
                role: 'model',
                parts: [{ text: 'Understood. I am Learn2PSG AI, your Academic Learning Assistant. I will only assist with learning-related topics. How can I help you today?' }],
            },
            // Include conversation history for context
            ...conversationHistory.map((msg) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            })),
            // Current message
            {
                role: 'user',
                parts: [{ text: message }],
            },
        ];

        const requestBody = JSON.stringify({
            contents,
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
            safetySettings: [
                {
                    category: 'HARM_CATEGORY_HARASSMENT',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                },
                {
                    category: 'HARM_CATEGORY_HATE_SPEECH',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                },
            ],
        });

        // Try each model with retries
        for (const model of MODELS) {
            for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
                try {
                    const url = `${GEMINI_BASE_URL}/${model}:generateContent?key=${GEMINI_API_KEY}`;

                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: requestBody,
                    });

                    // Rate limited — wait and retry
                    if (response.status === 429) {
                        console.warn(`Rate limited on ${model}, attempt ${attempt + 1}/${MAX_RETRIES + 1}`);
                        if (attempt < MAX_RETRIES) {
                            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (attempt + 1)));
                            continue;
                        }
                        // Move to next model
                        break;
                    }

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => null);
                        console.error(`Gemini API error (${model}):`, errorData);
                        throw new Error(`API request failed with status ${response.status}`);
                    }

                    const data = await response.json();
                    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

                    if (!text) {
                        throw new Error('No response text received from Gemini');
                    }

                    return text;
                } catch (fetchError) {
                    if (attempt === MAX_RETRIES) {
                        console.warn(`All retries exhausted for ${model}, trying next model...`);
                    }
                }
            }
        }

        // All models and retries exhausted
        return "I'm experiencing high demand right now. Please wait a moment and try again. 🎓\n\n_If this keeps happening, your API key may have hit its free-tier rate limit. Wait 1-2 minutes before trying again._";
    } catch (error) {
        console.error('AI Assistant error:', error);
        return `I'm having trouble connecting right now. Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key configuration and try again.`;
    }
}
