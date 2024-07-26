"use client";
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

function WebsiteNavbar () {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const { data: session, status } = useSession();

    const loading = status === "loading";

    const menuItems = [
        "Home", "Notes", "Future Plans", "Login", "Sign Up"
      ];

    const pathname = usePathname();
    const noNavbarLinks = ["/signup", "/login"];
    if (noNavbarLinks.includes(pathname)) {
        return(<></>);
    }

    return (loading ? "loading..." :
    <Navbar shouldHideOnScroll>
        <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
        />
      <NavbarBrand>
        <p className="font-bold text-2xl max-sm:text-xl text-transparent bg-clip-text bg-gradient-to-r to-teal-500 from-emerald-500">TrackNotes</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="/" aria-current="page"> Home </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/notes" color="foreground"> Notes </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#"> Future Plans </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!(session && session.user) &&
            <NavbarItem className="hidden lg:flex">
            <Link href="#" color="foreground">Login</Link>
            </NavbarItem>
        }
        <NavbarItem>
                <Button as={session?.user ? Button : Link} 
                  color={session?.user ? "danger" : "primary"} 
                  href={session?.user ? "" : "/signup"} variant="flat" 
                  onClick={(e) => { if (session?.user) { e.preventDefault(); signOut({ callbackUrl: "/" }); }}}
                >
                  {session?.user ? "Logout" : "Sign Up"}
                </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    )
}

export default WebsiteNavbar;