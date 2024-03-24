import Link from "next/link";
import { User } from "next-auth";

import { logout } from "@/actions/logout";

import { NAV_LINKS } from "@/constants";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pathname: string;
  user: User | undefined;
}

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  pathname,
  user,
}: MobileMenuProps) => {
  return (
    <div
      className={`
        absolute top-0 right-0 border-l border-l-border bg-popover text-popover-foreground py-16 px-8 h-screen w-[65%] md:hidden transition-all ease duration-500 z-20 shadow-md max-md:flex justify-center
        ${isMenuOpen ? "translate-x-0" : "translate-x-[100vw]"} 
    `}
    >
      <ul className="flex flex-col items-start gap-8 pt-32 w-fit">
        {NAV_LINKS.map((link) => {
          return (
            <li
              key={link.label + link.path}
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-start gap-2"
            >
              <div className="w-1 h-1 rounded-sm bg-muted-foreground/30" />
              <Link
                href={link.path}
                className={`p-2 font-medium rounded-md hover:text-secondary-foreground transition ease-linear duration-300 hover:bg-muted ${
                  `/${pathname}` === link.path.toLowerCase() && "bg-muted"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}

        {user ? (
          <li className="flex items-center justify-start gap-2">
            <div className="w-1 h-1 rounded-sm bg-muted-foreground/30" />
            <div
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="p-2 font-medium transition duration-300 ease-linear rounded-md cursor-pointer hover:bg-muted"
            >
              SignOut
            </div>
          </li>
        ) : (
          <>
            <li className="flex items-center justify-start gap-2">
              <div className="w-1 h-1 rounded-sm bg-muted-foreground/30" />
              <Link
                href="/login"
                className="p-2 font-medium transition duration-300 ease-linear rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                SignIn
              </Link>
            </li>

            <li className="flex items-center justify-start gap-2">
              <div className="w-1 h-1 rounded-sm bg-muted-foreground/30" />
              <Link
                href="/register"
                className="p-2 font-medium transition duration-300 ease-linear rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                SignUp
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
