import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";

export default async function HomePage() {
  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <h1>Home Page</h1>
      </MaxWidthContainer>
    </AnimationWrapper>
  );
}
