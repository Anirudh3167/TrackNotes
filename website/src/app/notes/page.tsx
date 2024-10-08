"use client";

// React Functions
import { useEffect, useState } from "react";

// UI Components
import { Link } from "@nextui-org/react";
import { LocalNotesType } from "@/lib/types";

// custom made functions
import { customFetch } from "@/lib/clientUtils";
import NotesItem from "@/components/ui/NotesItem";
import { useRouter } from "next/navigation";

function Notes() {
    const [notes, setNotes] = useState<LocalNotesType[]>([]);
    const [pageStatus, setPageStatus] = useState("loading");
    const router = useRouter();
    useEffect(() => {
        const loadNotes = async () => {
            let r = await customFetch('/api/getUserNotes', 'GET');
            if (!r.status) {console.log(r.reason); router.push("/login"); return ;}
            let sortedNotes = r.notes.sort((a: LocalNotesType, b: LocalNotesType) => 
                                            parseInt(b.lastUpdated) - parseInt(a.lastUpdated));
            setNotes(sortedNotes);
            setPageStatus("loaded");
        };
        loadNotes();
    }, []);
    return(
        <div className="flex flex-col gap-3 p-3">
            <Link href="/editor/new" className="flex items-center justify-center text-white text-2xl bg-default-200 rounded-lg w-48 h-auto p-3">New Note</Link>
            <h1 className="text-3xl flex items-center justify-center w-full">Your Notes</h1>
            {pageStatus === "loading" ? 
                <p className="flex items-center justify-center w-full min-h-96 text-center text-3xl">Loading Your Notes...</p>
            :
                <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 max-sm:gap-3">
                    {notes.map((item, idx) => <NotesItem item={item} key={idx} />)}
                </div>
            }
            {pageStatus === "loaded" && notes.length === 0 && <p className="flex items-center justify-center w-full h-screen text-center text-3xl">You don&#39;t have any notes</p>}
        </div>
    )
}

export default Notes;