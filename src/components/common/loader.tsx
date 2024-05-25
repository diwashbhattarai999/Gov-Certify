import { cn } from "@/lib/utils";
import { Triangle } from "react-loader-spinner";

interface ILoaderProps {
  blur?: boolean;
}

const Loader = ({ blur = true }: ILoaderProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 h-screen w-full flex items-center justify-center z-50",
        { " bg-foreground/20 backdrop-blur-md": blur }
      )}
    >
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#2463eb"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
