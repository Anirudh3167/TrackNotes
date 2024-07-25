"use client";
import { Link } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Notes() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        let r = localStorage.getItem('noteIds');
        if(r && r !== '[]') setNotes(JSON.parse(r));
    }, [])
    return(
        <div className="flex flex-col gap-3 p-3">
            <Link href="/md-editor" className="text-3xl">New Note</Link>
            <h1 className="text-3xl flex items-center justify-center w-full">Your Notes</h1>
            <div className="flex flex-row flex-wrap gap-3">
                {notes.map((n, idx) => <Link className="text-lg flex items-center justify-center text-white p-3 px-8 bg-default-100 rounded-lg max-w-fit"
                href={`/md-editor/${n}`} key={idx}>{(new Date(parseInt(n))).toString().slice(0,21)}</Link>)}
            </div>
        </div>
    )
}