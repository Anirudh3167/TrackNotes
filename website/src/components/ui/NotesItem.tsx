import { Link } from "@nextui-org/react";
import TagItem from "./ItemTag";

function NotesItem({item, key} : any) {
    const dateString = new Date(parseInt(item.lastUpdated)).toString().slice(0,21);
    return (
        <Link className="text-lg flex flex-col items-start justify-center h-44 text-white p-5 max-sm:p-3 px-8 gap-4 bg-default-100 rounded-lg max-w-full"
                href={`/editor/${item.noteId}`} key={key}>
            <div className="text-xl h-full">{item.content}</div>
            <div className="text-sm text-default-500 h-5"> Date: {dateString}</div>
            <div className="flex flex-row gap-2 min-h-5">
                <TagItem TagName={item.access} />
                {/* {item.tags.map((tag: string, idx: number) => <TagItem TagName={tag} key={idx}/>)} */}
            </div>
        </Link>
    )
}

export default NotesItem;