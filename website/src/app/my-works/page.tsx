"use client";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from "./MailIcon";
import { LockIcon } from "./LockIcon";
import { useEffect, useState } from "react";

function LoginBox({ updateLoginStatus }: { updateLoginStatus: (status: boolean) => void }) {
    const [isOpen, setIsOpen] = useState(true);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const authenticateUser = () => {
        if (email === 'anirudhmukkamala@gmail.com' && password === 'anirudh') {
            if (rememberMe) localStorage.setItem('auth-status', 'authenticated');
            updateLoginStatus(true);
            setIsOpen(false);  // Not needed as parent component will automatically close
        }
    }
  return (
      <Modal isOpen={isOpen} placement="top-center">
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input   autoFocus   endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"   placeholder="Enter your email"   variant="bordered"
                  value={email}   onChange={(e)=>{setEmail(e.target.value)}} />
                <Input   endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"   placeholder="Enter your password"   type="password" 
                  variant="bordered"   value={password}   onChange={(e)=>{setPassword(e.target.value)}}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox classNames={{label: "text-small",}}
                    onChange={(e) => setRememberMe(e.target.checked)}>
                      Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm"> Forgot password? </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={()=>{}}> Close </Button>
                <Button color="primary" onClick={authenticateUser}> Sign in </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
  );
}

function WorkData() {
    return(
        <main className="bg-black flex flex-col text-left text-xl font-sans gap-10 p-10 w-full h-full">
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
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const checkPreviousAuth = async () => {
        const authStatus = localStorage.getItem('auth-status');
        if (authStatus && authStatus === 'authenticated') setUserAuthenticated(true);
    }
    useEffect(()=>{checkPreviousAuth();},[]);
    const updateLoginStatus = (status: boolean) => {setUserAuthenticated(status);}
    return(
        userAuthenticated ? <WorkData /> : <LoginBox updateLoginStatus={updateLoginStatus} />
    )
}