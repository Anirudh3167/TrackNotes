"use client";
import ProfileCard from "@/components/ui/ProfileCard";
import { useSession } from "next-auth/react";

export default function Profile() {
    const { data: session } = useSession();
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <ProfileCard user={session?.user} />
        </div>
    );
}