"use client";

import { useEffect, useState } from "react";

import { DeliveryOption, Relationship } from "@prisma/client";

import CertificateWrapper from "@/components/sections/certificates/certificate-wrapper";
import BirthPersonalDetailsForm from "../birth/birth-personal-details-form";
import BirthRequestorsDetailsForm from "../birth/birth-requesters-details-form";
import BirthDeliveryDetailsForm from "../birth/birth-delivery-details-form";
import BirthFormSummary from "../birth/birth-form-summary";
import { IResidentialFormData } from "@/types";
import {
  ResidentialFormProvider,
  useResidentialFormState,
} from "@/context/residential-form-context ";

const initialFormData: IResidentialFormData = {
  currentCountry: "",
  currentProvince: "",
  currentDistrict: "",
  currentCity: "",
  destinationCountry: "",
  destinationProvince: "",
  destinationDistrict: "",
  destinationCity: "",
  dateOfResidentialMigration: "",
  FamilyMembers: [],
  requesterFirstName: "",
  requesterMiddleName: "",
  requesterLastName: "",
  requesterEmail: "",
  requesterMobileNumber: "",
  requesterRelationshipToOwner: Relationship.SELF,
  DeliveryOption: DeliveryOption.PICK_UP,
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
      return <BirthPersonalDetailsForm />;
    case 2:
      return <BirthRequestorsDetailsForm />;
    case 3:
      return <BirthDeliveryDetailsForm />;
    case 4:
      return <BirthFormSummary />;
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
