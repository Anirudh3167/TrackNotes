function TagItem({TagName, color}: {TagName: string, color?: string}) {
    return <div className={`flex items-center justify-center px-4 py-4 rounded-full ${color ? "bg-" + color : "bg-default"}`}>
            <p className="text-xs font-bold text-white">{TagName}</p>
        </div>
}
export default TagItem