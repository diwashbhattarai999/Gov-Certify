import Logo from "@/components/common/logo";
import UserProfile from "@/components/user-profile/user-profile";

const Topbar = () => {
  return (
    <div className="border-b border-border py-4 flex items-center justify-between px-8 w-full">
      <Logo showSlogan={false} width={55} />
      <UserProfile isAdmin />
    </div>
  );
};

export default Topbar;
