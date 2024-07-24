import { LockIcon } from "@/app/my-works/LockIcon";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from "lucide-react";
import { useRef } from "react";


export default function LoginBox({ updateLoginStatus }: { updateLoginStatus: (status: boolean) => void }) {
    const emailRef = useRef<HTMLInputElement>(null);
    const email = () => emailRef.current ? emailRef.current.value : '';
    const passwordRef = useRef<HTMLInputElement>(null);
    const password = () => passwordRef.current ? passwordRef.current.value : '';
    const rememberMeRef = useRef<HTMLInputElement>(null);
    const rememberMe = () => rememberMeRef.current ? rememberMeRef.current.checked : false;

    const authenticateUser = async () => {
        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email(), password: password() }),
        }).then(res => res.json())
        .then(data => {
          if (data.status) {
              if (rememberMe()) localStorage.setItem('auth-status', 'authenticated');
              updateLoginStatus(true);
          } else alert(data.reason);
        });
    }

  return (
      <Modal isOpen={true} placement="top-center">
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input   autoFocus   endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"   placeholder="Enter your email"   variant="bordered"
                  ref={emailRef} />
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
                <Button color="primary" onClick={authenticateUser}> Sign in </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
  );
}