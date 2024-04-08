import { ReactNode, RefObject } from "react";
import { cn } from "@/lib/utils";

const MaxWidthContainer = ({
  children,
  className,
  ref,
}: {
  children: ReactNode;
  className?: string;
  ref?: RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={ref}
      className={cn(
        "max-w-[1800px] mx-auto xl:px-16 md:px-10 sm:px-6 px-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthContainer;
