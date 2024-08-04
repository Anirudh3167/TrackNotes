"use client";

// React Functions
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// UI Components
import {Tabs, Tab} from "@nextui-org/tabs";
import { MdSave } from "react-icons/md";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";

// Custom Made Components
import MarkdownRenderer from "@/components/ui/markdownRenderer";

// Type Interfaces
import { customFetch } from "@/lib/UtilityFunctions";

export default function MDEditor({ params }: { params: { noteId: string | undefined } }) {
  const [markdown, setMarkdown] = useState('');
  const router = useRouter();
  const { noteId } = params;
  const updateMarkdown = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMarkdown(e.target.value);

  useEffect(()=>{
    if (!noteId || noteId === '') return ;
    // Requesting the current Notes
    customFetch(`/api/notes?noteId=${encodeURIComponent(noteId)}`, 'GET').then(res => res.json())
      .then(data => {data.status ? setMarkdown(data.Note.content) : alert(data.reason);})
  },[noteId]);

  const handleResponseAndNavigate = (data: any,msg : string) => {
    if(data.status) {   toast(`Markdown ${msg}`, {icon: '👍'});   router.push('/notes'); } 
    else alert(data.reason);
  }

  const saveMarkdown = async () => {
    await customFetch('/api/notes', 'POST', { content: markdown, noteId }).then(res => res.json())
    .then(data => handleResponseAndNavigate(data,"saved"))
  }

  const deleteMarkdown = async () => {
    await customFetch('/api/notes/delete', 'POST', {noteId}).then(res => res.json())
    .then(data => handleResponseAndNavigate(data,"deleted"))
  }

  return (
    <div className="flex w-full flex-col p-6 max-sm:px-3 max-sm:py-0">
      {/* Top Buttons */}
      <div className="w-full flex flex-row gap-10 pb-3 justify-start items-start">
        <Button  color="danger" onClick={deleteMarkdown}> Delete </Button>
        <Button color="primary" onClick={saveMarkdown} > <MdSave size={'24'} /> Save </Button>
      </div>
      <Tabs aria-label="Options">
        <Tab key="Edit" title="Edit">
            <textarea onChange={updateMarkdown} value={markdown} style={{minHeight:"calc(100vh - 100px)"}}
              className="w-full h-full resize-none bg-default-100 rounded-xl p-5 outline-none" />
        </Tab>
        <Tab key="Preview" title="Preview">
            <MarkdownRenderer markdown={markdown} />
        </Tab>
      </Tabs>
    </div>  
  );
}
