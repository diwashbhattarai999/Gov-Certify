const STEPS = [
  {
    step: 1,
    title: "Select a Service",
    description: "Choose any of the available services.",
  },
  {
    step: 2,
    title: "Complete the Form",
    description: "Accurately fill out the required form with your details.",
  },
  {
    step: 3,
    title: "Submit the Form",
    description: "Submit your completed form and await verification.",
  },
  {
    step: 4,
    title: "Receive Your Certificate",
    description:
      "Collect your certificate at your doorstep or from local government offices such as the ward or municipality.",
  },
];

const Steps = () => {
  return (
    <section className="mt-32 mb-20 relative">
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-2xl font-bold text-center">
          How to Use Our{" "}
          <span className="text-accent font-semibold">Services</span>
        </h1>
        <div className="w-44 h-1 bg-accent rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-8 mt-16 relative">
        {STEPS.map((step, index) => (
          <div key={step.step} className="relative flex-1">
            <div className="px-3 py-10 w-full rounded-md flex items-center justify-center flex-col">
              <div className="text-4xl font-bold text-accent border-4 border-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {step.step}
              </div>
              <h3 className="text-2xl font-semibold mb-2 min-h-[3rem]">
                {step.title}
              </h3>
              <p className="text-center text-sm min-h-[3rem]">
                {step.description}
              </p>
            </div>
            {index < STEPS.length - 1 && (
              <svg
                className="absolute -right-5 top-[48%] transform -translate-y-1/2 hidden lg:block text-accent"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
              >
                <path
                  fillRule="evenodd"
                  d="M13.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L16.586 11H4a1 1 0 110-2h12.586l-3.293-3.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
