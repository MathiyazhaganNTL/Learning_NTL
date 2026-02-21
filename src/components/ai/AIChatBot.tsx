import { useState, useCallback, useEffect } from 'react';
import { FloatingButton } from './FloatingButton';
import { ChatWindow } from './ChatWindow';
import { askAI } from '@/api/ai';
import type { ChatMessage } from '@/api/ai';

// Generate unique message IDs
let messageIdCounter = 0;
function generateId(): string {
    return `msg_${Date.now()}_${++messageIdCounter}`;
}

export function AIChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);

    const toggleChat = useCallback(() => {
        setIsOpen((prev) => {
            if (!prev) {
                // Opening chat — clear unread indicator
                setHasUnread(false);
            }
            return !prev;
        });
    }, []);

    const closeChat = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Close on ESC key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeChat();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeChat]);

    const handleSendMessage = useCallback(async (content: string) => {
        // Add user message
        const userMessage: ChatMessage = {
            id: generateId(),
            role: 'user',
            content,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
            // Get AI response (pass history for context)
            const response = await askAI(content, messages);

            const assistantMessage: ChatMessage = {
                id: generateId(),
                role: 'assistant',
                content: response,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);

            // If chat is closed, show unread indicator
            if (!isOpen) {
                setHasUnread(true);
            }
        } catch (error) {
            console.error('Failed to get AI response:', error);

            const errorMessage: ChatMessage = {
                id: generateId(),
                role: 'assistant',
                content: "I'm sorry, I encountered an error. Please try again.",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    }, [messages, isOpen]);

    const handleClearChat = useCallback(() => {
        setMessages([]);
    }, []);

    return (
        <>
            {/* Chat Window */}
            <ChatWindow
                isOpen={isOpen}
                messages={messages}
                isTyping={isTyping}
                onSendMessage={handleSendMessage}
                onClearChat={handleClearChat}
                onClose={closeChat}
            />

            {/* Floating Action Button */}
            <FloatingButton
                isOpen={isOpen}
                onClick={toggleChat}
                hasUnread={hasUnread}
            />
        </>
    );
}
