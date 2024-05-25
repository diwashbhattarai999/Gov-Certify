import Logo from "@/components/common/logo";
import UserProfile from "@/components/user-profile/user-profile";

const Topbar = () => {
  return (
    <div className="border-b border-border bg-background/50 backdrop-blur-sm py-4 flex items-center justify-between px-8 w-full h-20 fixed inset-0 z-40">
      <Logo showSlogan={false} width={55} />
      <UserProfile isAdmin />
    </div>
  );
};

export default Topbar;
