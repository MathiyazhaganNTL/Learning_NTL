
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

export interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: LucideIcon;
    error?: string;
    className?: string;
}

const ModernInput = React.forwardRef<HTMLInputElement, ModernInputProps>(
    ({ className, type, label, icon: Icon, error, value, onChange, onFocus, onBlur, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const [showPassword, setShowPassword] = useState(false);

        // Check if input has content (to keep label floating)
        // Coerce value to string to handle potential number inputs safely
        const hasValue = value !== undefined && value !== null && value.toString().length > 0;

        // Determine input type (handle password toggle)
        // If type is password, we toggle between password and text using internal state
        const inputType = type === 'password' && showPassword ? 'text' : type;

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            onFocus?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            onBlur?.(e);
        };

        return (
            <div className={cn("relative group", className)}>
                {/* Glow Effect Background */}
                <div
                    className={cn(
                        "absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-50",
                        isFocused && "opacity-100 duration-200"
                    )}
                />

                {/* Main Container */}
                <div
                    className={cn(
                        "relative flex items-center rounded-xl border bg-background/50 backdrop-blur-sm transition-all duration-300",
                        isFocused
                            ? "border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.1)] ring-1 ring-primary/20"
                            : "border-border/50 hover:border-primary/30 hover:bg-background/80",
                        error && "border-destructive/50 ring-destructive/20"
                    )}
                >
                    {/* Left Icon */}
                    {Icon && (
                        <div className="pl-4 text-muted-foreground pointer-events-none">
                            <Icon
                                className={cn(
                                    "h-5 w-5 transition-all duration-300",
                                    isFocused ? "text-primary scale-110" : "text-muted-foreground",
                                    error && "text-destructive"
                                )}
                            />
                        </div>
                    )}

                    {/* Input & Label Wrapper */}
                    <div className="relative w-full">
                        <input
                            type={inputType}
                            className={cn(
                                "peer h-14 w-full bg-transparent px-4 pb-2 pt-6 text-base font-medium text-foreground outline-none placeholder:text-transparent transition-all autofill:bg-transparent",
                                // Ensure text doesn't overlap with right icon (password toggle) or left icon
                                // Standard padding is px-4.
                            )}
                            placeholder={label} // Placeholder needed for :placeholder-shown trick if used, but we stick to state
                            value={value}
                            onChange={onChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            ref={ref}
                            {...props}
                        />

                        {/* Floating Label */}
                        <label
                            className={cn(
                                "absolute left-4 cursor-text text-muted-foreground transition-all duration-300 pointer-events-none",
                                // Floating State
                                (isFocused || hasValue)
                                    ? "top-2 text-xs font-semibold text-primary"
                                    : "top-1/2 -translate-y-1/2 text-base",
                                // Error State
                                error && "text-destructive"
                            )}
                        >
                            {label}
                        </label>
                    </div>

                    {/* Password Toggle */}
                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="pr-4 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                        >
                            <div className={cn(
                                "rounded-full p-1 transition-all duration-300 hover:bg-primary/10",
                                showPassword ? "text-primary" : "text-muted-foreground"
                            )}>
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </div>
                        </button>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <p className="mt-1 text-xs font-medium text-destructive animate-fade-in-up">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

ModernInput.displayName = 'ModernInput';

export { ModernInput };
