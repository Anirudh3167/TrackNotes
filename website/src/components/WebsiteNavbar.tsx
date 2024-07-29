import { getServerSession } from "next-auth"
import NavbarUI from "./NavbarUI";

async function WebsiteNavbar() {
    const session = await getServerSession();
    return (<NavbarUI session={session} />);
}

export default WebsiteNavbar;