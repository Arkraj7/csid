'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface Props {
  onSwitchToSignIn: () => void;
}

export default function SignUpForm({ onSwitchToSignIn }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpData>();

  const password = watch('password', '');

  const passwordStrength = (() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength];
  const strengthColor = ['', 'bg-danger', 'bg-warning', 'bg-yellow-400', 'bg-primary'][passwordStrength];

  async function onSubmit(data: SignUpData) {
    setLoading(true);
    // Backend integration point: call Supabase Auth signUp here
    await new Promise((r) => setTimeout(r, 1400));
    toast.success('Account created! Check your email to verify your address.');
    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">Account Created!</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Check your email to verify your address, then sign in to start learning.
        </p>
        <button
          onClick={onSwitchToSignIn}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Create your account</h1>
        <p className="text-sm text-muted-foreground">Join 2,400+ learners exploring the climate economy.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="signup-name" className="block text-sm font-medium text-foreground mb-1.5">
            Full name
          </label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder="Priya Sharma"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
              errors.fullName ? 'border-danger focus:ring-danger/30' : 'border-input hover:border-primary/40'
            }`}
            {...register('fullName', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-foreground mb-1.5">
            Email address
          </label>
          <input
            id="signup-email"
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
          <label htmlFor="signup-password" className="block text-sm font-medium text-foreground mb-1.5">
            Password
          </label>
          <p className="text-xs text-muted-foreground mb-1.5">Use 8+ characters with uppercase, numbers, and symbols for a strong password.</p>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Create a strong password"
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                errors.password ? 'border-danger focus:ring-danger/30' : 'border-input hover:border-primary/40'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
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
          {/* Password strength */}
          {password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={`strength-${n}`}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      n <= passwordStrength ? strengthColor : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Password strength: <span className={`font-semibold ${passwordStrength >= 3 ? 'text-primary' : passwordStrength >= 2 ? 'text-warning' : 'text-danger'}`}>{strengthLabel}</span>
              </p>
            </div>
          )}
          {errors.password && (
            <p className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="signup-confirm" className="block text-sm font-medium text-foreground mb-1.5">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="signup-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Repeat your password"
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                errors.confirmPassword ? 'border-danger focus:ring-danger/30' : 'border-input hover:border-primary/40'
              }`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val) => val === password || 'Passwords do not match',
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-input accent-primary"
            {...register('terms', { required: 'You must accept the terms to continue' })}
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
            I agree to the{' '}
            <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
            {' '}and{' '}
            <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
          </label>
        </div>
        {errors.terms && (
          <p className="text-xs text-danger flex items-center gap-1 -mt-2">
            <AlertCircle size={12} />
            {errors.terms.message}
          </p>
        )}

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
              <UserPlus size={15} />
              Create Account
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-5">
        Already have an account?{' '}
        <button onClick={onSwitchToSignIn} className="text-primary font-semibold hover:text-primary/80 transition-colors">
          Sign in
        </button>
      </p>
    </div>
  );
}