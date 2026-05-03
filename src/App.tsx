/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAuth } from './components/AuthProvider';
import { AlertManager } from './components/AlertManager';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) await signInWithEmailAndPassword(auth, email, password);
      else await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) { alert(err.message); }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0A0A0F] text-white">
      <form onSubmit={handleSubmit} className="p-8 border border-[#2A2A4A] bg-[#0D1117] rounded-lg">
        <h2 className="mb-4 text-xl">{isLogin ? 'Login' : 'Register'}</h2>
        <input type="email" placeholder="Email" className="block w-full p-2 mb-4 bg-black border border-[#2A2A4A]" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="block w-full p-2 mb-4 bg-black border border-[#2A2A4A]" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="w-full p-2 bg-[#00FF9D] text-black font-bold">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" className="mt-4 text-xs underline" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Need an account?' : 'Already have one?'}</button>
      </form>
    </div>
  );
};

export default function App() {
  const { user, role, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <AuthForm />;

  return (
    <div className="w-full min-h-screen bg-[#0A0A0F] text-[#E0E0E0] font-sans flex flex-col overflow-hidden select-none">
      <AlertManager />
      <header className="h-16 border-b border-[#2A2A4A] flex items-center justify-between px-6 bg-[#0D0D14]">
        <h1 className="text-sm font-bold tracking-widest text-white uppercase">Autonomous Dashboard Orchestrator</h1>
        <div className="text-sm">Role: {role} <button onClick={() => signOut(auth)} className="ml-4 text-xs underline">Logout</button></div>
      </header>
      
      {role === 'admin' && (
        <div className="p-4 m-4 border border-[#FFD700] rounded text-[#FFD700]">Admin Panel: Configure Alerts here</div>
      )}
      
      <main className="flex-1">Dashboard Content</main>
    </div>
  );
}

