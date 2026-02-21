import { cn } from '@/lib/utils';
import { User, BrainCircuit } from 'lucide-react';

interface MessageBubbleProps {
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

function formatContent(text: string): string {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 bg-black/5 rounded text-[#7B1E3A] text-xs font-mono">$1</code>')
        .replace(/\n/g, '<br />');
}

export function MessageBubble({ content, role, timestamp }: MessageBubbleProps) {
    const isUser = role === 'user';

    return (
        <div
            className={cn(
                'flex gap-2.5 animate-in slide-in-from-bottom-2 fade-in duration-300',
                isUser ? 'flex-row-reverse' : 'flex-row'
            )}
        >
            {/* Avatar */}
            <div
                className={cn(
                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm',
                    isUser
                        ? 'bg-[#7B1E3A] text-white'
                        : 'bg-gradient-to-br from-[#7B1E3A] to-[#a13350] text-white'
                )}
            >
                {isUser ? (
                    <User className="w-4 h-4" />
                ) : (
                    <BrainCircuit className="w-4 h-4" />
                )}
            </div>

            {/* Message Bubble */}
            <div className={cn('max-w-[80%] flex flex-col', isUser ? 'items-end' : 'items-start')}>
                <div
                    className={cn(
                        'px-4 py-2.5 text-sm leading-relaxed',
                        isUser
                            ? 'bg-[#7B1E3A] text-white rounded-2xl rounded-tr-md shadow-md'
                            : 'bg-white text-[#222222] rounded-2xl rounded-tl-md shadow-sm border border-gray-100'
                    )}
                    dangerouslySetInnerHTML={{ __html: formatContent(content) }}
                />
                <span className="text-[10px] text-[#999999] mt-1 px-1">
                    {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
}
