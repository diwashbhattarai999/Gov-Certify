import Image from "next/image";
import { LuSearch } from "react-icons/lu";

const Hero = () => {
  return (
    <div className="w-full mt-5">
      <div className="relative bg-background rounded-lg flex justify-between items-center overflow-x-hidden">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="py-24 z-20">
          <p className="md:text-lg font-medium">
            Experience Effortless Government Certification
          </p>
          <h1 className="max-md:text-[2.5rem] md:text-[3.5rem] font-bold text-secondary-foreground mt-4 mb-6 -ml-1 leading-[3rem] md:leading-[3.5rem]">
            Unlock Hassle-Free Certificate Registration
          </h1>
          <p className="max-w-[40rem] text-lg">
            <span className="text-accent font-semibold">Gov Certify</span>{" "}
            brings you a modern, user-friendly platform for hassle-free
            certificate registration. Say goodbye to long{" "}
            <span className="text-accent font-semibold underline">queues</span>{" "}
            and{" "}
            <span className="text-accent font-semibold underline">
              paperwork
            </span>{" "}
            – register for your official certificates conveniently from
            anywhere, anytime.
          </p>

          <div className="relative w-full md:max-w-[40rem] mt-20 flex items-center">
            <input className="pl-12 bg-background text-foreground rounded-xl p-3 w-full h-full border-2 border-muted-foreground  focus:border-primary-foreground outline-none py-4 placeholder:text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-50" />
            <LuSearch className="absolute top-[1rem] left-5 h-6 w-6 pointer-events-none" />
            <div className="absolute top-0 right-0 rounded-r-xl px-8 bg-accent text-accent-foreground h-full flex items-center justify-center border-l-2 border-muted-foreground cursor-pointer hover:bg-accent/90 duration-300 font-semibold">
              Search
            </div>
          </div>
        </div>

        {/* <div className="absolute top-0 right-0 w-full md:w-[60%] z-10 bg-primary/80 md:bg-gradient-to-r from-primary to-transparent h-full max-lg:rounded-t-lg lg:rounded-r-lg max-md:hidden" /> */}
        {/* <Image
          src="/images/nepal-parliament-building.jpg"
          alt="Banner"
          className="max-md:hidden absolute top-0 right-0 w-full md:w-[60%] h-full max-lg:rounded-t-lg lg:rounded-r-lg z-0 object-cover"
          width={500}
          height={500}
        /> */}
        <Image
          src="/images/hero-image.webp"
          alt="Banner"
          className="z-10 object-contain !right-[-86px] !top-0 !left-auto !bottom-auto !w-1/2"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          quality={100}
          fill
        />
        <Image
          src="/images/digital-file.svg"
          alt="Banner"
          className="absolute top-0 -left-10 opacity-20"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          quality={100}
          width={200}
          height={200}
        />
        <Image
          src="/images/digital-file.svg"
          alt="Banner"
          className="absolute bottom-[150px] left-[500px] opacity-20"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          quality={100}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default Hero;
