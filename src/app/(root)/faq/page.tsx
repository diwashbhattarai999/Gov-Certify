import Image from "next/image";

import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/common/max-width-container";
import Accordian from "@/components/ui/accordian";
import Breadcrumbs from "@/components/ui/bread-crumbs";

const FAQS = [
  {
    question: "How do I request a certificate?",
    answer:
      "To request a certificate, simply navigate to the respective certificate page and fill out the online form with the required information. Once submitted, our team will process your request.",
  },
  {
    question: "What types of certificates do you offer?",
    answer:
      "We offer online certification services for birth, death, marriage, and residential certificates.",
  },
  {
    question: "How long does it take to process a certificate request?",
    answer:
      "The processing time for certificate requests varies depending on the type of certificate and the volume of requests. Generally, it takes between 3 to 5 business days for standard processing. Expedited processing options are also available for urgent requests.",
  },
  {
    question: "Can I track the status of my certificate request?",
    answer:
      "Yes, you can track the status of your certificate request through your Gov-Certify account dashboard. Once logged in, you will be able to view the current status of your request, including any updates or notifications.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Sorry, we do not accept online payment as of now. But, we will be accepting various payment methods, including credit/debit cards, electronic bank transfers, and digital wallets. Then, you may choose the payment method that is most convenient for you during the checkout process.",
  },
  {
    question: "Are my personal details secure when submitting a request?",
    answer:
      "Yes, we take the security and privacy of your personal information seriously. Our platform utilizes advanced encryption and security measures to protect your data. Additionally, we adhere to strict privacy policies and guidelines to ensure the confidentiality of your information.",
  },
  {
    question: "What should I do if there is an error on my certificate?",
    answer:
      "If there is an error on your certificate, please contact our customer support team immediately. Provide details of the error along with any supporting documentation. Our team will review the issue and assist you in resolving it as quickly as possible.",
  },
  {
    question: "How can I cancel my certificate request?",
    answer:
      "To cancel your certificate request, please contact our customer support team as soon as possible. Provide them with your request details, and they will assist you in canceling the request.",
  },
  {
    question: "Is there a fee for certificate requests?",
    answer:
      "Yes, there may be a fee associated with certificate requests. The fee varies depending on the type of certificate and the processing options selected. Please refer to our pricing page for more information.",
  },
  {
    question: "Can I request a certificate on behalf of someone else?",
    answer:
      "Yes, you can request a certificate on behalf of someone else. However, you will need to provide the necessary information and documentation required for the request. Additionally, you may need to provide authorization or proof of relationship in some cases.",
  },
  {
    question: "What if I need a certificate urgently?",
    answer:
      "If you require a certificate urgently, we offer expedited processing options for certain types of certificates. You can select the expedited processing option during the request process, and additional fees may apply.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support team through various channels, including phone, email, or live chat. Visit our contact page for more information on how to reach us.",
  },
];

const FAQPage = () => {
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
                  Frequently Asked Questions
                </h1>
                <p className="text-lg md:text-2xl font-medium ml-1 text-muted-foreground">
                  {`Have questions? We have answers. Explore our FAQ section
                  to clear your doubts about certification.`}
                </p>
              </div>
              <div className="p-10 rounded-md flex flex-col gap-4">
                {FAQS.map((faq, index) => (
                  <Accordian key={index} faq={faq} />
                ))}
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
        className="opacity-50 -z-50 object-cover"
      />
    </>
  );
};

export default FAQPage;
