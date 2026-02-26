import { cn } from '@/lib/utils';
import { User, BrainCircuit } from 'lucide-react';

interface MessageBubbleProps {
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

/**
 * Convert light markdown to safe HTML for rendering in chat bubbles.
 * Handles: headings, bold, italic, inline code, bullet lists, numbered lists, and line breaks.
 */
function formatContent(text: string): string {
    // Normalize line endings
    let html = text.replace(/\r\n/g, '\n');

    // Split into lines for block-level processing
    const lines = html.split('\n');
    const outputLines: string[] = [];
    let inUl = false;
    let inOl = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // ── Headings ──
        if (/^###\s+(.*)/.test(line)) {
            closeList();
            line = line.replace(/^###\s+(.*)/, '<strong style="font-size:0.85rem;display:block;margin:8px 0 4px;">$1</strong>');
            outputLines.push(line);
            continue;
        }
        if (/^##\s+(.*)/.test(line)) {
            closeList();
            line = line.replace(/^##\s+(.*)/, '<strong style="font-size:0.9rem;display:block;margin:8px 0 4px;">$1</strong>');
            outputLines.push(line);
            continue;
        }
        if (/^#\s+(.*)/.test(line)) {
            closeList();
            line = line.replace(/^#\s+(.*)/, '<strong style="font-size:0.95rem;display:block;margin:8px 0 4px;">$1</strong>');
            outputLines.push(line);
            continue;
        }

        // ── Horizontal rule ──
        if (/^[-*_]{3,}\s*$/.test(line)) {
            closeList();
            outputLines.push('<hr style="border:none;border-top:1px solid rgba(0,0,0,0.1);margin:6px 0;" />');
            continue;
        }

        // ── Unordered list items (-, *, •) ──
        const ulMatch = line.match(/^\s*[-*•]\s+(.*)/);
        if (ulMatch) {
            if (inOl) { outputLines.push('</ol>'); inOl = false; }
            if (!inUl) { outputLines.push('<ul style="margin:4px 0;padding-left:18px;">'); inUl = true; }
            outputLines.push(`<li style="margin:2px 0;">${inlineFormat(ulMatch[1])}</li>`);
            continue;
        }

        // ── Ordered list items (1. 2. etc.) ──
        const olMatch = line.match(/^\s*\d+[.)]\s+(.*)/);
        if (olMatch) {
            if (inUl) { outputLines.push('</ul>'); inUl = false; }
            if (!inOl) { outputLines.push('<ol style="margin:4px 0;padding-left:20px;">'); inOl = true; }
            outputLines.push(`<li style="margin:2px 0;">${inlineFormat(olMatch[1])}</li>`);
            continue;
        }

        // ── Regular line ──
        closeList();
        if (line.trim() === '') {
            outputLines.push('<br />');
        } else {
            outputLines.push(inlineFormat(line));
        }
    }

    // Close any open list
    closeList();

    return outputLines.join('\n');

    function closeList() {
        if (inUl) { outputLines.push('</ul>'); inUl = false; }
        if (inOl) { outputLines.push('</ol>'); inOl = false; }
    }

    /** Handle inline formatting: bold, italic, code, links */
    function inlineFormat(s: string): string {
        return s
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code style="padding:1px 4px;background:rgba(0,0,0,0.06);border-radius:3px;color:#7B1E3A;font-size:0.8rem;font-family:monospace;">$1</code>');
    }
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
