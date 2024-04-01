export const dynamic = "force-dynamic";

import { currentUser } from "@/lib/auth";

import { getCertificatesByUserId } from "@/data/certificates/certificates";

import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import CertificateTable from "@/components/sections/your-certificates/certificate-table";
import Breadcrumbs from "@/components/ui/bread-crumbs";

const YourCertificatesPage = async () => {
  const user = await currentUser();
  const birthCertificates = user?.id
    ? await getCertificatesByUserId(user.id)
    : [];

  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <Breadcrumbs
          activeClasses="text-accent"
          containerClasses="flex py-5"
          listClasses="hover:underline font-bold"
          capitalizeLinks
        />

        <div className="flex flex-col bg-stone-50 p-4 border border-border shadow-sm rounded-md">
          <div className="flex-1">
            <h1 className="text-xl font-medium text-muted-foreground mb-8 border-b border-border pb-2">
              View details of all applied certificates
            </h1>
            <CertificateTable birthCertificates={birthCertificates} />
          </div>
        </div>
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default YourCertificatesPage;
