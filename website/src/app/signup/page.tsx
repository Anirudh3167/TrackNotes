// pages/signup.tsx
"use client";
import { Button, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-default-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form>
          <Input label="Username" type='text' variant='underlined'
            className="mb-4 bg-default-100 border-b"    required    />
          <Input label="Password" type="password" variant='underlined'
            className="mb-4 bg-default-100 border-b" required    />
          <Input label="Confirm Password" type="password" variant='underlined'
            className="mb-4 bg-default-100 border-b" required    />
          <Button
            type="submit"
            className="w-full"
            color="primary"
            onClick={() => signIn("credentials",{username: "test", password: "test", callbackUrl: "/my-works"})}
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