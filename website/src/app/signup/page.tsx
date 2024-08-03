// pages/signup.tsx
"use client";
// React Functions
import Link from 'next/link';
import { memo, useRef } from 'react';

// Custom Functions
import { customFetch } from '@/lib/UtilityFunctions';
import { Button, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';


function SignupInputBox({label, refProp, InpType}: 
  {label: string, refProp: React.RefObject<HTMLInputElement>, InpType: string}
) {
  return <Input  label={label}  type={InpType}  variant='underlined'  ref={refProp}   required
    className="mb-4 bg-default-100 border-b" />
}

const Signup = () => {
  const [usernameRef, emailRef, passwordRef, confirmPasswordRef] = 
                  Array(4).fill('').map(() => useRef<HTMLInputElement>(null));

  const handleSignup = async () => {
    const [username, email, password, confirmPassword] =
      [usernameRef, emailRef, passwordRef, confirmPasswordRef].map((ref) => ref.current?.value);

    if (!username || !password || !confirmPassword || !email)
      alert('Please fill in all fields');
    else if (password !== confirmPassword) alert('Passwords do not match');
    else {
      let res = await customFetch('/api/auth/register', 'POST', { username, email, password })
        .then(r => r.json())
      console.log("Register: ", res);
      res.status ? await signIn('credentials', {username, email, password, callbackUrl: '/notes'})
        : alert(res.reason)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-default-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form>
          <SignupInputBox label="Username" refProp={usernameRef} InpType="text" />
          <SignupInputBox label="Email" refProp={emailRef} InpType="email" />
          <SignupInputBox label="Password" refProp={passwordRef} InpType="password" />
          <SignupInputBox label="Confirm Password" refProp={confirmPasswordRef} InpType="password" />

          <Button className="w-full bg-primary" children={["Sign up"]} onClick={() => handleSignup()} />
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline" children={["Log in"]} />
        </p>
      </div>
    </div>
  );
};

export default memo(Signup);