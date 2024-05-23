import {
  IBirthCertificates,
  IDeathCertificates,
  IMarriageCertificates,
  IResidentialCertificates,
} from "@/types";

import {
  getAllBirthCertificates,
  getAllDeathCertificates,
  getAllMarriageCertificates,
  getAllResidentialCertificates,
} from "@/data/certificates/certificates";

import CertificateSelect from "@/components/admin/certificate-select";
import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/common/max-width-container";
import Breadcrumbs from "@/components/ui/bread-crumbs";

const AdminCertificatesLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Fetch birth, death, and marriage certificates for the current user
  const birthCertificates = await getAllBirthCertificates();
  const deathCertificates = await getAllDeathCertificates();
  const marriageCertificates = await getAllMarriageCertificates();
  const residentialCertificates = await getAllResidentialCertificates();

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
        {certificates.birth.length ||
        certificates.death.length ||
        certificates.marriage.length > 0 ? (
          <div>
            <CertificateSelect />
            <Breadcrumbs
              activeClasses="text-accent"
              containerClasses="flex mt-0 mb-2"
              listClasses="hover:underline font-bold"
              capitalizeLinks
            />
            {children}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[65vh]">
            <div className="text-muted-foreground mb-6 text-center">
              <h1 className="text-4xl font-medium ">No certificates found</h1>
            </div>
          </div>
        )}
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default AdminCertificatesLayout;
