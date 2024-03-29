import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
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
        DeathCertificatePage
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default DeathCertificatePage;
