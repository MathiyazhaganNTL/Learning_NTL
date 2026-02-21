import { BrainCircuit, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingButtonProps {
    isOpen: boolean;
    onClick: () => void;
    hasUnread: boolean;
}

export function FloatingButton({ isOpen, onClick, hasUnread }: FloatingButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'fixed bottom-6 right-6 z-50 flex items-center justify-center',
                'w-14 h-14 rounded-full shadow-lg',
                'bg-[#7B1E3A] hover:bg-[#6D0F1B]',
                'transition-all duration-300 ease-in-out',
                'hover:scale-110 hover:shadow-xl hover:shadow-[#7B1E3A]/25',
                'active:scale-95',
                'focus:outline-none focus:ring-2 focus:ring-[#7B1E3A]/50 focus:ring-offset-2',
                'group',
                isOpen && 'rotate-0'
            )}
            aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
            id="ai-assistant-toggle"
        >
            {/* Pulse ring animation when not open */}
            {!isOpen && (
                <>
                    <span className="absolute inset-0 rounded-full bg-[#7B1E3A] animate-ping opacity-20" />
                    <span className="absolute inset-0 rounded-full bg-[#7B1E3A] animate-pulse opacity-10" />
                </>
            )}

            {/* Icon transition */}
            <div className="relative w-7 h-7 flex items-center justify-center">
                {isOpen ? (
                    <X className="w-6 h-6 text-white transition-transform duration-300" />
                ) : (
                    <BrainCircuit className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
                )}
            </div>

            {/* Unread indicator */}
            {!isOpen && hasUnread && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white" />
                </span>
            )}
        </button>
    );
}
