import { Suspense } from "react";

import NewVerificationForm from "@/components/auth/new-verification-form";
import AnimationWrapper from "@/components/animations/page-animation";

const NewVerificationPage = () => {
  return (
    <Suspense >
      <AnimationWrapper>
        <NewVerificationForm />
      </AnimationWrapper>
    </Suspense>
  );
};

export default NewVerificationPage;
