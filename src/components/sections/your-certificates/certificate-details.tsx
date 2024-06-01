"use client";

import Loader from "@/components/common/loader";
import { BirthDetailsSchema } from "@/schemas";
import {
  IBirthCertificates,
  IDeathCertificates,
  IMarriageCertificates,
  IResidentialCertificates,
} from "@/types";
import { DeliveryDetails, Requester } from "@prisma/client";

interface ICertificateDetailsProps {
  certificate:
    | IBirthCertificates
    | IDeathCertificates
    | IMarriageCertificates
    | IResidentialCertificates
    | undefined;
  type: "birth" | "death" | "marriage" | "residential";
}

const CertificateDetails = ({
  certificate,
  type,
}: ICertificateDetailsProps) => {
  if (!certificate) return <Loader blur={false} />;

  const birthBody = (certificate: IBirthCertificates) => {
    return (
      <div className="flex flex-col bg-stone-50 p-4 border border-border shadow-sm rounded-md mb-10">
        <h1>Application {certificate?.applicationNumber}</h1>
        <div className="flex gap-4 flex-col">
          <h2 className="font-semibold text-lg my-4 underline">
            Personal Details:
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Name */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Name:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.firstName} {certificate?.middleName || ""}{" "}
                {certificate?.lastName}
              </p>
            </li>

            {/* Date of Birth */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Date of Birth:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.DateOfBirth}
              </p>
            </li>

            {/* Gender */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Gender
              </h3>
              <p className="text-muted-foreground">{certificate?.gender}</p>
            </li>

            {/* Birth Country */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Birth Country
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfBirthCountry}
              </p>
            </li>

            {/* Birth Province */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Birth Province
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfBirthProvince}
              </p>
            </li>

            {/* Birth District */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Birth District
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfBirthDistrict}
              </p>
            </li>

            {/* Birth City */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Birth City
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfBirthCity}
              </p>
            </li>

            {/* Father's Name */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                {`Father's Name:`}
              </h3>
              <p className="text-muted-foreground">
                {certificate?.fatherFirstName}{" "}
                {certificate?.fatherMiddleName || ""}{" "}
                {certificate?.fatherLastName}
              </p>
            </li>

            {/* Mother's Name */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                {`Mother's Name:`}
              </h3>
              <p className="text-muted-foreground">
                {certificate?.motherFirstName}{" "}
                {certificate?.motherMiddleName || ""}{" "}
                {certificate?.motherLastName}
              </p>
            </li>
          </ul>
        </div>

        <RequesterDeliveryDetails
          requester={certificate?.requester}
          deliveryDetails={certificate?.deliveryDetails}
        />
      </div>
    );
  };

  const deathBody = (certificate: IDeathCertificates) => {
    return (
      <div className="flex flex-col bg-stone-50 p-4 border border-border shadow-sm rounded-md">
        <h1>Application {certificate?.applicationNumber}</h1>
        <div className="flex gap-4 flex-col">
          <h2 className="font-semibold text-lg my-4 underline">
            Personal Details:
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Name */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Name:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.firstName} {certificate?.middleName || ""}{" "}
                {certificate?.lastName}
              </p>
            </li>

            {/* Date of Death */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Date of Death:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.dateOfDeath}
              </p>
            </li>

            {/* Gender */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Gender:
              </h3>
              <p className="text-muted-foreground">{certificate?.gender}</p>
            </li>

            {/* Death Country */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Death Country:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfDeathCountry}
              </p>
            </li>

            {/* Death Province */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Death Province:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfDeathProvince}
              </p>
            </li>

            {/* Death District */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Death District:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfDeathDistrict}
              </p>
            </li>

            {/* Death City */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Death City:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfDeathCity}
              </p>
            </li>

            {/* Cause of Death */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Cause of Death:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.causeOfDeath}
              </p>
            </li>
          </ul>
        </div>

        <RequesterDeliveryDetails
          requester={certificate?.requester}
          deliveryDetails={certificate?.deliveryDetails}
        />
      </div>
    );
  };

  const marriageBody = (certificate: IMarriageCertificates) => {
    return (
      <div className="flex flex-col bg-stone-50 p-4 border border-border shadow-sm rounded-md">
        <h1>Application {certificate?.applicationNumber}</h1>
        <div className="flex gap-4 flex-col">
          <h2 className="font-semibold text-lg my-4 underline">
            Personal Details:
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Husband Name */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Husband Name:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.husbandFirstName}{" "}
                {certificate?.husbandMiddleName || ""}{" "}
                {certificate?.husbandLastName}
              </p>
            </li>

            {/* Wife Name */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Wife Name:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.WifeFirstName} {certificate?.wifeMiddleName || ""}{" "}
                {certificate?.wifeLastName}
              </p>
            </li>

            {/* Date of Marriage */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Date of Marriage:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.dateOfMarriage}
              </p>
            </li>

            {/* Marriage Country */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Marriage Country
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfMarriageCountry}
              </p>
            </li>

            {/* Marriage Province */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Marriage Province
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfMarriageProvince}
              </p>
            </li>

            {/* Marriage District */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Marriage District
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfMarriageDistrict}
              </p>
            </li>

            {/* Marriage City */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Marriage City
              </h3>
              <p className="text-muted-foreground">
                {certificate?.placeOfMarriageCity}
              </p>
            </li>
          </ul>
        </div>

        <RequesterDeliveryDetails
          requester={certificate?.requester}
          deliveryDetails={certificate?.deliveryDetails}
        />
      </div>
    );
  };

  const residentialBody = (certificate: IResidentialCertificates) => {
    return (
      <div className="flex flex-col bg-stone-50 p-4 border border-border shadow-sm rounded-md">
        <h1>Application {certificate?.applicationNumber}</h1>
        <div className="flex gap-4 flex-col">
          <h2 className="font-semibold text-lg my-4 underline">
            Personal Details:
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Current Country */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Current Country
              </h3>
              <p className="text-muted-foreground">
                {certificate?.currentCountry}
              </p>
            </li>

            {/* Current Province */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Current Province
              </h3>
              <p className="text-muted-foreground">
                {certificate?.currentProvince}
              </p>
            </li>

            {/* Current District */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Current District
              </h3>
              <p className="text-muted-foreground">
                {certificate?.currentDistrict}
              </p>
            </li>

            {/* Current City */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Current City
              </h3>
              <p className="text-muted-foreground">
                {certificate?.currentCity}
              </p>
            </li>

            {/* Destination Country */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Destination Country
              </h3>
              <p className="text-muted-foreground">
                {certificate?.destinationCountry}
              </p>
            </li>

            {/* Destination Province */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Destination Province
              </h3>
              <p className="text-muted-foreground">
                {certificate?.destinationProvince}
              </p>
            </li>

            {/* Destination District */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Destination District
              </h3>
              <p className="text-muted-foreground">
                {certificate?.destinationDistrict}
              </p>
            </li>

            {/* Destination City */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Destination City
              </h3>
              <p className="text-muted-foreground">
                {certificate?.destinationCity}
              </p>
            </li>

            {/* Date of Residential Migration */}
            <li className="flex gap-4 min-w-72">
              <h3 className="capitalize font-medium text-secondary-foreground ">
                Date of Residential Migration:
              </h3>
              <p className="text-muted-foreground">
                {certificate?.dateOfResidentialMigration}
              </p>
            </li>
          </ul>
        </div>

        <RequesterDeliveryDetails
          requester={certificate?.requester}
          deliveryDetails={certificate?.deliveryDetails}
        />
      </div>
    );
  };

  switch (type) {
    case "birth":
      return birthBody(certificate as IBirthCertificates);
    case "death":
      return deathBody(certificate as IDeathCertificates);
    case "marriage":
      return marriageBody(certificate as IMarriageCertificates);
    case "residential":
      return residentialBody(certificate as IResidentialCertificates);
    default:
      return null;
  }
};

export default CertificateDetails;

const RequesterDeliveryDetails = ({
  requester,
  deliveryDetails,
}: {
  requester: Requester;
  deliveryDetails: DeliveryDetails;
}) => {
  return (
    <>
      <div className="flex gap-4 flex-col">
        <h2 className="font-semibold text-lg my-4 underline">
          {`Requester's Details:`}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="flex gap-4 min-w-72">
            <h3 className="capitalize font-medium text-secondary-foreground ">
              Name:
            </h3>
            <p className="text-muted-foreground">
              {requester?.requesterFirstName}{" "}
              {requester?.requesterMiddleName || ""}{" "}
              {requester?.requesterLastName}
            </p>
          </li>
          <li className="flex gap-4 min-w-72">
            <h3 className="capitalize font-medium text-secondary-foreground ">
              Email:
            </h3>
            <p className="text-muted-foreground">{requester?.requesterEmail}</p>
          </li>
          <li className="flex gap-4 min-w-72">
            <h3 className="capitalize font-medium text-secondary-foreground ">
              Mobile Number:
            </h3>
            <p className="text-muted-foreground">
              {requester?.requesterMobileNumber}
            </p>
          </li>
        </ul>
      </div>
      <div className="flex gap-4 flex-col">
        <h2 className="font-semibold text-lg my-4 underline">
          Delivery Details:
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="flex gap-4 min-w-72">
            <h3 className="capitalize font-medium text-secondary-foreground ">
              Delivery Option:
            </h3>
            <p className="text-muted-foreground">
              {deliveryDetails?.deliveryOption}
            </p>
          </li>
          <li className="flex gap-4 min-w-72">
            <h3 className="capitalize font-medium text-secondary-foreground ">
              Delivery Province:
            </h3>
            <p className="text-muted-foreground">
              {deliveryDetails?.deliveryProvince}
            </p>
          </li>
          <li className="flex gap-4 min-w-72">
            <h3 className="capitalize font-medium text-secondary-foreground ">
              Delivery District:
            </h3>
            <p className="text-muted-foreground">
              {deliveryDetails?.deliveryDistrict}
            </p>
          </li>
          <li className="flex gap-4 min-w-72">
            <h3 className="capitalize font-medium text-secondary-foreground ">
              Delivery Address:
            </h3>
            <p className="text-muted-foreground">
              {deliveryDetails?.deliveryAddress}
            </p>
          </li>
          {deliveryDetails?.deliveryOption === "PICK_UP" && (
            <>
              <li className="flex gap-4 min-w-72">
                <h3 className="capitalize font-medium text-secondary-foreground ">
                  Delivery Municipality:
                </h3>
                <p className="text-muted-foreground">
                  {deliveryDetails?.deliveryMunicipality}
                </p>
              </li>
              <li className="flex gap-4 min-w-72">
                <h3 className="capitalize font-medium text-secondary-foreground ">
                  Delivery Ward:
                </h3>
                <p className="text-muted-foreground">
                  {deliveryDetails?.deliveryWard}
                </p>
              </li>
            </>
          )}
          <li className="flex gap-4 min-w-72">
            <h3 className="capitalize font-medium text-secondary-foreground ">
              Postal Code:
            </h3>
            <p className="text-muted-foreground">
              {deliveryDetails?.deliveryPostalCode}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};
