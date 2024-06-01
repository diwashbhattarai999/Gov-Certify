import CallToAction from "./CallToAction";
import Steps from "./Steps";
import Hero from "./hero";
import Services from "./services";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <Services showTitle />
      <Steps />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default Home;
