import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import BirthCertificate from "@/components/sections/certificates/birth/birth-certificate";
import CertificateWrapper from "@/components/sections/certificates/certificate-wrapper";
import BreadCrumbs from "@/components/ui/bread-crumbs";

const BirthCertificatePage = () => {
  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <BreadCrumbs
          activeClasses="text-accent"
          containerClasses="flex py-5"
          listClasses="hover:underline font-bold"
          capitalizeLinks
        />
        <BirthCertificate />
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default BirthCertificatePage;
