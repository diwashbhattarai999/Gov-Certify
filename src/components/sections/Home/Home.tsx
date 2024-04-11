import Hero from "./hero";
import Services from "./services";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  return (
    <div>
      <Hero />
      <Services showTitle />
      {/*  */}
      {/*  */}
    </div>
  );
};

export default Home;
