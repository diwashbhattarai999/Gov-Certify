"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Fira_Sans } from "next/font/google";
import Link from "next/link";
import { CgMenuRight, CgClose } from "react-icons/cg";

import { NAV_LINKS } from "@/constants";

import useOnClickOutside from "@/hooks/use-on-click-outside";
import { useCurrentUser } from "@/hooks/use-current-user";

import Container from "@/components/common/max-width-container";
import MobileMenu from "@/components/ui/mobile-menu";
import UserProfile from "@/components/user-profile/user-profile";
import Button from "@/components/ui/Button";
import Logo from "@/components/common/logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const pathname = usePathname().split("/")[1];

  const handleMenu = () => {
    setIsMenuOpen((currentValue) => !currentValue);
  };

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isMenuOpen]);

  useOnClickOutside(menuRef, () => {
    setIsMenuOpen(false);
  });

  const user = useCurrentUser();

  return (
    <nav
      ref={navRef}
      className="h-[76px] border-b border-b-border/50 backdrop-blur bg-background/70 fixed w-full top-0 z-40"
    >
      <Container className="flex items-center justify-between h-full">
        <Logo />

        <div className="hidden md:flex gap-16 text-sm font-medium lg:gap-24 lg:-ml-40">
          <ul className="flex items-center justify-between gap-4">
            {NAV_LINKS.map((link) => {
              return (
                <li key={link.label + link.path}>
                  <Link
                    href={link.path}
                    className={`p-2 rounded-md hover:bg-muted transition ease-linear duration-300 ${
                      `/${pathname}` === link.path.toLowerCase() && "bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="z-50 flex items-center gap-4" ref={menuRef}>
          <div className="flex items-center justify-between gap-4">
            {!user && (
              <>
                <div>
                  <Link href="/login">
                    <Button className="w-24">SignIn</Button>
                  </Link>
                </div>

                <div>
                  <Link href="/register">
                    <Button
                      className="w-24 hover:bg-accent hover:text-accent-foreground"
                      outline
                    >
                      SignUp
                    </Button>
                  </Link>
                </div>
              </>
            )}
            {user?.role === "ADMIN" && (
              <div>
                <Link href="/admin/dashboard">
                  <Button className="rounded-lg px-4">Dashboard</Button>
                </Link>
              </div>
            )}
            {user && <UserProfile />}
          </div>

          <div
            className="flex-col gap-1 px-2 py-1 duration-300 rounded-sm cursor-pointer lex md:hidden hover:bg-muted z-30"
            onClick={handleMenu}
          >
            {isMenuOpen ? <CgClose size={24} /> : <CgMenuRight size={24} />}
          </div>

          <MobileMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            pathname={pathname}
            user={user}
          />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
