"use client";
import React, { memo } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function LoginLogoutButton ({session}: any) {
  return (
  <NavbarItem>
    {session?.user ? 
        <Button as={Button} color="danger" variant="flat" onClick={() => signOut({ callbackUrl: "/" })}>
          Logout</Button>
      :
        <Button as={Link} color="primary" href="/login" children={['Login']} />
    }
  </NavbarItem>
  )
}

function NavbarUI ({session}: any) {
    const horizontalNavItems:{[key: string]: string} = {"Home": "/", "Notes": "/notes", "GitHub link": "https://www.github.com/Anirudh3167"};
    const pathname = usePathname();
    const noNavbarLinks = ["/signup", "/login"];
    if (noNavbarLinks.includes(pathname)) return(<></>);

    return (
    <Navbar shouldHideOnScroll>
      <NavbarMenuToggle aria-label="menu" className="sm:hidden" />
      <NavbarBrand>
        <p className="font-bold text-2xl max-sm:text-xl text-transparent bg-clip-text bg-gradient-to-r to-teal-500 from-emerald-500">TrackNotes</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {Object.entries(horizontalNavItems).map(([item, link], index) => (
          <NavbarItem isActive={pathname === link} aria-current={"page"} key={index} >
            <Link href={link} color={pathname === link ? "primary" : "foreground"}>{item}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {!(session && session.user) &&
            <NavbarItem className="hidden lg:flex">
            <Link href="/login" color="foreground">Login</Link>
            </NavbarItem>
        }
        <LoginLogoutButton session={session} />
      </NavbarContent>
      <NavbarMenu>
        {Object.entries(horizontalNavItems).map(([item, link], index) => (
          <NavbarMenuItem isActive={pathname === link} key={index} aria-current={"page"}>
            <Link color={pathname === link ? "primary" : "foreground"}
            className="w-full" href={link} size="lg" >
                {item}
            </Link>
          </NavbarMenuItem>
        ))}
        {!(session && session.user) &&
            <NavbarMenuItem className="flex">
            <Link href="/login" color="foreground">Login</Link>
            </NavbarMenuItem>
        }
        <LoginLogoutButton session={session} />
        
      </NavbarMenu>
    </Navbar>
    )
}

export default memo(NavbarUI);