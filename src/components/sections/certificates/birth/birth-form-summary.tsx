"use client";

import { useState, useTransition } from "react";

import { useFormState } from "@/context/form-context";

import CertificateConfirmation from "../certificate-confirmation";
import Button from "@/components/ui/Button";
import CertificateSuccess from "../certificate-success";

const BirthFormSummary = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSucess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { formData, onHandleBack, onHandleNext } = useFormState();

  const handleSubmit = () => {
    startTransition(() => {
      setShowConfirmation(true);

      // TODO: Call a server action and pass the formData

      console.log(formData);

      // TODO: setShowSuccess(true) in then of server action
      setShowSucess(true);
    });
  };

  return (
    <>
      <div className="mt-5 flex flex-col gap-4">
        <h1 className="text-xl text-secondary-foreground/90 font-medium">
          Review your form
        </h1>

        <div className="flex flex-col gap-8">
          {/* Personal Detail's */}
          <div className="flex flex-col gap-3 pb-2 border-b border-border">
            <h3 className="text-lg text-primary-foreground">
              Personal Details:
            </h3>
            <div className="flex items-center">
              <h2 className="text-primary-foreground w-36">{`Applicant's Name`}</h2>
              <p className="text-muted-foreground">{formData.firstName}</p>
            </div>
          </div>

          {/* Requester Detail's */}
          <div className="flex flex-col gap-3 pb-2 border-b border-border">
            <h3 className="text-lg text-primary-foreground">
              Requester Details:
            </h3>
            <div className="flex items-center">
              <h2 className="text-primary-foreground w-36">{`Requester's Name`}</h2>
              <p className="text-muted-foreground">
                {formData.requesterFirstName}
              </p>
            </div>
          </div>

          {/* Delivery Detail's */}
          <div className="flex flex-col gap-3 pb-2 border-b border-border">
            <h3 className="text-lg text-primary-foreground">
              Delivery Details:
            </h3>
            <div className="flex items-center">
              <h2 className="text-primary-foreground w-36">Delivery Address</h2>
              <p className="text-muted-foreground">
                {formData.deliveryAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-2 flex items-center justify-between gap-4">
        <Button className="w-28" onClick={handleSubmit}>
          Submit
        </Button>
        <Button className="w-28" destructive onClick={onHandleBack}>
          Back
        </Button>
      </div>

      {showConfirmation && (
        <CertificateConfirmation setShowConfirmation={setShowConfirmation} />
      )}

      {showSuccess && !showConfirmation && (
        <CertificateSuccess setShowSuccess={setShowSucess} />
      )}
    </>
  );
};

export default BirthFormSummary;
