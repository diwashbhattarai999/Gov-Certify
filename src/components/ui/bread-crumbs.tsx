"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface BreadCrumbProps {
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
}

const Breadcrumb = ({
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: BreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <ul className={containerClasses}>
      <li className={listClasses}>
        <Link href={"/"}>Home</Link>
      </li>
      {pathNames.length > 0 && <span className="mx-2"> / </span>}
      {pathNames.map((link, index) => {
        let href = `/${pathNames.slice(0, index + 1).join("/")}`;
        let itemClasses =
          paths === href ? `${listClasses} ${activeClasses}` : listClasses;
        let itemLink = capitalizeLinks
          ? link[0].toUpperCase() + link.slice(1, link.length)
          : link;
        return (
          <React.Fragment key={index}>
            <li className={itemClasses}>
              <Link href={href}>{itemLink}</Link>
            </li>
            {pathNames.length !== index + 1 && (
              <span className="mx-2"> / </span>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Breadcrumb;
