"use client";

import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import { cn } from "@/lib/utils";

const Accordian = ({ faq }: { faq: { question: string; answer: string } }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="border-t pt-4 flex flex-col gap-4">
      {/* Question */}
      <div
        className="flex items-center justify-between group duration-300 cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <div className="flex gap-4 items-start">
          <span className="font-bold text-[1.6rem] text-green-600">Q</span>
          <h2 className="text-xl md:text-xl font-semibold text-secondary-foreground mt-[6px] group-hover:underline group-hover:text-primary-foreground ">
            {faq.question}
          </h2>
        </div>
        <LuChevronDown
          className={cn(
            "w-6 h-6 duration-300",
            showAnswer && "transform rotate-180"
          )}
        />
      </div>

      {/* Answer */}
      <div
        className={cn(
          "flex gap-4 overflow-hidden transition-all duration-300 ease-in-out",
          showAnswer
            ? "opacity-100 max-h-[1000px] pointer-events-auto"
            : "opacity-0 max-h-0 pointer-events-none"
        )}
      >
        <span className="font-bold text-[1.6rem] text-red-500">A</span>
        <span className="text-xl md:text-xl text-muted-foreground mt-[6px]">
          {faq.answer}
        </span>
      </div>
    </div>
  );
};

export default Accordian;
