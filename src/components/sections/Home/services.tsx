"use client";

import Link from "next/link";
import { TbCertificate } from "react-icons/tb";

const Services = ({ showTitle }: { showTitle?: boolean }) => {
  const SERVICES = [
    {
      label: "Birth Certificate",
      icon: TbCertificate,
      link: "/birth-certificate",
    },
    {
      label: "Death Certificate",
      icon: TbCertificate,
      link: "/death-certificate",
    },
    {
      label: "Marriage Certificate",
      icon: TbCertificate,
      link: "/marriage-certificate",
    },
    {
      label: "Residential Certificate",
      icon: TbCertificate,
      link: "/residential-certificate",
    },
  ];
  return (
    <div className="my-10">
      {showTitle && (
        <>
          <h1 className="text-2xl font-bold">
            Our <span className="text-accent font-semibold">Services</span>
          </h1>
          <div className="w-8 h-1 bg-accent rounded-full" />
        </>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-8 mt-16">
        {SERVICES.map((service, index) => {
          return (
            <Link
              href={service.link}
              key={index}
              className="px-3 py-10 shadow-md border border-foreground/40 w-full rounded-md cursor-pointer duration-300 hover:scale-105 hover:-translate-y-2 flex items-center justify-center flex-col gap-2"
            >
              <service.icon className="h-16 w-16" />
              <h2 className="font-medium md:text-lg">{service.label}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
