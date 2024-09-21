// EditorToolbar.tsx
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import React from 'react';

interface EditorToolbarProps {
  onFormatting: (start: string, end: string) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onFormatting }) => {
  const handleBold = () => {
    onFormatting('**', '**');
  };

  const handleItalic = () => {
    onFormatting('*', '*');
  };

  const handleHeading = (level:number) => {
    onFormatting('#'.repeat(level) +' ', '');
  };

  const handleLink = () => {
    onFormatting('[', '](https://)');
  };

  const handleImage = () => {
    onFormatting('![', '](https://example.com/image.jpg)');
  };

  const handleCheckBox = () => {
    onFormatting('- [ ] ', '');
  };

  return (
    <div className="flex justify-center max-sm:justify-start space-x-4 p-2 py-3 min-h-10 bg-default-100 overflow-x-auto">
      <Button onClick={handleBold} className="px-3 py-1">
        <div className='font-bold'>B</div>
      </Button>
      <Button onClick={handleItalic} className="px-3 py-1">
        <div className='italic'>I</div>
      </Button>
      {/* <Button onClick={handleHeading} className="px-3 py-1">
        <div className='font-bold'>H1</div>
      </Button> */}
      
        <Dropdown>
        <DropdownTrigger>
            <Button> Headings </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
            {[1, 2, 3, 4, 5, 6].map((level) => (
            <DropdownItem key={level} onClick={() => handleHeading(level)}>
                Heading {level}
            </DropdownItem>
            ))}
        </DropdownMenu>
        </Dropdown>
      <Button onClick={handleCheckBox} className="px-3 py-1">
        Checkbox
      </Button>
      <Button onClick={handleLink} className="px-3 py-1">
        Link
      </Button>
      <Button onClick={handleImage} className="px-3 py-1">
        Image
      </Button>
    </div>
  );
};

export default EditorToolbar;