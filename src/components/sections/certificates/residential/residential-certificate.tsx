"use client";

import { useEffect, useState } from "react";

import { IResidentialFormData } from "@/types";
import {
  ResidentialFormProvider,
  useResidentialFormState,
} from "@/context/residential-form-context ";

import ResidentialDetailsForm from "./residential-details-form";
import ResidentialRequestorsDetailsForm from "./residential-requesters-details-form";
import ResidentialDeliveryDetailsForm from "./residential-delivery-details-form";
import ResidentialFormSummary from "./residential-form-summary";
import CertificateWrapper from "@/components/sections/certificates/certificate-wrapper";

const initialFormData: IResidentialFormData = {
  currentCountry: "Nepal",
  currentProvince: "",
  currentDistrict: "",
  currentCity: "",
  destinationCountry: "Nepal",
  destinationProvince: "",
  destinationDistrict: "",
  destinationCity: "",
  dateOfResidentialMigration: "",
  familyMembers: [],
  requesterFirstName: "",
  requesterMiddleName: "",
  requesterLastName: "",
  requesterEmail: "",
  requesterMobileNumber: "",
  DeliveryOption: "DELIVERY",
  deliveryProvince: "",
  deliveryDistrict: "",
  deliveryAddress: "",
  deliveryMunicipality: "",
  deliveryWard: "",
  deliveryPostalCode: "",
};

const ActiveStepFormComponent = () => {
  const { step, resetFormData } = useResidentialFormState();
  const [shouldResetFormData, setShouldResetFormData] = useState(true);

  useEffect(() => {
    if (shouldResetFormData) {
      resetFormData();
      setShouldResetFormData(false);
    }
  }, [shouldResetFormData, resetFormData]);

  switch (step) {
    case 1:
      return <ResidentialDetailsForm />;
    case 2:
      return <ResidentialRequestorsDetailsForm />;
    case 3:
      return <ResidentialDeliveryDetailsForm />;
    case 4:
      return <ResidentialFormSummary />;
    default:
      return null;
  }
};

const ResidentialCertificate = () => {
  return (
    <ResidentialFormProvider initialFormData={initialFormData}>
      <CertificateWrapper certificateTitle="Residential">
        <ActiveStepFormComponent />
      </CertificateWrapper>
    </ResidentialFormProvider>
  );
};

export default ResidentialCertificate;
