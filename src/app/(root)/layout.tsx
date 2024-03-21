import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 mt-[80px]">
          <main className="relative">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}
