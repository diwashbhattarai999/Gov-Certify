import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import Breadcrumbs from "@/components/ui/bread-crumbs";

const MigrationCertificatePage = () => {
  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <Breadcrumbs
          activeClasses="text-accent"
          containerClasses="flex py-5"
          listClasses="hover:underline font-bold"
          capitalizeLinks
        />
        MigrationCertificatePage
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default MigrationCertificatePage;
