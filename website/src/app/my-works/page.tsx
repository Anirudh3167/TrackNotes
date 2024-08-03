"use client";
import { useSession } from "next-auth/react";


function WorkData({user}:{user: any}) {
    return(
        <main className="bg-black flex flex-col text-left text-xl font-sans gap-10 p-10 w-full h-full">
      <span className="text-4xl w-full text-green-800"> Welcome, {user?.name} </span>
      <span> Markdown Support </span>
      <span> Allow to update Content Remotely </span>
      <span> Mobile App notes creation, Editing and Markdown based Display </span>
      <span>{`User Authentication (OAuth, Email Verification, Dedicated pages,...)`}</span>
      <span> {`Dashboard Section (With Stats of User usage, Notes,...)`} </span>
      <span> {`Profile (User's Data, Notes, Files, ...)`} </span>
      <span className="text-4xl w-full text-center"> TrackNotes </span>
        <span> Markdown Support Needed </span>
        <span> Basic initializations of the mobile app </span>
      <span className="text-4xl w-full text-center"> Portfolio </span>
        <span> Need to change the framework to NextJs and latest versions </span>
        <span> Add icons instead of the names </span>
      <span className="text-4xl w-full text-center"> AI Platform </span>
        <span> Design a dashboard + UI component Frameworks integration </span>
        <span> Design backend in django with NextJS for frontend </span>
      <span className="text-4xl w-full text-center"> Web3 Website </span>
        <span> Research Funding website (Done by Crowd funding) </span>
      <span className="text-4xl w-full text-center"> Threads-Clone </span>
        <span> Upgrade it to latest NextJs and add the UI components </span>
      <span className="text-4xl w-full text-center"> Job board </span>
        <span> Implement the backend in FastAPI or Django </span>
      <span className="text-4xl w-full text-center"> Ai Eduction Platform </span>
        <span> Consists of Courses, acts like a Youtube Sepcific pick, customizations on some topics </span>
      <span className="text-4xl w-full text-center"> Link Shortner </span>
        <span> Complete it by Tommorrow (basic functionality) in NextJS </span>
      <span className="text-4xl w-full text-center"> API for all platform </span>
        <span> Fake API data will be either generated from AI or automated </span>
        <span> To be implemented in the FastAPI </span>
        <span> Provide user the option to select the JSON format they want </span>
      <span className="text-4xl w-full text-center"> Blog Site </span>
        <span> imporve the functionality </span>
        <span> Add the search functionality </span>
        <span> Optimize the API calls a bit </span>
      <span className="text-4xl w-full text-center"> Discord Bot </span>
        <span> Think about the plan </span>
    </main>
    )
}


export default function MyWork() {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    return(loading ? "loading..." :
        session && session.user ? <WorkData user={session.user} /> : <h1 className="text-3xl bg-black w-full h-full items-center justify-center">Please Login</h1>
    )
}