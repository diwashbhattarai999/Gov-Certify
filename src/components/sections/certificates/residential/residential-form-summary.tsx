"use client";

import { useState, useTransition } from "react";
import * as z from "zod";

import { IResidentialFormData } from "@/types";

import { useResidentialFormState } from "@/context/residential-form-context ";

import { residential } from "@/actions/certificates/residential";

import {
  DeliveryDetailsSchema,
  RequesterDetailsSchema,
  ResidentialDetailsSchema,
} from "@/schemas";

import Loader from "@/components/loader";
import Button from "@/components/ui/Button";
import CertificateSuccess from "../certificate-success";
import CertificateConfirmation from "../certificate-confirmation";

const ResidentialFormSummary = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { formData, onHandleBack } = useResidentialFormState();

  const handleSubmit = () => {
    startTransition(() => {
      residential(formData)
        .then((res) => {
          setShowSuccess(true);
          console.log(res);
        })
        .catch((err) => {
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
            schema={ResidentialDetailsSchema}
            formData={formData}
            title="Residential Details"
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

export default ResidentialFormSummary;

interface IDetailsProps {
  schema: z.ZodObject<any>;
  formData: IResidentialFormData;
  title: string;
}

const Details = ({ schema, formData, title }: IDetailsProps) => {
  return (
    <div>
      <h2 className="font-semibold text-lg my-4 underline">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(schema.shape).map(([key, _]) => {
          if (key === "familyMembers") {
            return (
              <div key={key} className="col-span-full">
                <h3 className="capitalize font-semibold text-secondary-foreground underline text-lg my-4">
                  {key}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData[key].map((familyMember, index) => (
                    <li key={index} className="flex flex-col gap-2 min-w-72">
                      <h4 className="capitalize font-medium text-secondary-foreground flex gap-2 items-center border-b border-border w-fit">
                        {`Family Member ${index + 1}:`}
                      </h4>
                      <ul className="grid grid-cols-1 gap-4">
                        {Object.entries(familyMember).map(
                          ([memberKey, memberValue]) => (
                            <li
                              key={memberKey}
                              className="text-muted-foreground flex gap-4"
                            >
                              <h3 className="capitalize font-medium text-secondary-foreground">
                                {`${memberKey}:`}
                              </h3>
                              <p className="text-muted-foreground">{`${memberValue}`}</p>
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          return (
            <div key={key} className="flex gap-4">
              <h3 className="capitalize font-medium text-secondary-foreground">
                {`${key}:`}
              </h3>
              <p className="text-muted-foreground">{`${
                formData[key as keyof IResidentialFormData]
              }`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
