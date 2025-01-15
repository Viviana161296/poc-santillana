import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AuthForm } from './AuthForm';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface Props {
  children: React.ReactNode;
}

export function AuthGuard({ children }: Props) {
  const { user, isLoading, signIn, signUp, isSigningIn, isSigningUp } = useAuth();
  const [mode, setMode] = React.useState<'signIn' | 'signUp'>('signIn');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              {mode === 'signIn' ? 'Sign in to your account' : 'Create an account'}
            </h2>
          </div>

          <AuthForm
            mode={mode}
            onSubmit={mode === 'signIn' ? signIn : signUp}
            isLoading={isSigningIn || isSigningUp}
          />

          <div className="text-center">
            <button
              onClick={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {mode === 'signIn'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}