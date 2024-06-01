"use client";

import Link from "next/link";
import { TbCertificate } from "react-icons/tb";

const Services = ({ showTitle }: { showTitle?: boolean }) => {
  const SERVICES = [
    {
      label: "Birth Certificate",
      icon: "/images/birth.mov",
      link: "/birth-certificate",
    },
    {
      label: "Death Certificate",
      icon: "/images/death.mov",
      link: "/death-certificate",
    },
    {
      label: "Marriage Certificate",
      icon: "/images/marriage.mov",
      link: "/marriage-certificate",
    },
    {
      label: "Residential Certificate",
      icon: "/images/residential.mov",
      link: "/residential-certificate",
    },
  ];
  return (
    <section className="my-28">
      {showTitle && (
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-2xl font-bold text-center">
            Our <span className="text-accent font-semibold">Services</span>
          </h1>
          <div className="w-8 h-1 bg-accent rounded-full" />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-8 mt-16">
        {SERVICES.map((service, index) => {
          return (
            <Link
              href={service.link}
              key={index}
              className="bg-[#f7f5f8] px-3 py-10 shadow-md border border-foreground/40 w-full rounded-md cursor-pointer duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center flex-col gap-2"
            >
              <video
                src={service.icon}
                width={130}
                height={130}
                autoPlay
                loop
                muted
                className="rounded-md"
              >
                Your browser does not support the video tag.
              </video>
              <h2 className="text-2xl font-semibold md:text-lg">
                {service.label}
              </h2>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
