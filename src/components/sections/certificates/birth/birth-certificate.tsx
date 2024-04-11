"use client";

import { useEffect, useState } from "react";
import {
  BirthFormProvider,
  useBirthFormState,
} from "@/context/birth-form-context";

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
  placeOfBirthDistrict: "",
  placeOfBirthProvince: "",
  placeOfBirthCity: "",
  fatherFirstName: "",
  fatherMiddleName: "",
  fatherLastName: "",
  motherFirstName: "",
  motherMiddleName: "",
  motherLastName: "",
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
  const { step, resetFormData } = useBirthFormState();
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
    <BirthFormProvider initialFormData={initialFormData}>
      <CertificateWrapper certificateTitle="Birth">
        <ActiveStepFormComponent />
      </CertificateWrapper>
    </BirthFormProvider>
  );
};

export default BirthCertificate;
