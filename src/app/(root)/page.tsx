import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/common/max-width-container";
import Home from "@/components/sections/Home/Home";

export default async function HomePage() {
  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <Home />
      </MaxWidthContainer>
    </AnimationWrapper>
  );
}
