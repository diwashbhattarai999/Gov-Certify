import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center">
      <main className="relative h-full w-full">{children}</main>
    </div>
  );
};

export default AuthLayout;
