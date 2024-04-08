"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbCertificate } from "react-icons/tb";

const Services = () => {
  const router = useRouter();

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
      <div>
        <h1 className="text-2xl font-bold">
          Our <span className="text-accent font-semibold">Services</span>
        </h1>
        <div className="w-8 h-1 bg-accent rounded-full" />
      </div>
      <div className="flex flex-wrap items-center lg:justify-center w-full gap-8 mt-16">
        {SERVICES.map((service, index) => {
          return (
            <Link
              href={service.link}
              key={index}
              className="px-3 py-6 shadow-md border border-foreground/70 w-full sm:w-[11.5rem] md:w-52 rounded-md hover:bg-muted/80 cursor-pointer duration-300 hover:scale-105"
            >
              <service.icon className="h-10 w-10" />
              <h2 className="font-medium md:text-lg">{service.label}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
