'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, LogIn, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SignInData {
  email: string;
  password: string;
  remember: boolean;
}

interface Props {
  onSwitchToSignUp: () => void;
}

const demoCredentials = {
  email: 'learner@csid.education',
  password: 'ClimateATF2026',
};

export default function SignInForm({ onSwitchToSignUp }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SignInData>({ defaultValues: { remember: false } });

  function handleCopy(field: 'email' | 'password') {
    const val = field === 'email' ? demoCredentials.email : demoCredentials.password;
    navigator.clipboard.writeText(val);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  function handleUseDemo() {
    setValue('email', demoCredentials.email);
    setValue('password', demoCredentials.password);
  }

  async function onSubmit(data: SignInData) {
    setLoading(true);
    // Backend integration point: call Supabase Auth signInWithPassword here
    await new Promise((r) => setTimeout(r, 1200));

    if (data.email !== demoCredentials.email || data.password !== demoCredentials.password) {
      setLoading(false);
      setError('email', { message: 'Invalid credentials — use the demo account below to sign in' });
      return;
    }

    toast.success('Welcome back! Redirecting to your courses...');
    setLoading(false);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to continue your climate learning journey.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="signin-email" className="block text-sm font-medium text-foreground mb-1.5">
            Email address
          </label>
          <input
            id="signin-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
              errors.email ? 'border-danger focus:ring-danger/30' : 'border-input hover:border-primary/40'
            }`}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
            })}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="signin-password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Your password"
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                errors.password ? 'border-danger focus:ring-danger/30' : 'border-input hover:border-primary/40'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 rounded border-input accent-primary"
            {...register('remember')}
          />
          <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
            Remember me for 30 days
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          style={{ minHeight: '44px' }}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <LogIn size={15} />
              Sign In
            </>
          )}
        </button>
      </form>

      {/* Demo credentials */}
      <div className="mt-6 p-4 rounded-xl bg-muted/60 border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-foreground">Demo Account</span>
          <button
            onClick={handleUseDemo}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Autofill
          </button>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground">Email: </span>
              <span className="text-xs font-medium text-foreground font-tabular">{demoCredentials.email}</span>
            </div>
            <button
              onClick={() => handleCopy('email')}
              className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy email"
            >
              {copiedField === 'email' ? <CheckCircle size={13} className="text-primary" /> : <Copy size={13} />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground">Password: </span>
              <span className="text-xs font-medium text-foreground font-tabular">{demoCredentials.password}</span>
            </div>
            <button
              onClick={() => handleCopy('password')}
              className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy password"
            >
              {copiedField === 'password' ? <CheckCircle size={13} className="text-primary" /> : <Copy size={13} />}
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-5">
        Don&apos;t have an account?{' '}
        <button onClick={onSwitchToSignUp} className="text-primary font-semibold hover:text-primary/80 transition-colors">
          Sign up for free
        </button>
      </p>
    </div>
  );
}