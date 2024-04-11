"use client";

import { useEffect, useState } from "react";

import { DeliveryOption, Relationship } from "@prisma/client";

import { IMarriageFormData } from "@/types";

import {
  MarriageFormProvider,
  useMarriageFormState,
} from "@/context/marriage-form-context";

import CertificateWrapper from "@/components/sections/certificates/certificate-wrapper";
import MarriagePersonalDetailsForm from "./marriage-personal-details-form";
import MarriageRequestorsDetailsForm from "./marriage-requesters-details-form";
import MarriageDeliveryDetailsForm from "./marriage-delivery-details-form";
import MarriageFormSummary from "./marriage-form-summary";

const initialFormData: IMarriageFormData = {
  husbandFirstName: "",
  husbandMiddleName: "",
  husbandLastName: "",
  WifeFirstName: "",
  wifeMiddleName: "",
  wifeLastName: "",
  dateOfMarriage: "",
  placeOfMarriageCity: "",
  placeOfMarriageCountry: "Nepal",
  placeOfMarriageProvince: "",
  placeOfMarriageDistrict: "",
  relationshipToRequestor: "SELF",
  requesterFirstName: "",
  requesterMiddleName: "",
  requesterLastName: "",
  requesterEmail: "",
  requesterMobileNumber: "",
  DeliveryOption: DeliveryOption.PICK_UP,
  deliveryProvince: "",
  deliveryDistrict: "",
  deliveryAddress: "",
  deliveryMunicipality: "",
  deliveryWard: "",
  deliveryPostalCode: "",
};

const ActiveStepFormComponent = () => {
  const { step, resetFormData } = useMarriageFormState();
  const [shouldResetFormData, setShouldResetFormData] = useState(true);

  useEffect(() => {
    if (shouldResetFormData) {
      resetFormData();
      setShouldResetFormData(false);
    }
  }, [shouldResetFormData, resetFormData]);

  switch (step) {
    case 1:
      return <MarriagePersonalDetailsForm />;
    case 2:
      return <MarriageRequestorsDetailsForm />;
    case 3:
      return <MarriageDeliveryDetailsForm />;
    case 4:
      return <MarriageFormSummary />;
    default:
      return null;
  }
};

const MarriageCertificate = () => {
  return (
    <MarriageFormProvider initialFormData={initialFormData}>
      <CertificateWrapper certificateTitle="Marriage">
        <ActiveStepFormComponent />
      </CertificateWrapper>
    </MarriageFormProvider>
  );
};

export default MarriageCertificate;
