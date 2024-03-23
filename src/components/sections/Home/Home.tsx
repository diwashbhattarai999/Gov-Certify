import HeroSection from "./hero-section";
import Services from "./services";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  return (
    <div>
      <HeroSection />
      {/* Services - Birth, death, marriage, migration */}
      <Services />
      {/*  */}
      {/*  */}
    </div>
  );
};

export default Home;
