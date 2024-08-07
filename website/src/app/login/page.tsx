"use client";

// React Functions
import { useRouter } from "next/navigation";
import { useRef } from "react";

// UI Components
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";

// Icons
import UserIcon from "@/components/ui/icons/userIcon";
import { LockIcon } from "@/components/ui/icons/lockIcon";


export default function LoginBox() {
    const router = useRouter();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rememberMeRef = useRef<HTMLInputElement>(null);
    // const [usernameRef, passwordRef, rememberMeRef] = 
    //     Array(3).fill('').map(() => useRef<HTMLInputElement>(null));

  const handleClose = () => {router.push('/');};
  const handleLogin = () => {
    const [username, password, rememberMe] =
      [usernameRef, passwordRef, rememberMeRef].map((ref) => ref.current?.value);
    signIn('credentials', {username, email:"", password, rememberMe, callbackUrl: '/notes'});
  };

  return (
      <Modal isOpen={true} placement="center">
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input   autoFocus   endContent={<UserIcon />}  label="Username"   
                  placeholder="Enter your username"   variant="bordered" ref={usernameRef} />
                <Input  type="password" endContent={<LockIcon />} label="Password"   
                  placeholder="Enter your password" variant="bordered"   ref={passwordRef} />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox classNames={{label: "text-small"}} ref={rememberMeRef}>
                    Remember Me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm"> Forgot password? </Link>
                </div>
                <div className="flex justify-start gap-2">
                  New to TrackNotes? <Link color="primary" href="/signup"> Sign Up </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={handleClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleLogin}>
                  Sign in
                </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
  );
}