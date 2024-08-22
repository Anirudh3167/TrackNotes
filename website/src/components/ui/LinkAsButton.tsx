import { Link } from "@nextui-org/react";

export default function LinkAsButton({ to, text }: { to: string, text: string }) {
    return <Link href={to} className="flex items-center justify-center text-white text-2xl bg-default-200 rounded-lg w-48 h-auto p-3">{text}</Link>
}