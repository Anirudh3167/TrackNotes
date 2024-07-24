"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {Tabs, Tab} from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/react";
import { MdSave } from "react-icons/md";
import { toast } from "sonner";

export default function MDEditor() {
  const [markdown, setMarkdown] = useState('Write your markdown here');

  useEffect(()=>{
    const savedMarkdown = localStorage.getItem('markdown');
    if(savedMarkdown) setMarkdown(savedMarkdown);
  },[])
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const saveMarkdown = () => {
    localStorage.setItem('markdown', markdown);
    toast('Markdown saved', {icon: '👍'});
  }

  return (
    <div className="flex w-full flex-col p-10">
      <Tabs aria-label="Options">
        <Tab key="Edit" title="Edit">
              <textarea onChange={handleChange} value={markdown} style={{minHeight:"calc(100vh - 100px)"}}
              className="w-full h-full resize-none bg-default-100 rounded-xl p-5 outline-none" />
        </Tab>
        <Tab key="Preview" title="Preview">
          <ReactMarkdown className={'markdown w-full h-full overflow-auto overflow-x-clip bg-default-100 rounded-xl p-5'}>
            {markdown}
          </ReactMarkdown>
        </Tab>
      </Tabs>
      <div className="w-auto px-5 h-10 absolute top-10 right-5 bg-default-100 rounded-xl text-white flex items-center justify-center cursor-pointer"
      title="Save Markdown"
      onClick={()=>saveMarkdown()}> 
          <MdSave size={'24'} />
      </div>
    </div>  
  );
}
