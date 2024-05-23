import { cn } from "@/lib/utils";
import { Fira_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/../public/images/Emblem_of_Nepal.svg";

const font = Fira_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

interface ILogoProps {
  showSlogan?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

const Logo = ({
  showSlogan = true,
  className,
  width = 60,
  height = 70,
}: ILogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-bold tracking-tight text-primary-foreground flex items-center gap-4",
        className
      )}
    >
      <Image
        src={LogoImg}
        alt="Logo"
        width={width}
        height={height}
        className="h-14"
      />
      <div className={font.className}>
        <h1>
          Gov <span>Certify</span>
        </h1>
        {showSlogan && (
          <p className="text-sm font-normal hidden md:block -tracking-[0.06em]">
            Your Digital Gateway to Official Certificates
          </p>
        )}
      </div>
    </Link>
  );
};

export default Logo;
