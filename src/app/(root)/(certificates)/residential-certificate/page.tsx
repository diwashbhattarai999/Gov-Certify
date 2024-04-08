import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import ResidentialCertificate from "@/components/sections/certificates/residential/residential-certificate";
import Breadcrumbs from "@/components/ui/bread-crumbs";

const ResidentialCertificatePage = () => {
  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <Breadcrumbs
          activeClasses="text-accent"
          containerClasses="flex py-5"
          listClasses="hover:underline font-bold"
          capitalizeLinks
        />
        <ResidentialCertificate />
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default ResidentialCertificatePage;
