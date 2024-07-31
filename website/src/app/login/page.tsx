"use client";
import { LockIcon } from "@/app/my-works/LockIcon";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import { FaUser } from "react-icons/fa";


export default function LoginBox() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const username = () => usernameRef.current ? usernameRef.current.value : '';
    const passwordRef = useRef<HTMLInputElement>(null);
    const password = () => passwordRef.current ? passwordRef.current.value : '';
    const rememberMeRef = useRef<HTMLInputElement>(null);
    const rememberMe = () => rememberMeRef.current ? rememberMeRef.current.checked : false;

  return (
      <Modal isOpen={true} placement="center">
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input   autoFocus   endContent={
                    <FaUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Username"   placeholder="Enter your username"   variant="bordered"
                  ref={usernameRef} />
                <Input   endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"   placeholder="Enter your password"   type="password" 
                  variant="bordered"   ref={passwordRef}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox classNames={{label: "text-small",}} ref={rememberMeRef}>
                      Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm"> Forgot password? </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={()=>{}}> Close </Button>
                <Button color="primary" onClick={()=>signIn("credentials",{username: username(), email: "", password: password(), callbackUrl: "/my-works", remember: rememberMe()})}> Sign in </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
  );
}