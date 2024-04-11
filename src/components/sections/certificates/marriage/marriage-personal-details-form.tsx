"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { MarriageDetailsSchema } from "@/schemas";

import { useMarriageFormState } from "@/context/marriage-form-context";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";

const MarriagePersonalDetailsForm = () => {
  const { onHandleNext, setFormData, formData } = useMarriageFormState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof MarriageDetailsSchema>>({
    resolver: zodResolver(MarriageDetailsSchema),
    defaultValues: formData,
  });

  const onHandleFormSubmit = (data: z.infer<typeof MarriageDetailsSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    onHandleNext();
  };

  return (
    <form
      className="flex gap-3 flex-col"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <h1 className="text-lg font-medium mb-3 border-b-2 border-border w-fit">
        {`Spouse's Details`}
      </h1>

      {/* Husband Name */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        {/* User Inputs -- Husband First Name */}
        <Input
          label="Husband First Name"
          name="husbandFirstName"
          type="text"
          placeholder="Husband First name"
          error={errors.husbandFirstName?.message}
          register={register("husbandFirstName")}
        />

        {/* User Inputs -- Husband Middle Name */}
        <Input
          label="Husband Middle Name (Optional)"
          name="husbandMiddleName"
          type="text"
          placeholder="Husband Middle name"
          error={errors.husbandMiddleName?.message}
          register={register("husbandMiddleName")}
        />

        {/* User Inputs -- Husband Last Name */}
        <Input
          label="Husband Last Name"
          name="husbandLastName"
          type="text"
          placeholder="Husband Last name"
          error={errors.husbandLastName?.message}
          register={register("husbandLastName")}
        />
      </div>

      {/* Wife Name */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        {/* User Inputs -- Wife First Name */}
        <Input
          label="Wife First Name"
          name="WifeFirstName"
          type="text"
          placeholder="Wife First name"
          error={errors.WifeFirstName?.message}
          register={register("WifeFirstName")}
        />

        {/* User Inputs -- Wife Middle Name */}
        <Input
          label="Wife Middle Name (Optional)"
          name="wifeMiddleName"
          type="text"
          placeholder="Wife Middle name"
          error={errors.wifeMiddleName?.message}
          register={register("wifeMiddleName")}
        />

        {/* User Inputs -- Wife Last Name */}
        <Input
          label="Wife Last Name"
          name="wifeLastName"
          type="text"
          placeholder="Wife Last name"
          error={errors.wifeLastName?.message}
          register={register("wifeLastName")}
        />
      </div>

      {/* Place of Marriage */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
        {/* User Inputs -- Place of Marriage (Country) */}
        <Input
          label="Place of Marriage (Country)"
          name="placeOfMarriageCountry"
          type="text"
          placeholder="Country"
          error={errors.placeOfMarriageCountry?.message}
          register={register("placeOfMarriageCountry")}
        />

        {/* User Inputs -- Place of Marriage (Province) */}
        <Input
          label="Place of Marriage (Province)"
          name="placeOfMarriageProvince"
          type="text"
          placeholder="Province"
          error={errors.placeOfMarriageProvince?.message}
          register={register("placeOfMarriageProvince")}
        />

        {/* User Inputs -- Place of Marriage (District) */}
        <Input
          label="Place of Marriage (District)"
          name="placeOfMarriageDistrict"
          type="text"
          placeholder="District"
          error={errors.placeOfMarriageDistrict?.message}
          register={register("placeOfMarriageDistrict")}
        />

        {/* User Inputs -- Place of Marriage (City) */}
        <Input
          label="Place of Marriage (City)"
          name="placeOfMarriageCity"
          type="text"
          placeholder="City"
          error={errors.placeOfMarriageCity?.message}
          register={register("placeOfMarriageCity")}
        />
      </div>

      {/* Date of Marriage */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        {/* User Inputs -- Date of Marriage */}
        <Input
          label="Date of Marriage"
          name="dateOfMarriage"
          type="date"
          placeholder="Date of Marriage"
          error={errors.dateOfMarriage?.message}
          register={register("dateOfMarriage")}
        />
      </div>

      <div className="flex gap-4 justify-end mt-4">
        <Button className="w-28">Next</Button>
      </div>
    </form>
  );
};

export default MarriagePersonalDetailsForm;
