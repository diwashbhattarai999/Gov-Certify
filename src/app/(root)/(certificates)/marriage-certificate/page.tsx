import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/common/max-width-container";
import MarriageCertificate from "@/components/sections/certificates/marriage/marriage-certificate";
import Breadcrumbs from "@/components/ui/bread-crumbs";

const MarriageCertificatePage = () => {
  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <Breadcrumbs
          activeClasses="text-accent"
          containerClasses="flex py-5"
          listClasses="hover:underline font-bold"
          capitalizeLinks
        />
        <MarriageCertificate />
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default MarriageCertificatePage;
