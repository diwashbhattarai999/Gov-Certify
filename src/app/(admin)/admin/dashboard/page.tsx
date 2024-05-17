"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import dayjs from "dayjs";

const DashboardPage = () => {
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

  return (
    <div className="w-full h-full pt-20">
      <div className="fixed pointer-events-none inset-0 bg-gradient-to-b from-accent/10 to-transparent -z-10 h-1/2"></div>
      <div className="flex flex-col items-center">
        {currentDate && <p>{currentDate}</p>}
        {user && greeting && (
          <h1 className="text-2xl font-semibold">
            {greeting}, {user.name?.split(" ")[0]}
          </h1>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
