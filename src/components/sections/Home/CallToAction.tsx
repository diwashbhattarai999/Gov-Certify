"use client";

import Button from "@/components/ui/Button";

const CallToAction = () => (
  <section className="mt-20 bg-muted/50 py-20 text-center rounded-md flex flex-col gap-2 items-center justify-center">
    <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
    <p className="text-lg">
      Get your certificates processed quickly and efficiently with our top-notch
      services.
    </p>

    <Button
      className="mt-8 text-lg p-4 w-48"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      Get Started Now
    </Button>
  </section>
);

export default CallToAction;
