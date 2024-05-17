export const dynamic = "force-dynamic";

import { currentUser } from "@/lib/auth";

import {
  getBirthCertificatesByUserId,
  getDeathCertificatesByUserId,
  getMarriageCertificatesByUserId,
  getResidentialCertificatesByUserId,
} from "@/data/certificates/certificates";

import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/common/max-width-container";
import CertificateTable from "@/components/sections/your-certificates/certificate-table";
import Breadcrumbs from "@/components/ui/bread-crumbs";
import {
  IBirthCertificates,
  ICertificates,
  IDeathCertificates,
  IMarriageCertificates,
  IResidentialCertificates,
} from "@/types";
import Services from "@/components/sections/Home/services";

const YourCertificatesPage = async () => {
  const user = await currentUser();

  // Fetch birth, death, and marriage certificates for the current user
  const birthCertificates = await getBirthCertificatesByUserId(
    user?.id as string
  );
  const deathCertificates = await getDeathCertificatesByUserId(
    user?.id as string
  );
  const marriageCertificates = await getMarriageCertificatesByUserId(
    user?.id as string
  );
  const residentialCertificates = await getResidentialCertificatesByUserId(
    user?.id as string
  );

  // Create an object to hold certificates grouped by type
  const certificates: {
    birth: IBirthCertificates[];
    death: IDeathCertificates[];
    marriage: IMarriageCertificates[];
    residential: IResidentialCertificates[];
  } = {
    birth: birthCertificates || [],
    death: deathCertificates || [],
    marriage: marriageCertificates || [],
    residential: residentialCertificates || [],
  };

  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <Breadcrumbs
          activeClasses="text-accent"
          containerClasses="flex py-5"
          listClasses="hover:underline font-bold"
          capitalizeLinks
        />

        {certificates.birth.length ||
        certificates.death.length ||
        certificates.marriage.length > 0 ? (
          <div className="flex flex-col bg-stone-50 p-4 border border-border shadow-sm rounded-md mb-20">
            <div className="flex-1">
              <h1 className="text-xl font-medium text-muted-foreground mb-8 border-b border-border pb-2">
                View details of all applied certificates
              </h1>
              <CertificateTable allCertificates={certificates} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[65vh]">
            <div className="text-muted-foreground mb-6 text-center">
              <h1 className="text-4xl font-medium ">No certificates found</h1>
              <p className="text-xl">Apply for certificates Now</p>
            </div>
            <Services />
          </div>
        )}
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default YourCertificatesPage;
