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
              src="/images/gov-auth-1.svg"
              alt="bg"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover"
            />
            <Image
              src="/images/gov-auth-2.svg"
              alt="bg"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover"
            />
            <Image
              src="/images/gov-auth-3.jpg"
              alt="bg"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover"
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
