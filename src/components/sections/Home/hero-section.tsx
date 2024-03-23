import Input from "@/components/ui/input";
import Image from "next/image";
import { LuSearch } from "react-icons/lu";

const HeroSection = () => {
  return (
    <div className="w-full mt-5">
      <div className="relative bg-primary rounded-lg md:flex flex-col-reverse lg:flex-row justify-between items-center">
        <div className="px-4 lg:pl-8 py-24 z-20">
          <p className="text-sm font-medium">
            Experience Effortless Government Certification
          </p>
          <h1 className="text-4xl font-semibold mt-2 mb-4">
            Unlock Hassle-Free Certificate Registration
          </h1>
          <p className="max-w-[40rem]">
            <span className="text-accent font-semibold">Gov Certify</span>{" "}
            brings you a modern, user-friendly platform for hassle-free
            certificate registration. Say goodbye to long{" "}
            <span className="text-accent font-semibold">queues</span> and{" "}
            <span className="text-accent font-semibold">paperwork</span> –
            register for your official certificates conveniently from anywhere,
            anytime.
          </p>

          <div className="relative w-[70%] mt-10">
            <input className="pl-12 bg-background text-foreground rounded-xl mt-10 p-3 w-full h-full border-2 border-muted-foreground  focus:border-primary-foreground outline-none py-4 placeholder:text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-50" />
            <LuSearch className="absolute top-[3.5rem] left-5 h-6 w-6 pointer-events-none" />
          </div>
        </div>

        <div className="absolute top-0 right-0 w-[50%] z-10 bg-gradient-to-r from-primary to-transparent h-full max-lg:rounded-t-lg lg:rounded-r-lg" />
        <Image
          src="/images/nepal-parliament-building.jpg"
          alt="Banner"
          className="absolute top-0 right-0 w-[50%] h-full max-lg:rounded-t-lg lg:rounded-r-lg z-0"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default HeroSection;
