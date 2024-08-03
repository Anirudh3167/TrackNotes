import { Link } from "@nextui-org/react";

function NotesItem({item, idx} : any) {
    const dateString = new Date(parseInt(item.noteId)).toString().slice(0,21);
    return (
        <Link className="text-lg flex flex-col items-start justify-center h-52 max-sm:h-36 text-white p-3 px-8 gap-4 bg-default-100 rounded-lg max-w-full"
                href={`/editor/${item.noteId}`} key={idx}>
            <div className="text-xl">{item.content}</div>
            <div className="text-sm text-default-500"> Date: {dateString}</div>
        </Link>
    )
}

export default NotesItem;