"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {Tabs, Tab} from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/react";
import { MdSave } from "react-icons/md";

export default function MDEditor() {
  const [markdown, setMarkdown] = useState('# markdown preview');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="flex w-full flex-col p-10">
      <Tabs aria-label="Options">
        <Tab key="Edit" title="Edit">
              <textarea onChange={handleChange} value={markdown} style={{minHeight:"calc(100vh - 100px)"}}
              className="w-full h-full resize-none bg-default-100 rounded-xl p-5 outline-none" />
        </Tab>
        <Tab key="Preview" title="Preview">
          <ReactMarkdown children={markdown} className={'markdown w-full h-full overflow-auto overflow-x-clip bg-default-100 rounded-xl p-5'} />
        </Tab>
      </Tabs>
      <div className="w-auto px-5 h-12 absolute top-8 right-5 bg-default-100 rounded-xl text-white flex items-center justify-center"> 
          <MdSave size={'30'} />
      </div>
    </div>  
  );
}
