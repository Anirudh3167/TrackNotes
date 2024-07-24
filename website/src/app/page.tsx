import { Link } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="bg-black flex flex-col text-left text-xl font-sans gap-10 p-10 w-full h-full">
      <span className="text-4xl w-full text-center"> TrackNotes </span>
      <span> Markdown Support </span>
      <span> Allow to update Content Remotely </span>
      <span> Mobile App notes creation, Editing and Markdown based Display </span>
      <span>{`User Authentication (OAuth, Email Verification, Dedicated pages,...)`}</span>
      <span> {`Dashboard Section (With Stats of User usage, Notes,...)`} </span>
      <span> {`Profile (User's Data, Notes, Files, ...)`} </span>
      <Link href="/my-works" className="items-center justify-center flex w-full text-center text-4xl">My Works</Link>
      <Link href="/md-editor" className="items-center justify-center flex w-full text-center text-4xl">Markdown Editor</Link>
    </main>
  );
}
