import { Suspense } from "react";

import NewPasswordForm from "@/components/auth/new-password-form";
import AnimationWrapper from "@/components/animations/page-animation";

const NewPasswordPage = () => {
  return (
    <Suspense>
      <AnimationWrapper>
        <NewPasswordForm />
      </AnimationWrapper>
    </Suspense>
  );
};

export default NewPasswordPage;
