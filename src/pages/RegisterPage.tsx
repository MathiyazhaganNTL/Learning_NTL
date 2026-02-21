
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModernInput } from '@/components/ui/modern-input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

import { AuthIllustration } from '@/components/auth/AuthIllustration';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await register(email, password, name, 'learner');
            toast.success('Account created successfully! Welcome to LearnSphere.');

            const searchParams = new URLSearchParams(window.location.search);
            const redirect = searchParams.get('redirect');
            if (redirect) {
                navigate(redirect);
            } else {
                navigate('/my-courses');
            }
        } catch (error: any) {
            console.error('Registration failed:', error);
            // Show more specific error messages if possible
            const message = error.message || 'Registration failed. Please try again.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left - Form */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {/* Back to Home Link */}
                    <Link
                        to="/"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>

                    {/* Logo */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white/5 shadow-xl transition-all group-hover:bg-white/10">
                                <img
                                    src="/logo.png"
                                    alt="LearnSphere Logo"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(113,75,110,0.5)]"
                                />
                            </div>
                            <span className="font-display text-2xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
                                LearnSphere
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">Create an account</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to={`/login${window.location.search}`} className="font-medium text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <ModernInput
                                    id="name"
                                    type="text"
                                    label="Full Name"
                                    icon={User}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full"
                                    required
                                />
                            </div>

                            <div>
                                <ModernInput
                                    id="email"
                                    type="email"
                                    label="Email address"
                                    icon={Mail}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full"
                                    required
                                />
                            </div>

                            <div>
                                <ModernInput
                                    id="password"
                                    type="password"
                                    label="Password"
                                    icon={Lock}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                                I agree to the{' '}
                                <a href="#" className="font-medium text-primary hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="font-medium text-primary hover:underline">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create account'}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Right - Image/Illustration */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <AuthIllustration />
            </div>
        </div>
    );
}
