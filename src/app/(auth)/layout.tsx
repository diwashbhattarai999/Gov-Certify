import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div className="basis-[60%] h-full overflow-hidden">
        <Image
          src="/images/auth-bg.jpeg"
          alt="bg"
          width={500}
          height={500}
          className="w-full h-full"
        />
      </div>
      <div className="basis-[40%] overflow-y-auto no-scrollbar py-12">
        <main className="relative h-full">{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
