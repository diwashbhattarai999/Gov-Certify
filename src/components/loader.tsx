import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 backdrop-blur-sm h-screen w-full bg-foreground/5 flex items-center justify-center">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#2463eb"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
