'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  onSwitchToSignUp: () => void;
}

export default function SignInForm({ onSwitchToSignUp }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock login: Save user to localStorage so the Certificate can read it
    const mockUser = {
      name: email.split('@')[0], // Just uses the first part of the email as a mock name
      email: email
    };
    
    localStorage.setItem('csid_user', JSON.stringify(mockUser));
    
    // Redirect to courses page
    router.push('/courses');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          placeholder="you@example.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          placeholder="••••••••"
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-2"
      >
        Sign In
      </button>
    </form>
  );
}
