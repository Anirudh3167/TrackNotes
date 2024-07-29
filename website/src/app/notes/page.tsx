"use client";
import { Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { LocalNotesType } from "../editor/[[...noteId]]/page";

export default function Notes() {
    const [notes, setNotes] = useState<LocalNotesType[]>([]);

    useEffect(() => {
        let r = localStorage.getItem('prevNotes');
        if(r && r !== '[]') setNotes(JSON.parse(r));
    }, [])
    return(
        <div className="flex flex-col gap-3 p-3">
            <Link href="/editor" className="flex items-center justify-center text-white text-2xl bg-default-200 rounded-lg w-48 h-auto p-3">New Note</Link>
            <h1 className="text-3xl flex items-center justify-center w-full">Your Notes</h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
                {notes.map((item, idx) => (
                    <Link className="text-lg flex flex-col items-start justify-center text-white p-3 px-8 gap-4 bg-default-100 rounded-lg max-w-full"
                href={`/editor/${item.noteId}`} key={idx}>
                        <div className="text-xl">{item.content}</div>
                    <div className="text-sm text-default-500"> Date: {(new Date(parseInt(item.noteId))).toString().slice(0,21)}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}