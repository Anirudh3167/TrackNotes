"use client";

// React Functions
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// UI Components
import {Tabs, Tab} from "@nextui-org/tabs";
import { MdSave } from "react-icons/md";
import { toast } from "sonner";
import { Button, Select, SelectItem, Tooltip } from "@nextui-org/react";

// Icons
import { FiCopy } from "react-icons/fi";

// Custom Made Components
import MarkdownRenderer from "@/components/ui/markdownRenderer";

// Type Interfaces
import { customFetch } from "@/lib/clientUtils";
import EditorToolbar from "@/components/ui/EditorToolbar";
import EditorDropdownMenu from "./EditorOptions";

export default function MDEditor({ params }: { params: { noteId: string } }) {
  const [markdown, setMarkdown] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [prevContent, setPrevContent] = useState('');
  const [author, setAuthor] = useState('');
  const [access, setAccess] = useState('');
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { noteId } = params;
  const updateMarkdown = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMarkdown(e.target.value);
  
  const handleFormatting = useCallback( (start: string, end: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return ;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      const currentValue = textarea.value;

      // Create new markdown value with formatting
      const newValue =
        currentValue.slice(0, selectionStart) +
        start +
        currentValue.slice(selectionStart, selectionEnd) +
        end +
        currentValue.slice(selectionEnd);

      // Update state with new markdown value
      setMarkdown(newValue);

      // Use setTimeout to ensure focus and cursor positioning happens after state update
      setTimeout(() => {
        textarea.focus(); // Focus on the textarea
        const newCursorPosition = selectionStart + start.length; // Cursor after the opening formatting tag
        textarea.selectionStart = newCursorPosition;
        textarea.selectionEnd = newCursorPosition; // Set both to the same position
      }, 0);
  },[]);

  useEffect(()=>{
    if (noteId === 'new' || noteId === '') {setIsLoading(false); return ;} // New Notes
    // Requesting the current Notes
    customFetch(`/api/notes?noteId=${encodeURIComponent(noteId)}`, 'GET')
      .then(data => {
        if (!data.status) {
          if (data.reason === 'Unauthorized') { router.push('/'); return ; }
          alert(data.reason); 
          return ;
        }
        setMarkdown(data.Note.content);
        setPrevContent(data.Note.content);
        setAuthor(data.Note.author);
        setAccess(data.Note.access);
        setIsLoading(false);
      })
  },[noteId]);

  const handleResponseAndNavigate = (data: any,msg : string, navigate:boolean = true) => {
    if(data.status) {   toast(`Markdown ${msg}`, {icon: '👍'});   navigate ? router.push('/notes') : setEditing(false); } 
    else alert(data.reason);
  }

  const UpdateAccess = async (newAccess: string) => {
    if (access === newAccess || newAccess === '') return ;

    await customFetch('/api/notes/update-access', 'POST', {noteId,author,access:newAccess})
    .then(data => {
      if (!data.status) {alert(data.reason); return ;} 
      toast(`Notes is ${newAccess} now`, {icon: '👍'});
      setAccess(newAccess);
    })
  }

  const saveMarkdown = async () => {
    if (prevContent === markdown) {
      handleResponseAndNavigate({status:true,reason:"no change"},"has no changes detected");
      return ;
    }
    await customFetch('/api/notes', 'POST', { content: markdown, noteId: noteId==='new' ? '' : noteId })
    .then(data => handleResponseAndNavigate(data,"saved",false))
  }

  const deleteMarkdown = async () => {
    if (noteId === 'new' || noteId === '') return router.push('/notes');
    await customFetch('/api/notes/delete', 'POST', {noteId: noteId==='new' ? '' : noteId,author})
    .then(data => handleResponseAndNavigate(data,"deleted"))
  }

  const copyLink = async () => {
    navigator.clipboard.writeText(window.location.origin + "/notes/" + noteId);
    toast('Link Copied', {icon: '👍'});
  }

  if (isLoading) return (<h1 className="text-3xl font-bold text-white">Loading...</h1>);
  return (
    <div className="flex w-full flex-col p-6 max-sm:px-3 max-sm:py-0">
      {/* Top Buttons */}
      <div className="w-full flex flex-row gap-10 pb-3 justify-start items-start flex-wrap">
        {/* <Button  color="danger" onClick={deleteMarkdown}> Delete </Button>
        <Button color="primary" onClick={saveMarkdown} > <MdSave size={'24'} /> Save </Button>
        {
          noteId &&
          <Tooltip content="Copy Link" placement="bottom">
            <div className="flex items-center justify-center p-3 cursor-pointer bg-default rounded-lg flex-row gap-2"
              onClick={() => copyLink()}
              aria-label="Copy Link" >
              <FiCopy size={'20'} />
            </div>
          </Tooltip>
        }
        {
          access !== '' &&
            <Select label="Access" className="max-w-xs" defaultSelectedKeys={[access]}
            disallowEmptySelection
            onChange={(e) => {UpdateAccess(e.target.value)}}
            >
              <SelectItem key={'private'} value='private'>Private</SelectItem>
              <SelectItem key={'public'} value='public'>Public</SelectItem>
            </Select>
        } */}
        <EditorDropdownMenu onEdit={() => {setEditing(true)}}
        currentAccess = {access}
        onPreview={() => {setEditing(false)}}
        onCopy={() => {copyLink()}}
        onDelete={()=>{deleteMarkdown()}}
        onSave={()=>{saveMarkdown()}}
        onAccessChange={(access:string) => {UpdateAccess(access)}}
         />
      </div>
      {editing ?
            <div className="w-full h-full">
              {/* Editor toolbar */}
              <EditorToolbar onFormatting={handleFormatting} />
              <textarea id='markdown-textarea' onChange={updateMarkdown} value={markdown} style={{height:'calc(100vh - 250px)'}}
                ref={textareaRef}
                className="w-full h-full resize-none bg-neutral-900 rounded-tr-none rounded-tl-none rounded-xl p-5 outline-none" />
            </div>
      :
      <MarkdownRenderer markdown={markdown} />

      }
    </div>  
  );
}
