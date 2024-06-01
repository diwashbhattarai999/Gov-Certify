"use client";

import Button from "@/components/ui/Button";

const CallToAction = () => (
  <section className="mt-20 mb-5 bg-accent/90 text-white py-10 text-center rounded-md flex flex-col gap-2 items-center justify-center">
    <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
    <p className="text-lg">
      Get your certificates processed quickly and efficiently with our top-notch
      services.
    </p>
    <Button outline className="text-primary mt-8 text-lg">
      Get Started Now
    </Button>
  </section>
);

export default CallToAction;
