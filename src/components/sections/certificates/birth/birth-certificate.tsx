"use client";

import { useEffect, useState } from "react";
import { FormProvider, useFormState } from "@/context/form-context";

import { DeliveryOption, Gender, Relationship } from "@prisma/client";

import CertificateWrapper from "@/components/sections/certificates/certificate-wrapper";
import BirthPersonalDetailsForm from "./birth-personal-details-form";
import BirthRequestorsDetailsForm from "./birth-requesters-details-form";
import BirthDeliveryDetailsForm from "./birth-delivery-details-form";
import BirthFormSummary from "./birth-form-summary";
import { IBirthFormData } from "@/types";

const initialFormData: IBirthFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: Gender.MALE,
  placeOfBirthCountry: "Nepal",
  placeOfBirthProvince: "",
  placeOfBirthCity: "",
  fatherFirstName: "",
  fatherMiddleName: "",
  fatherLastName: "",
  motherFirstName: "",
  motherMiddleName: "",
  motherLastName: "",
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
  const { step, resetFormData } = useFormState();
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

const BirthCertificate = () => {
  return (
    <FormProvider initialFormData={initialFormData}>
      <CertificateWrapper certificateTitle="Birth">
        <ActiveStepFormComponent />
      </CertificateWrapper>
    </FormProvider>
  );
};

export default BirthCertificate;
