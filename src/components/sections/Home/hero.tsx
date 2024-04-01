import Input from "@/components/ui/input";
import Image from "next/image";
import { LuSearch } from "react-icons/lu";

const Hero = () => {
  return (
    <div className="w-full mt-5">
      <div className="relative bg-primary rounded-lg flex justify-between items-center">
        <div className="px-4 lg:pl-8 py-24 z-20">
          <p className="font-medium">
            Experience Effortless Government Certification
          </p>
          <h1 className="text-4xl font-semibold mt-2 mb-4">
            Unlock Hassle-Free Certificate Registration
          </h1>
          <p className="max-w-[40rem] text-lg">
            <span className="text-accent font-semibold">Gov Certify</span>{" "}
            brings you a modern, user-friendly platform for hassle-free
            certificate registration. Say goodbye to long{" "}
            <span className="text-accent font-semibold">queues</span> and{" "}
            <span className="text-accent font-semibold">paperwork</span> –
            register for your official certificates conveniently from anywhere,
            anytime.
          </p>

          <div className="relative w-full md:w-[80%] mt-20 flex items-center">
            <input className="pl-12 bg-background text-foreground rounded-xl p-3 w-full h-full border-2 border-muted-foreground  focus:border-primary-foreground outline-none py-4 placeholder:text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-50" />
            <LuSearch className="absolute top-[1rem] left-5 h-6 w-6 pointer-events-none" />
            <div className="absolute top-0 right-0 rounded-r-xl px-8 bg-accent text-accent-foreground h-full flex items-center justify-center border-l-2 border-muted-foreground cursor-pointer hover:bg-accent/90 duration-300 font-semibold">
              Search
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-full md:w-[60%] z-10 bg-primary/80 md:bg-gradient-to-r from-primary to-transparent h-full max-lg:rounded-t-lg lg:rounded-r-lg" />
        <Image
          src="/images/nepal-parliament-building.jpg"
          alt="Banner"
          className="absolute top-0 right-0 w-full md:w-[60%] h-full max-lg:rounded-t-lg lg:rounded-r-lg z-0"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default Hero;
