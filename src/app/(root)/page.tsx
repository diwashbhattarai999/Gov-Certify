import AnimationWrapper from "@/components/animations/page-animation";
import Home from "@/components/sections/Home/Home";

export default async function HomePage() {
  return (
    <AnimationWrapper>
      <Home />
    </AnimationWrapper>
  );
}
