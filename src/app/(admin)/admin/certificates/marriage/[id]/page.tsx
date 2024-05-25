import { IMarriageCertificates } from "@/types";

import { getAllMarriageCertificates } from "@/data/certificates/certificates";

import AnimationWrapper from "@/components/animations/page-animation";
import CertificateDetails from "@/components/sections/your-certificates/certificate-details";

const YourCertificateTypePage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;

  const certificateData: IMarriageCertificates[] | null =
    await getAllMarriageCertificates();

  const certificate = certificateData?.find((cert) => cert.id === id);

  return (
    <AnimationWrapper className="mb-10">
      <CertificateDetails certificate={certificate} type="marriage" />
    </AnimationWrapper>
  );
};

export default YourCertificateTypePage;
