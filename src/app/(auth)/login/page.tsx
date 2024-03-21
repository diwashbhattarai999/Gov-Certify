import { Suspense } from "react";

import LoginForm from "@/components/auth/login-form";
import AnimationWrapper from "@/components/animations/page-animation";

const LoginPage = () => {
  return (
    <Suspense>
      <AnimationWrapper>
        <LoginForm />
      </AnimationWrapper>
    </Suspense>
  );
};

export default LoginPage;
