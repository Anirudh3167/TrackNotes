"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {Tabs, Tab} from "@nextui-org/tabs";
import { MdSave } from "react-icons/md";
import { toast } from "sonner";
import remarkGfm from 'remark-gfm';
import { useRouter } from "next/navigation";

export interface LocalNotesType {
  noteId: string;
  access: string;
  content: string; // Just get the first 25 characters
}

export default function MDEditor({ params }: { params: { noteId: string | undefined } }) {
  const [markdown, setMarkdown] = useState('');
  const router = useRouter();
  useEffect(()=>{
    // id is being rendered as an object so id[0] is what we need
    let id = params.noteId;
    if (!id || id === '') return ;
    fetch(`/api/notes?noteId=${encodeURIComponent(id)}`, {method: 'GET'}).then(res => res.json())
    .then(data => { console.log("Use Effect: \n", data); data.status ? setMarkdown(data.Note.content) : alert(data.reason);})
  },[params.noteId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const saveMarkdown = async () => {
    await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: markdown, noteId: params.noteId && params.noteId[0]}),
    }).then(res => res.json())
    .then(data => {
      if(data.status) {
        toast('Markdown saved', {icon: '👍'});
        console.log("Id from saveMarkdown: ", data.noteId);
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
           components={{
            a: ({node, ...props}) => <a target="_blank" href={props.href} className="text-blue-500" rel="noreferrer" {...props} />,
            table: ({children}) => (
              <table className="w-full border border-gray-400 border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    {/* You can add table headers here if needed */}
                  </tr>
                </thead>
                <tbody>{children}</tbody>
              </table>
            ),
            tr: ({ children }) => (
              <tr className="">{children}</tr>
            ),
            th: ({ children }) => (
              <th className="px-4 py-2 border border-default-500 text-left">{children}</th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-2 border border-default-500">{children}</td>
            ),
          }}
           remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>
        </Tab>
      </Tabs>
      <div className="w-auto px-5 h-10 absolute top-10 max-sm:top-5 right-5 bg-default-100 rounded-xl text-white flex items-center justify-center cursor-pointer mt-14"
      title="Save Markdown"
      onClick={()=>saveMarkdown()}> 
          <MdSave size={'24'} />
      </div>
    </div>  
  );
}
