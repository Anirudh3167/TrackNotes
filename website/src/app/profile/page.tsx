"use client";
import LinkAsButton from "@/components/ui/LinkAsButton";
import ProfileCard from "@/components/ui/ProfileCard";
import { Link } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
    const { status: sessionStatus, data: session } = useSession();
    const router = useRouter();
    useEffect(() => {if (sessionStatus === "unauthenticated") router.push('/login');}, [sessionStatus]);
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen gap-3">
            <ProfileCard user={session?.user} />
            <div className="flex gap-3 flex-row flex-wrap justify-center max-[480px]:w-full">
                <LinkAsButton to="/notes" text="Your Notes" />
                <LinkAsButton to="/editor/new" text="New Note" />
            </div>
        </div>
    );
}