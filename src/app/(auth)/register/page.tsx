import Image from "next/image";

import AnimationWrapper from "@/components/animations/page-animation";
import RegisterForm from "@/components/auth/register-form";
import SwiperWrapper from "@/components/ui/swiper-wrapper";

const RegisterPage = () => {
  return (
    <AnimationWrapper>
      <div className="flex h-screen">
        <div className="basis-[60%] h-full overflow-hidden">
          <SwiperWrapper>
            <Image
              src="/images/auth-bg.jpeg"
              alt="bg"
              width={500}
              height={500}
              className="w-full h-full"
            />
            <Image
              src="/images/auth-bg.jpeg"
              alt="bg"
              width={500}
              height={500}
              className="w-full h-full"
            />
          </SwiperWrapper>
        </div>
        <div className="basis-[40%] overflow-y-auto no-scrollbar ">
          <RegisterForm />
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default RegisterPage;
