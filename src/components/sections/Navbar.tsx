"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgMenuRight, CgClose } from "react-icons/cg";

import { logout } from "@/actions/logout";

import { NAV_LINKS } from "@/constants";

import useOnClickOutside from "@/hooks/use-on-click-outside";
import { useCurrentUser } from "@/hooks/use-current-user";

import Container from "@/components/max-width-container";
import MobileMenu from "@/components/ui/mobile-menu";
import UserProfile from "../user-profile/user-profile";
import Image from "next/image";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
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
      className="h-[70px] border-b border-b-border/50 backdrop-blur dark:bg-background/70 bg-background/70  fixed w-full top-0 z-40"
    >
      <Container className="flex items-center justify-between h-full">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary-foreground flex items-center gap-4"
        >
          <Image
            src="images/Emblem_of_Nepal.svg"
            alt="Logo"
            width={500}
            height={500}
            className="w-14 h-14"
          />
          <div>
            <h1>
              Gov <span>Certify</span>
            </h1>
            <p className="text-sm font-normal hidden md:block -tracking-[0.06em]">
              Your Digital Gateway to Official Certificates
            </p>
          </div>
        </Link>

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
          <ul className="flex items-center justify-between gap-4">
            {!user && (
              <>
                <li>
                  <Link
                    href="/login"
                    className={`p-2 rounded-md hover:bg-muted transition ease-linear duration-300 ${
                      `/${pathname}` === "/login" && "bg-muted"
                    }`}
                  >
                    SignIn
                  </Link>
                </li>

                <li>
                  <Link
                    href="/register"
                    className={`p-2 rounded-md hover:bg-muted transition ease-linear duration-300  ${
                      `/${pathname}` === "/register" && "bg-muted"
                    }`}
                  >
                    SignUp
                  </Link>
                </li>
              </>
            )}
            {user && <UserProfile />}
          </ul>

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
