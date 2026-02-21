import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModernInput } from '@/components/ui/modern-input';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { AuthIllustration } from '@/components/auth/AuthIllustration';
import { RoleSelector } from '@/components/auth/RoleSelector';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('learner');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, selectedRole);

      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get('redirect');

      toast.success('Login successful!');

      if (redirect) {
        navigate(redirect);
      } else {
        navigate(selectedRole === 'learner' ? '/courses' : '/backoffice');
      }
    } catch (error: any) {
      console.error('Login failed:', error);

      let message = 'Login failed. Please check your credentials.';

      // Map Firebase error codes to user-friendly messages
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many failed attempts. Please try again later.';
      } else if (error.code === 'auth/user-disabled') {
        message = 'This account has been disabled.';
      } else if (error.message) {
        // Fallback: try to use the message but clean it up if it looks like a raw code
        message = error.message;
      }

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
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to={`/register${window.location.search}`} className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Role Selector */}
            <RoleSelector
              selectedRole={selectedRole}
              onSelect={(role) => setSelectedRole(role)}
            />

            <div className="space-y-4">
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
                <div className="mt-2 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" />
                    <span className="text-sm text-muted-foreground select-none">Remember me</span>
                  </label>
                  <a href="#" className="text-sm font-medium text-primary hover:underline hover:text-accent transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-primary/25 transition-all duration-300" size="lg" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
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
