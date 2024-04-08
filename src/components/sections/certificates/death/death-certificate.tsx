"use client";

import { useEffect, useState } from "react";

import { DeliveryOption, Gender, Relationship } from "@prisma/client";

import { IDeathFormData } from "@/types";

import {
  DeathFormProvider,
  useDeathFormState,
} from "@/context/death-form-context";

import CertificateWrapper from "@/components/sections/certificates/certificate-wrapper";
import DeathPersonalDetailsForm from "@/components/sections/certificates/death/death-personal-details-form";
import DeathRequestorsDetailsForm from "@/components/sections/certificates/death/death-requesters-details-form";
import DeathDeliveryDetailsForm from "@/components/sections/certificates/death/death-delivery-details-form";
import DeathFormSummary from "@/components/sections/certificates/death/death-form-summary";

const initialFormData: IDeathFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfDeath: "",
  gender: Gender.MALE,
  placeOfDeathCountry: "Nepal",
  placeOfDeathCity: "",
  placeOfDeathDistrict: "",
  placeOfDeathProvince: "",
  causeOfDeath: "",
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
  const { step, resetFormData } = useDeathFormState();
  const [shouldResetFormData, setShouldResetFormData] = useState(true);

  useEffect(() => {
    if (shouldResetFormData) {
      resetFormData();
      setShouldResetFormData(false);
    }
  }, [shouldResetFormData, resetFormData]);

  switch (step) {
    case 1:
      return <DeathPersonalDetailsForm />;
    case 2:
      return <DeathRequestorsDetailsForm />;
    case 3:
      return <DeathDeliveryDetailsForm />;
    case 4:
      return <DeathFormSummary />;
    default:
      return null;
  }
};

const DeathCertificate = () => {
  return (
    <DeathFormProvider initialFormData={initialFormData}>
      <CertificateWrapper certificateTitle="Death">
        <ActiveStepFormComponent />
      </CertificateWrapper>
    </DeathFormProvider>
  );
};

export default DeathCertificate;
