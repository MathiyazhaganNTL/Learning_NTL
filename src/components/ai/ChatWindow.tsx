import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, BookOpen, Target, Brain, HelpCircle, Trash2, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MessageBubble } from './MessageBubble';
import type { ChatMessage } from '@/api/ai';

interface ChatWindowProps {
    isOpen: boolean;
    messages: ChatMessage[];
    isTyping: boolean;
    onSendMessage: (message: string) => void;
    onClearChat: () => void;
}

// Quick action suggestions for new conversations
const QUICK_ACTIONS = [
    { icon: BookOpen, label: 'Course Guidance', prompt: 'Can you suggest courses based on my interests?' },
    { icon: Target, label: 'Study Plan', prompt: 'Help me create a weekly study plan' },
    { icon: Brain, label: 'Explain a Concept', prompt: 'Can you explain a technical concept to me?' },
    { icon: HelpCircle, label: 'FAQ', prompt: 'Tell me about certifications and enrollment' },
];

export function ChatWindow({ isOpen, messages, isTyping, onSendMessage, onClearChat }: ChatWindowProps) {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 350);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;
        onSendMessage(input.trim());
        setInput('');
    };

    const handleQuickAction = (prompt: string) => {
        if (isTyping) return;
        onSendMessage(prompt);
    };

    const showQuickActions = messages.length <= 1;

    return (
        <div
            className={cn(
                'fixed z-50 transition-all duration-300 ease-in-out',
                // Desktop: card floating above the button
                'bottom-24 right-6 w-[400px] max-h-[600px]',
                // Mobile: full-width bottom sheet
                'max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:w-full max-sm:max-h-[85vh] max-sm:rounded-b-none',
                // Open/close animation
                isOpen
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                    : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
            )}
        >
            <div className="flex flex-col h-[600px] max-sm:h-[85vh] bg-white rounded-2xl max-sm:rounded-b-none shadow-2xl shadow-black/15 border border-gray-200 overflow-hidden">

                {/* ─── Header ─── */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-[#7B1E3A] text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shadow-inner">
                            <BrainCircuit className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold tracking-tight leading-none">Learn2PSG AI</h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <span className="text-[11px] text-white/80 font-medium">Online</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        {messages.length > 1 && (
                            <button
                                onClick={onClearChat}
                                className="p-2 rounded-lg hover:bg-white/15 transition-colors duration-200"
                                title="Clear conversation"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* ─── Messages Area ─── */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F5F5F5] scrollbar-thin">

                    {/* Welcome message (always shown when no conversation) */}
                    {messages.length <= 1 && (
                        <div className="text-center py-4 animate-in fade-in duration-500">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm mx-auto mb-3 flex items-center justify-center">
                                <BrainCircuit className="w-8 h-8 text-[#7B1E3A]" />
                            </div>
                            <h4 className="font-bold text-[#222222] text-base">Welcome to Learn2PSG AI</h4>
                            <p className="text-xs text-[#666666] mt-1 max-w-[260px] mx-auto leading-relaxed">
                                Your personal academic mentor. I can help with courses, study plans, concept explanations, and more.
                            </p>
                        </div>
                    )}

                    {/* Messages */}
                    {messages.map((msg) => (
                        <MessageBubble
                            key={msg.id}
                            content={msg.content}
                            role={msg.role}
                            timestamp={msg.timestamp}
                        />
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex items-center gap-2.5 animate-in fade-in duration-300">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B1E3A] to-[#a13350] flex items-center justify-center shadow-sm">
                                <BrainCircuit className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-[#7B1E3A]/40 rounded-full animate-bounce [animation-delay:0ms]" />
                                    <span className="w-2 h-2 bg-[#7B1E3A]/40 rounded-full animate-bounce [animation-delay:150ms]" />
                                    <span className="w-2 h-2 bg-[#7B1E3A]/40 rounded-full animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* ─── Quick Actions ─── */}
                {showQuickActions && (
                    <div className="px-4 py-3 border-t border-gray-100 bg-white shrink-0">
                        <div className="flex items-center gap-1.5 mb-2">
                            <Sparkles className="w-3 h-3 text-[#7B1E3A]" />
                            <span className="text-[11px] font-semibold text-[#666666] uppercase tracking-wider">Quick Actions</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {QUICK_ACTIONS.map((action) => (
                                <button
                                    key={action.label}
                                    onClick={() => handleQuickAction(action.prompt)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F5F5F5] hover:bg-[#7B1E3A]/5 border border-transparent hover:border-[#7B1E3A]/20 text-left transition-all duration-200 group"
                                >
                                    <action.icon className="w-3.5 h-3.5 text-[#7B1E3A] shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-medium text-[#222222] truncate">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─── Input Area ─── */}
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 bg-white shrink-0"
                >
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about courses, study plans..."
                        disabled={isTyping}
                        className={cn(
                            'flex-1 px-4 py-2.5 rounded-xl text-sm bg-[#F5F5F5] border border-gray-200',
                            'placeholder:text-[#999999] text-[#222222]',
                            'focus:outline-none focus:ring-2 focus:ring-[#7B1E3A]/20 focus:border-[#7B1E3A]/30',
                            'transition-all duration-200',
                            'disabled:opacity-60'
                        )}
                        id="ai-chat-input"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                            'bg-[#7B1E3A] hover:bg-[#6D0F1B] text-white',
                            'transition-all duration-200',
                            'disabled:opacity-40 disabled:cursor-not-allowed',
                            'hover:shadow-md hover:shadow-[#7B1E3A]/20',
                            'active:scale-95'
                        )}
                        id="ai-send-button"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>

                {/* ─── Footer ─── */}
                <div className="px-4 py-1.5 text-center bg-white border-t border-gray-100 shrink-0">
                    <p className="text-[10px] text-[#999999]">
                        Learn2PSG AI • Academic Assistance Only
                    </p>
                </div>
            </div>
        </div>
    );
}
