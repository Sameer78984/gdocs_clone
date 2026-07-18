'use client';

import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { useLogin } from '../../features/auth/queries/useLogin';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const login = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <ProtectedRoute requireAuth={false}>
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-3 sm:p-8">
        <div className="w-full max-w-[420px] animate-in fade-in zoom-in-95 duration-500">
          <div className="mb-6 sm:mb-8 text-center space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Welcome back</h1>
            <p className="text-gray-500">Enter your credentials to access your workspace</p>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5 p-6 sm:p-8">
                <div className="space-y-2.5">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={login.isPending}
                    className="h-11 bg-gray-50/50 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={login.isPending}
                    className="h-11 bg-gray-50/50 focus:bg-white transition-colors"
                  />
                </div>
                {login.isError && (
                  <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg border border-red-100 flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mt-0.5 shrink-0">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {login.error instanceof Error 
                        ? login.error.message.includes('401') ? 'Incorrect email or password. Please try again.' : login.error.message 
                        : 'Invalid credentials. Please check your email and password.'}
                    </span>
                  </div>
                )}
              </CardContent>
              <div className="px-6 pb-8 sm:px-8">
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-medium shadow-md transition-all hover:shadow-lg bg-gray-900 hover:bg-gray-800 text-white rounded-xl" 
                  disabled={login.isPending}
                >
                  {login.isPending ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Signing in...
                    </span>
                  ) : 'Sign in'}
                </Button>
                <div className="mt-6 text-sm text-center text-gray-500 font-medium">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors font-semibold">
                    Create one now
                  </Link>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
