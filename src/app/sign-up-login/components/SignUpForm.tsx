'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  onSwitchToSignIn: () => void;
}

export default function SignUpForm({ onSwitchToSignIn }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock signup: Save user to localStorage so the Certificate uses their real name
    const newUser = {
      name: name,
      email: email
    };
    
    localStorage.setItem('csid_user', JSON.stringify(newUser));
    
    // Redirect to courses page after signing up
    router.push('/courses');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          placeholder="John Doe"
        />
      </div>

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
          placeholder="Create a password"
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-2"
      >
        Create Account
      </button>
    </form>
  );
}
