// "use client";
// import { Link } from "@nextui-org/react";
// import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  // const { data: session } = useSession();
  return (
    <main className="bg-black flex flex-col text-left text-xl font-sans gap-10 p-10 w-full h-full">
      <span className="text-4xl w-full text-center"> TrackNotes </span>
      {/* {session && <div className="text-2xl"> Welcome, {session.user?.name}</div>} */}
      {/* <h2 className="text-2xl"> Quick Links </h2> */}
      <div className="flex w-full h-full min-h-96 flex-col items-center justify-center">
        <div className="flex text-2xl text-white font-sans"> The Online Notes Platform </div>
      </div>
    </main>
  );
}
