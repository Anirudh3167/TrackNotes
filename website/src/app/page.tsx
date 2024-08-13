"use client";
import React from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const HomePage = () => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const getStarted = () => {router.push('/signup')};
  const showNotes = () => {router.push('/notes')};
  return (
    <main className="bg-default min-h-screen text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold mb-6">TrackNotes</h1>
        <p className="text-lg md:text-xl mb-10">
          Simplify your note-taking experience with our cloud-based app. Easily take notes in Markdown format and access them anywhere.
        </p>
        {
          sessionStatus === 'authenticated' ? 
          <Button className="bg-blue-600" size="lg" onClick={showNotes}>View Notes</Button> :
          <Button className="bg-blue-600" size="lg" onClick={()=>getStarted()}>Get Started</Button>
        }
      </div>

      <div className="bg-black py-16">
        <div className="container mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-center">
          <div className="p-6 bg-default rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Cloud-Based</h2>
            <p>Access your notes from anywhere, at any time. All your notes are securely stored in the cloud.</p>
          </div>
          <div className="p-6 bg-default rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Markdown Support</h2>
            <p>Write notes in Markdown format for easy formatting and styling.</p>
          </div>
          <div className="p-6 bg-default rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">User-Friendly Interface</h2>
            <p>An intuitive and simple interface that makes note-taking a breeze.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
