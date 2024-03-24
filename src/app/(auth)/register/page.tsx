import Image from "next/image";

import AnimationWrapper from "@/components/animations/page-animation";
import RegisterForm from "@/components/auth/register-form";
import SwiperWrapper from "@/components/ui/swiper-wrapper";

const RegisterPage = () => {
  return (
    <AnimationWrapper>
      <div className="flex h-screen">
        <div className="lg:basis-[60%] lg:h-full lg:overflow-hidden max-lg:hidden">
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
        <div className="lg:basis-[40%] lg:overflow-y-auto lg:no-scrollbar max-lg:w-full">
          <RegisterForm />
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default RegisterPage;
