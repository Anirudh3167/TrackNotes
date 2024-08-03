"use client";
import { Link } from "@nextui-org/react";
// import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  // const { data: session } = useSession();
  return (
    <main className="bg-black flex flex-col text-left text-xl font-sans gap-10 p-10 w-full h-full">
      <span className="text-4xl w-full text-center"> TrackNotes </span>
      {/* {session && <div className="text-2xl"> Welcome, {session.user?.name}</div>} */}
      {/* <h2 className="text-2xl"> Quick Links </h2> */}
      <Link href="/my-works" className="items-center justify-center flex w-full text-center text-4xl">My Works</Link>
      <Link href="/md-editor" className="items-center justify-center flex w-full text-center text-4xl">Markdown Editor</Link>
    </main>
  );
}
