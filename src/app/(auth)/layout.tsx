import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link
        href="/"
        className="text-2xl font-bold tracking-tight text-primary-foreground max-md:flex items-center gap-4 my-8 md:hidden"
      >
        <Image
          src="images/Emblem_of_Nepal.svg"
          alt="Logo"
          width={500}
          height={500}
          className="w-14 h-14"
        />
        <div>
          <h1>
            Gov <span>Certify</span>
          </h1>
          <p className="text-sm font-normal -tracking-[0.06em]">
            Your Digital Gateway to Official Certificates
          </p>
        </div>
      </Link>
      <main className="relative h-full w-full">{children}</main>
    </div>
  );
};

export default AuthLayout;
