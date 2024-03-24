import { Suspense } from "react";
import Image from "next/image";

import LoginForm from "@/components/auth/login-form";
import AnimationWrapper from "@/components/animations/page-animation";
import SwiperWrapper from "@/components/ui/swiper-wrapper";

const LoginPage = () => {
  return (
    <Suspense>
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
            <LoginForm />
          </div>
        </div>
      </AnimationWrapper>
    </Suspense>
  );
};

export default LoginPage;
