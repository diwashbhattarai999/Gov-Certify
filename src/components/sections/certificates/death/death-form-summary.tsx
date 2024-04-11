"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import Loader from "@/components/loader";

import { IDeathFormData } from "@/types";

import {
  DeliveryDetailsSchema,
  RequesterDetailsSchema,
  DeathDetailsSchema,
} from "@/schemas";

import { death } from "@/actions/certificates/death";

import { useDeathFormState } from "@/context/death-form-context";

import CertificateConfirmation from "../certificate-confirmation";
import Button from "@/components/ui/Button";
import CertificateSuccess from "../certificate-success";

const DeathFormSummary = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { formData, onHandleBack } = useDeathFormState();

  const handleSubmit = () => {
    startTransition(() => {
      death(formData)
        .then((res) => {
          setShowSuccess(true);
          console.log(res);
        })
        .catch((err) => {
          setShowSuccess(false);
          console.log(err);
        });
      console.log(formData);
    });
  };

  return (
    <>
      {isPending && <Loader />}
      <div className="mt-5 flex flex-col gap-4">
        <h1 className="text-xl text-secondary-foreground/90 font-medium">
          Review your form
        </h1>

        <div className="flex flex-col gap-8">
          <Details
            schema={DeathDetailsSchema}
            formData={formData}
            title="Personal Details"
          />
          <Details
            schema={RequesterDetailsSchema}
            formData={formData}
            title="Requester Details"
          />
          <Details
            schema={DeliveryDetailsSchema}
            formData={formData}
            title="Delivery Details"
          />
        </div>
      </div>

      <div className="mt-6 mb-2 flex items-center justify-between gap-4">
        <Button
          type="button"
          className="w-28"
          onClick={() => setShowConfirmation(true)}
        >
          Submit
        </Button>
        <Button
          type="button"
          className="w-28"
          destructive
          onClick={onHandleBack}
        >
          Back
        </Button>
      </div>

      {showConfirmation && (
        <CertificateConfirmation
          setShowConfirmation={setShowConfirmation}
          handleSubmit={handleSubmit}
          isPending={isPending}
        />
      )}

      {showSuccess && !showConfirmation && (
        <CertificateSuccess setShowSuccess={setShowSuccess} />
      )}
    </>
  );
};

export default DeathFormSummary;

interface IDetailsProps {
  schema: z.ZodObject<any>;
  formData: IDeathFormData;
  title: string;
}

const Details = ({ schema, formData, title }: IDetailsProps) => {
  return (
    <div>
      <h2 className="font-semibold text-lg my-4 underline">{title}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(schema.shape).map(([key, _]) => (
          <li key={key} className="flex gap-4 min-w-72">
            <h3 className="capitalize font-medium text-secondary-foreground ">{`${key}:`}</h3>
            <p className="text-muted-foreground">{`${
              formData[key as keyof IDeathFormData]
            }`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};