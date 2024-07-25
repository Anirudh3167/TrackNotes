"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {Tabs, Tab} from "@nextui-org/tabs";
import { MdSave } from "react-icons/md";
import { toast } from "sonner";
import remarkGfm from 'remark-gfm';
import { useRouter } from "next/navigation";

export default function MDEditor({ params }: { params: { noteId: string | undefined } }) {
  const [markdown, setMarkdown] = useState('Write your markdown here');
  const router = useRouter();
  useEffect(()=>{
    // id is being rendered as an object so id[0] is what we need
    let id = params.noteId;
    if (!id || id === '') return ;
    fetch(`/api/notes?noteId=${encodeURIComponent(id)}`, {method: 'GET'}).then(res => res.json())
    .then(data => {data.status ? setMarkdown(data.content) : alert(data.reason);})
  },[]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const updateNoteIds = (id: string) => {
    let r = localStorage.getItem('noteIds');
    let ids: string[] = (r && r !== '[]' && r !== '') ? JSON.parse(r) : [];
    console.log(ids);
    // id is being rendered as an object so id[0] is what we need
    if(ids.includes(id[0])) return;
    ids.push(id);
    localStorage.setItem('noteIds', JSON.stringify(ids));
  }

  const saveMarkdown = async () => {
    await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: markdown, noteId: params.noteId }),
    }).then(res => res.json())
    .then(data => {
      if(data.status) {
        toast('Markdown saved', {icon: '👍'});
        updateNoteIds(data.noteId);
        router.push('/notes');
      } else alert(data.reason);
    })
  }

  return (
    <div className="flex w-full flex-col p-10 max-sm:p-5">
      <Tabs aria-label="Options">
        <Tab key="Edit" title="Edit">
              <textarea onChange={handleChange} value={markdown} style={{minHeight:"calc(100vh - 100px)"}}
              className="w-full h-full resize-none bg-default-100 rounded-xl p-5 outline-none" />
        </Tab>
        <Tab key="Preview" title="Preview">
          <ReactMarkdown className={'markdown w-full h-full overflow-auto overflow-x-clip bg-default-100 rounded-xl p-5'}
           remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>
        </Tab>
      </Tabs>
      <div className="w-auto px-5 h-10 absolute top-10 max-sm:top-5 right-5 bg-default-100 rounded-xl text-white flex items-center justify-center cursor-pointer"
      title="Save Markdown"
      onClick={()=>saveMarkdown()}> 
          <MdSave size={'24'} />
      </div>
    </div>  
  );
}
