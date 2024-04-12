"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useResidentialFormState } from "@/context/residential-form-context ";

import { RequesterDetailsSchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";

const ResidentialRequestorsDetailsForm = () => {
  const { onHandleNext, setFormData, onHandleBack, formData } =
    useResidentialFormState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RequesterDetailsSchema>>({
    resolver: zodResolver(RequesterDetailsSchema),
    defaultValues: formData,
  });

  const onHandleFormSubmit = (data: z.infer<typeof RequesterDetailsSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    onHandleNext();
  };

  return (
    <form
      className="flex gap-1 flex-col"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <h1 className="text-lg font-medium mb-3 border-b-2 border-border w-fit">
        {`Requester's Details`}
      </h1>

      <div className="flex max-md:flex-col gap-4">
        {/* User Inputs -- First Name */}
        <Input
          label="First Name"
          name="requesterFirstName"
          type="text"
          placeholder="First name"
          error={errors.requesterFirstName?.message}
          register={register("requesterFirstName")}
        />

        {/* User Inputs -- Middle Name */}
        <Input
          label="Middle Name (Optional)"
          name="requesterMiddleName"
          type="text"
          placeholder="Middle name"
          error={errors.requesterMiddleName?.message}
          register={register("requesterMiddleName")}
        />

        {/* User Inputs -- Last Name */}
        <Input
          label="Last Name"
          name="requesterLastName"
          type="text"
          placeholder="Last name"
          error={errors.requesterLastName?.message}
          register={register("requesterLastName")}
        />
      </div>

      <div className="flex max-md:flex-col gap-4">
        {/* User Inputs -- Email */}
        <Input
          label="Email"
          name="requesterEmail"
          type="text"
          placeholder="Email"
          error={errors.requesterEmail?.message}
          register={register("requesterEmail")}
        />

        {/* User Inputs -- Mobile No. */}
        <Input
          label="Mobile No."
          name="requesterMobileNumber"
          type="text"
          placeholder="Mobile No."
          error={errors.requesterMobileNumber?.message}
          register={register("requesterMobileNumber")}
        />
      </div>

      <div className="flex gap-4 justify-end mt-4">
        <Button
          type="button"
          className="w-28"
          destructive
          onClick={onHandleBack}
        >
          Back
        </Button>

        <Button type="submit" className="w-28">
          Next
        </Button>
      </div>
    </form>
  );
};

export default ResidentialRequestorsDetailsForm;
