import { IResidentialCertificates } from "@/types";

import { getAllResidentialCertificates } from "@/data/certificates/certificates";

import AnimationWrapper from "@/components/animations/page-animation";
import CertificateDetails from "@/components/sections/your-certificates/certificate-details";

const YourCertificateTypePage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;

  const certificateData: IResidentialCertificates[] | null =
    await getAllResidentialCertificates();

  const certificate = certificateData?.find((cert) => cert.id === id);

  return (
    <AnimationWrapper className="mb-10">
      <CertificateDetails certificate={certificate} type="residential" />
    </AnimationWrapper>
  );
};

export default YourCertificateTypePage;
