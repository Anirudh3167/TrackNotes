import { getServerSession } from "next-auth"
import NavbarUI from "./NavbarUI";

async function WebsiteNavbar() {return <NavbarUI session={await getServerSession()} />;}
export default WebsiteNavbar;