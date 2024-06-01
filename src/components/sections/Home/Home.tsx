import CallToAction from "./CallToAction";
import Steps from "./Steps";
import Hero from "./hero";
import Services from "./services";
import Testimonials from "./Testimonials";
import MaxWidthContainer from "@/components/common/max-width-container";

const Home = () => {
  return (
    <>
      <MaxWidthContainer>
        <Hero />
        <Services showTitle />
        <Steps />
        <Testimonials />
      </MaxWidthContainer>
      <CallToAction />
    </>
  );
};

export default Home;
