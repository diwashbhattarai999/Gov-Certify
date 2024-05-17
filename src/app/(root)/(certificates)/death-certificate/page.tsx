import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/common/max-width-container";
import DeathCertificate from "@/components/sections/certificates/death/death-certificate";
import Breadcrumbs from "@/components/ui/bread-crumbs";

const DeathCertificatePage = () => {
  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <Breadcrumbs
          activeClasses="text-accent"
          containerClasses="flex py-5"
          listClasses="hover:underline font-bold"
          capitalizeLinks
        />
        <DeathCertificate />
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default DeathCertificatePage;
