import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Coins } from 'lucide-react';
import Button from '../components/ui/Button';

declare global {
  interface Window {
    google?: any;
  }
}

const Auth: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/marketplace');
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '968324704578-nmioek8rrjviqbqgvcbgr1elfih3v335.apps.googleusercontent.com',
          callback: handleGoogleCallback,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          { theme: 'outline', size: 'large', width: 280 }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [isAuthenticated, navigate]);

  const handleGoogleCallback = async (response: any) => {
    try {
      const endpoint = mode === 'signup' ? '/signup' : '/login';

      const res = await fetch(`http://127.0.0.1:5000/api/auth${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.token);
        navigate('/marketplace');
      } else {
        throw new Error(data.message || 'Google authentication failed');
      }
    } catch (error) {
      console.error('Google authentication error:', error);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const endpoint = mode === 'signup' ? '/signup' : '/login';

      const body = mode === 'signup'
        ? { name, email, password }
        : { email, password };

      const res = await fetch(`http://127.0.0.1:5000/api/auth${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.token);
        navigate('/marketplace');
      } else {
        alert(data.message || (mode === 'signup' ? 'Signup failed' : 'Login failed'));
      }
    } catch (error) {
      console.error(`${mode === 'signup' ? 'Signup' : 'Login'} error:`, error);
      alert(`${mode === 'signup' ? 'Signup' : 'Login'} failed. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-navy-800 py-6">
          <div className="flex justify-center">
            <Coins className="h-12 w-12 text-gold-500" />
          </div>
          <h2 className="mt-2 text-center text-3xl font-serif font-bold text-white">
            HeritageCoin
          </h2>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-navy-800 mb-6 text-center">
            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </h3>

          <div className="space-y-6">
            <div id="google-signin-button" className="flex justify-center"></div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <form className="space-y-4" onSubmit={handleEmailAuth}>
                {mode === 'signup' && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                      placeholder="Full Name"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                    placeholder="Email address"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                    placeholder="Password"
                  />
                </div>

                <div>
                  <Button type="submit" variant="primary" className="w-full">
                    {mode === 'login' ? 'Sign in' : 'Sign up'}
                  </Button>
                </div>
              </form>
            </div>

            <div className="text-center text-sm text-gray-600">
              {mode === 'login' ? (
                <>
                  <span>Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="font-medium text-gold-600 hover:text-gold-500"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  <span>Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="font-medium text-gold-600 hover:text-gold-500"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
