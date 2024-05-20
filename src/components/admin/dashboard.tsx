"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import dayjs from "dayjs";
import { FaUsers } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";

interface IDashboardProps {
  users: number | undefined;
  birthCertificate: number;
  deathCertificate: number;
  marriageCertificate: number;
  residentialCertificate: number;
}

const Dashboard = ({
  users,
  birthCertificate,
  deathCertificate,
  marriageCertificate,
  residentialCertificate,
}: IDashboardProps) => {
  const user = useCurrentUser();
  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const date = dayjs().format("dddd, MMMM D");
    setCurrentDate(date);

    const hour = dayjs().hour();
    if (hour < 5) {
      setGreeting("Good Night");
    } else if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const totalCertificates =
    birthCertificate +
    deathCertificate +
    residentialCertificate +
    marriageCertificate;

  return (
    <div className="w-full h-full pt-20">
      {/* Background */}
      <div className="fixed pointer-events-none inset-0 bg-gradient-to-b from-accent/10 to-transparent -z-10 h-1/2"></div>
      {/* Welcome */}
      <div className="flex flex-col items-center">
        {currentDate && <p>{currentDate}</p>}
        {user && greeting && (
          <h1 className="text-2xl font-semibold">
            {greeting}, {user.name?.split(" ")[0]}
          </h1>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 mt-32 gap-4">
        {/* Total Users & Certificates */}
        <div className="grid grid-cols-1 gap-4 col-span-2">
          <div className="bg-background backdrop-blur-md border border-border rounded-md p-8 shadow-sm">
            <div className="text-3xl text-muted-foreground font-bold flex justify-between items-center">
              Total Registerd Users
              <FaUsers className="text-accent/80" />
            </div>
            <p className="text-2xl text-muted-foreground font-medium mt-4">
              {users ?? 0}
            </p>
          </div>
          <div className="bg-background backdrop-blur-md border border-border rounded-md p-8 shadow-sm">
            <div className="text-3xl text-muted-foreground font-bold flex justify-between items-center">
              Total Certificates Applied
              <TbCertificate className="text-accent/80" />
            </div>
            <p className="text-2xl text-muted-foreground font-medium mt-4">
              {totalCertificates}
            </p>
          </div>
        </div>

        {/* Individual Certificates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 col-span-3">
          <div className="bg-background backdrop-blur-md border border-border rounded-md p-8 shadow-sm">
            <h1 className="text-2xl text-muted-foreground font-bold">
              Birth Certificates
            </h1>
            <p className="text-lg text-muted-foreground font-medium mt-4">
              {birthCertificate}
            </p>
          </div>
          <div className="bg-background backdrop-blur-md border border-border rounded-md p-8 shadow-sm">
            <h1 className="text-2xl text-muted-foreground font-bold">
              Death Certificates
            </h1>
            <p className="text-lg text-muted-foreground font-medium mt-4">
              {deathCertificate}
            </p>
          </div>
          <div className="bg-background backdrop-blur-md border border-border rounded-md p-8 shadow-sm">
            <h1 className="text-2xl text-muted-foreground font-bold">
              Residential Certificates
            </h1>
            <p className="text-lg text-muted-foreground font-medium mt-4">
              {residentialCertificate}
            </p>
          </div>
          <div className="bg-background backdrop-blur-md border border-border rounded-md p-8 shadow-sm">
            <h1 className="text-2xl text-muted-foreground font-bold">
              Marriage Certificates
            </h1>
            <p className="text-lg text-muted-foreground font-medium mt-4">
              {marriageCertificate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
