"use client";
import { customFetch } from "@/lib/clientUtils";
import { LocalNotesType } from "@/lib/types";
import { useEffect, useState } from "react";

function ProfileCard ({user}: any) {
    const [userData, setUserData] = useState<LocalNotesType[]>([]);
    useEffect(() => {
        const loadUserData = async () => {
            let res = await customFetch('/api/getUserNotes', 'GET');
            setUserData(res.notes);
        }
        loadUserData();
    },[])
    return (
        <div className="flex flex-col p-7 w-96 items-end justify-center rounded-xl bg-opacity-15 border border-default shadow">
            <div className="flex gap-2 items-center justify-center p-5 flex-row">
                Username: <div className="font-bold text-slate-600">{user?.name}</div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center p-5">
                Notes in use: <div className="font-bold text-slate-600">{userData.length}</div>
            </div>
        </div>
)}

export default ProfileCard;