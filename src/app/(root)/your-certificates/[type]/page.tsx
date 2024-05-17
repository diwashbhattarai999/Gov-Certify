import { currentUser } from "@/lib/auth";

import {
  getBirthCertificatesByUserId,
  getDeathCertificatesByUserId,
  getMarriageCertificatesByUserId,
  getResidentialCertificatesByUserId,
} from "@/data/certificates/certificates";

import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/common/max-width-container";
import Breadcrumbs from "@/components/ui/bread-crumbs";
import {
  IBirthCertificates,
  IDeathCertificates,
  IMarriageCertificates,
  IResidentialCertificates,
} from "@/types";
import Loader from "@/components/common/loader";
import CertificateDetails from "@/components/sections/your-certificates/certificate-details";

const YourCertificateTypePage = async ({
  params,
  searchParams,
}: {
  params: { type: "birth" | "death" | "marriage" | "residential" };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { type } = params;
  const { id } = searchParams ?? { id: "" };

  const user = await currentUser();

  let certificateData:
    | IBirthCertificates[]
    | IDeathCertificates[]
    | IMarriageCertificates[]
    | IResidentialCertificates[]
    | null;

  switch (type) {
    case "birth":
      certificateData = await getBirthCertificatesByUserId(user?.id as string);
      break;
    case "death":
      certificateData = await getDeathCertificatesByUserId(user?.id as string);
      break;
    case "marriage":
      certificateData = await getMarriageCertificatesByUserId(
        user?.id as string
      );
      break;
    case "residential":
      certificateData = await getResidentialCertificatesByUserId(
        user?.id as string
      );
      break;
    default:
      certificateData = null;
  }

  const certificate = certificateData?.find((cert) => cert.id === id);

  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <Breadcrumbs
          activeClasses="text-accent"
          containerClasses="flex py-5"
          listClasses="hover:underline font-bold"
          capitalizeLinks
        />
        <CertificateDetails certificate={certificate} type={type} />
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default YourCertificateTypePage;
