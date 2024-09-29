import React, { useEffect, useState } from 'react';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownSection, 
  DropdownItem, 
  Button, 
  Selection
} from '@nextui-org/react';

export default function EditorDropdownMenu({onEdit, onPreview, onSave, onCopy, onAccessChange, onDelete, currentAccess} : 
  {onEdit: () => void, onPreview: () => void, onSave: () => void, onCopy: () => void, currentAccess: string, onAccessChange: (access:string) => void, onDelete: () => void}) {
  // Default access state set to 'Private'
  const [selectedAccess, setSelectedAccess] = React.useState<Selection>(new Set([currentAccess]));
  const [isOpen, setIsOpen] = useState(false);

  const selectedAccessValue = React.useMemo(
    () => Array.from(selectedAccess).join(", ").replaceAll("_", " "),
    [selectedAccess]
  );

  useEffect(() => {
    onAccessChange(selectedAccessValue);
  }, [selectedAccessValue]);
  
  return (
    <Dropdown closeOnSelect={false} isOpen={isOpen}>
      <DropdownTrigger>
        <Button variant="bordered" onClick={() => {setIsOpen(true)}}>Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with sections">
        
        {/* Actions Section */}
        <DropdownSection title="Actions" showDivider>
          <DropdownItem
            key="edit"
            className=' px-6'
            onClick={() => { onEdit(); setIsOpen(false);}}
          >
            Edit
          </DropdownItem>
          <DropdownItem
            key="preview"
            className=' px-6'
            onClick={() => {onPreview(); setIsOpen(false);}}
          >
            Preview
          </DropdownItem>
          <DropdownItem
            key="save"
            color='primary'
            className=' px-6 text-primary'
            onClick={() => {onSave(); setIsOpen(false);}}
          >
            Save
          </DropdownItem>
        </DropdownSection>

        {/* Access Section */}
        <DropdownSection title="Access" showDivider>
          <DropdownItem key="copy-link" onClick={() => {onCopy();setIsOpen(false);}} className=' px-6'>
            Copy Link
          </DropdownItem>
          
          {/* Access Selection Dropdown */}
          <DropdownItem>
            <Dropdown backdrop="blur" onClose={() => {console.log("Closed");setIsOpen(false);}}>
      <DropdownTrigger>
        <Button variant="light" className="capitalize w-full flex justify-start px-6 bold">
          {selectedAccessValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedAccess}
        onSelectionChange={(e) => {setSelectedAccess(e); onAccessChange(e.currentKey??'')}}
      >
        <DropdownItem key="Private">Private</DropdownItem>
        <DropdownItem key="Public">Public</DropdownItem>
      </DropdownMenu>
      </Dropdown>
    </DropdownItem>
        </DropdownSection>

        {/* Danger Section */}
        <DropdownSection title="Danger">
          <DropdownItem key="delete" onClick={() => {onDelete();setIsOpen(false);}}  color='danger' className='text-danger px-6'>
            Delete
          </DropdownItem>
        </DropdownSection>

      </DropdownMenu>
    </Dropdown>
  );
};