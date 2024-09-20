"use client"

// React Functions
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Custom Made Components
import MarkdownRenderer from "@/components/ui/markdownRenderer";

// Type Interfaces
import { customFetch } from "@/lib/clientUtils";


export default function ViewNotes({params}: {params: { noteId: string | undefined }}) {
const [markdown, setMarkdown] = useState('');
  const router = useRouter();
  const { noteId } = params;

  useEffect(()=>{
    if (!noteId || noteId === '') return ;
    // Requesting the current Notes
    customFetch(`/api/notes?noteId=${encodeURIComponent(noteId)}`, 'GET')
      .then(data => {
        if (!data.status) {
          if (data.reason === 'Unauthorized') { router.push('/'); return ; }
          alert(data.reason); 
          return ;
        }
        setMarkdown(data.Note.content);
      })
  },[noteId]);

return <div className="flex w-full flex-col p-6 max-sm:px-3 max-sm:py-0">
            <MarkdownRenderer markdown={markdown} />
    </div>
}