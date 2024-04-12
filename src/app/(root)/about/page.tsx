import Image from "next/image";

import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import Breadcrumbs from "@/components/ui/bread-crumbs";

const AboutPage = () => {
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
              <div className="p-10 rounded-md flex flex-col gap-8">
                <h1 className="text-3xl md:text-6xl font-bold text-secondary-foreground">
                  About Gov-Certify
                </h1>
                <p className="text-muted-foreground">
                  Gov-Certify is an innovative platform that facilitates the
                  online certification process for vital records such as birth,
                  death, marriage, and residential certificates. Our mission is
                  to provide a convenient and efficient solution for individuals
                  to obtain these essential documents without hassle.
                </p>
                <p className="text-muted-foreground">
                  {`With Gov-Certify, users can fill out online forms to request
            certificates, providing necessary requester details and delivery
            preferences. Certificates can be delivered directly to the user's
            home or to the nearest ward office or municipality office for
            pickup, offering flexibility and convenience.`}
                </p>
              </div>

              <div className="p-10 rounded-md flex flex-col gap-8">
                <div>
                  <h2 className="text-xl md:text-4xl w-fit pb-2 font-bold text-secondary-foreground">
                    Our Mission
                  </h2>
                  <div className="w-32 h-2 bg-accent rounded-full" />
                </div>
                <div className="bg-background/50 shadow-sm rounded-md border border-border p-6">
                  <p className="text-lg font-semibold mb-2">
                    Simplify the Process
                  </p>
                  <p className="text-muted-foreground">
                    At Gov-Certify, we strive to simplify the process of
                    obtaining vital records by providing an accessible and
                    user-friendly platform.
                  </p>
                </div>
                <div className="bg-background/50 shadow-sm rounded-md border border-border p-6">
                  <p className="text-lg font-semibold mb-2">
                    Streamline Procedures
                  </p>
                  <p className="text-muted-foreground">
                    Our aim is to streamline bureaucratic procedures, saving
                    time and effort for individuals seeking essential
                    certificates.
                  </p>
                </div>
              </div>

              <div className="p-10 rounded-md flex flex-col gap-8">
                <div>
                  <h2 className="text-xl md:text-4xl w-fit pb-2 font-bold text-secondary-foreground">
                    Our History and Milestones
                  </h2>
                  <div className="w-32 h-2 bg-accent rounded-full" />
                </div>
                <div className="bg-background/50 shadow-sm rounded-md border border-border p-6">
                  <p className="text-lg font-semibold mb-2">
                    Launched Gov-Certify Platform
                  </p>
                  <p className="text-muted-foreground">
                    On 20 March, 2024, we launched the Gov-Certify platform with
                    initial certification services.
                  </p>
                </div>
                <div className="bg-background/50 shadow-sm rounded-md border border-border p-6">
                  <p className="text-lg font-semibold mb-2">
                    Expanded Service Coverage
                  </p>
                  <p className="text-muted-foreground">
                    By 30 March, 2024, we expanded our service coverage to
                    additional regions/countries.
                  </p>
                </div>
                <div className="bg-background/50 shadow-sm rounded-md border border-border p-6">
                  <p className="text-lg font-semibold mb-2">
                    Introduced New Features
                  </p>
                  <p className="text-muted-foreground">
                    On 5 April, 2024, we introduced new features such as online
                    form filling and delivery tracking.
                  </p>
                </div>
                <div className="bg-background/50 shadow-sm rounded-md border border-border p-6">
                  <p className="text-lg font-semibold mb-2">
                    Reached Milestone
                  </p>
                  <p className="text-muted-foreground">
                    By 15 April, 2024, we reached a milestone of processing
                    [number] certificates.
                  </p>
                </div>
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

export default AboutPage;
