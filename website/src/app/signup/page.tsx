// pages/signup.tsx
"use client";
import { Button, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useRef } from 'react';

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const handleUserRegistration = async () => {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    console.log(username, password, confirmPassword);
    if (!username || !password || !confirmPassword || !email)
      alert('Please fill in all fields');
    else if (password !== confirmPassword) alert('Passwords do not match');
    else
      await fetch('/api/auth/register', {
        method: 'POST', headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ username, email, password }),
      }).then(r => r.json()).then(res => {
        res.status ? signIn('credentials', {username, email, password,callbackUrl: '/'}) : alert(res.reason)
      });
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-default-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form>
          <Input label="Username" type='text' variant='underlined'
            className="mb-4 bg-default-100 border-b" ref={usernameRef}   required    />
            <Input label="Email" type='text' variant='underlined'
              className="mb-4 bg-default-100 border-b" ref={emailRef}   required    />
          <Input label="Password" type="password" variant='underlined'
            className="mb-4 bg-default-100 border-b" ref={passwordRef} required    />
          <Input label="Confirm Password" type="password" variant='underlined'
            className="mb-4 bg-default-100 border-b" ref={confirmPasswordRef} required    />
          <Button
            type="submit"
            className="w-full"
            color="primary"
            onClick={() => handleUserRegistration()}
          >
            Sign Up
          </Button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;