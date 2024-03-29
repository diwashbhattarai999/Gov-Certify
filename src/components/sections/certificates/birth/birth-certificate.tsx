"use client";

import { useEffect, useState } from "react";
import { FormProvider, useFormState } from "@/context/form-context";

import CertificateWrapper from "@/components/sections/certificates/certificate-wrapper";
import BirthPersonalDetailsForm from "./birth-personal-details-form";
import BirthRequestorsDetailsForm from "./birth-requesters-details-form";
import BirthDeliveryDetailsForm from "./birth-delivery-details-form";
import BirthFormSummary from "./birth-form-summary";

const ActiveStepFormComponent = () => {
  const { step, formData, resetFormData } = useFormState();
  const [shouldResetFormData, setShouldResetFormData] = useState(true);

  useEffect(() => {
    if (shouldResetFormData) {
      resetFormData();
      setShouldResetFormData(false);
    }
  }, [shouldResetFormData, resetFormData]);

  console.log(formData);

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
    <FormProvider>
      <CertificateWrapper certificateTitle="Birth">
        <ActiveStepFormComponent />
      </CertificateWrapper>
    </FormProvider>
  );
};

export default BirthCertificate;
