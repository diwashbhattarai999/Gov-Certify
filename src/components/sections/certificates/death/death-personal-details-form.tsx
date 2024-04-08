"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { DeathDetailsSchema } from "@/schemas";

import { useDeathFormState } from "@/context/death-form-context";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/select";

const DeathPersonalDetailsForm = () => {
  const { onHandleNext, setFormData, formData } = useDeathFormState();
  const [selectGender, setSelectGender] = useState(formData.gender);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof DeathDetailsSchema>>({
    resolver: zodResolver(DeathDetailsSchema),
    defaultValues: formData,
  });

  const onHandleFormSubmit = (data: z.infer<typeof DeathDetailsSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    onHandleNext();
  };

  return (
    <form
      className="flex gap-3 flex-col"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <h1 className="text-lg font-medium mb-3 border-b-2 border-border w-fit">
        {`Deceased's Details`}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        {/* User Inputs -- First Name */}
        <Input
          label="Deceased's First Name"
          name="firstName"
          type="text"
          placeholder="First name"
          error={errors.firstName?.message}
          register={register("firstName")}
        />

        {/* User Inputs -- Middle Name */}
        <Input
          label="Deceased's Middle Name (Optional)"
          name="middleName"
          type="text"
          placeholder="Middle name"
          error={errors.middleName?.message}
          register={register("middleName")}
        />

        {/* User Inputs -- Last Name */}
        <Input
          label="Deceased's Last Name"
          name="lastName"
          type="text"
          placeholder="Last name"
          error={errors.lastName?.message}
          register={register("lastName")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
        {/* User Inputs -- Place of Death (Country) */}
        <Input
          label="Place of Death (Country)"
          name="placeOfDeathCountry"
          type="text"
          placeholder="Country"
          error={errors.placeOfDeathCountry?.message}
          register={register("placeOfDeathCountry")}
        />

        {/* User Inputs -- Place of Death (Province) */}
        <Input
          label="Place of Death (Province)"
          name="placeOfDeathProvince"
          type="text"
          placeholder="Province"
          error={errors.placeOfDeathProvince?.message}
          register={register("placeOfDeathProvince")}
        />

        {/* User Inputs -- Place of Death (District) */}
        <Input
          label="Place of Death (District)"
          name="placeOfDeathDistrict"
          type="text"
          placeholder="District"
          error={errors.placeOfDeathDistrict?.message}
          register={register("placeOfDeathDistrict")}
        />

        {/* User Inputs -- Place of Death (City) */}
        <Input
          label="Place of Death (City)"
          name="placeOfDeathCity"
          type="text"
          placeholder="City"
          error={errors.placeOfDeathCity?.message}
          register={register("placeOfDeathCity")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        {/* User Inputs -- Date of Death */}
        <Input
          label="Date of Death"
          name="dateOfDeath"
          type="date"
          placeholder="Date of Death"
          error={errors.dateOfDeath?.message}
          register={register("dateOfDeath")}
        />

        {/* User Inputs -- Gender */}
        <Select
          selectLabel="Gender"
          name="gender"
          value={selectGender}
          setSelectValue={setSelectGender}
          error={errors.gender?.message}
          register={register("gender")}
          options={[
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
            { label: "Others", value: "OTHERS" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        {/* User Inputs -- Cause of Death */}
        <Input
          label="Cause of Death"
          name="causeOfDeath"
          type="text"
          placeholder="Cause of Death"
          error={errors.causeOfDeath?.message}
          register={register("causeOfDeath")}
        />
      </div>

      <div className="flex gap-4 justify-end mt-4">
        <Button className="w-28">Next</Button>
      </div>
    </form>
  );
};

export default DeathPersonalDetailsForm;
