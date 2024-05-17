import Image from "next/image";

import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/common/max-width-container";
import Breadcrumbs from "@/components/ui/bread-crumbs";
import ContactForm from "@/components/sections/contact/contact-form";

const ContactPage = () => {
  return (
    <>
      <MaxWidthContainer>
        <AnimationWrapper>
          <section className="pt-8 pb-16 -mb-8 -mt-4">
            <Breadcrumbs
              activeClasses="text-accent mb-6"
              containerClasses="flex py-5"
              listClasses="hover:underline font-bold"
              capitalizeLinks
            />
            <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-md relative">
              <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />
              <div className="p-10 pb-0 pl-9 rounded-md flex flex-col gap-4">
                <h1 className="text-3xl md:text-6xl font-bold text-secondary-foreground">
                  Contact Us
                </h1>
                <p className="text-lg md:text-2xl font-medium ml-1 text-muted-foreground">
                  {`Got queries? We've got answers. Contact us for expert guidance
                  on certification.`}
                </p>
              </div>
              <div className="p-10 rounded-md flex flex-col gap-4">
                <ContactForm />
              </div>
            </div>
          </section>
        </AnimationWrapper>
      </MaxWidthContainer>
      <Image
        src="/images/sagarmatha.webp"
        alt="Sagarmatha about"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        priority
        quality={100}
        className="fixed inset-0 opacity-50 -z-50 object-cover"
      />
    </>
  );
};

export default ContactPage;
