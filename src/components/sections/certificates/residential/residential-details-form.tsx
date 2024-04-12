"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Gender, Relationship } from "@prisma/client";

import { ResidentialDetailsSchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/select";
import { useResidentialFormState } from "@/context/residential-form-context ";

const relationshipOptions = Object.keys(Relationship).map((key) => ({
  label: key,
  value: key.toUpperCase(),
}));

const genderOptions = Object.keys(Gender).map((key) => ({
  label: key,
  value: key.toUpperCase(),
}));

const ResidentialDetailsForm = () => {
  const { onHandleNext, setFormData, formData } = useResidentialFormState();
  const [familyMembers, setFamilyMembers] = useState([
    {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      placeOfBirthCity: "",
      gender: "MALE",
      relationshipToRequestor: "SELF",
    },
  ]);
  const [selectGender, setSelectGender] = useState("Select a gender");
  const [selectRelation, setSelectRelation] = useState("Select a Relation");

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<z.infer<typeof ResidentialDetailsSchema>>({
    resolver: zodResolver(ResidentialDetailsSchema),
    defaultValues: formData,
  });

  const onHandleFormSubmit = (
    data: z.infer<typeof ResidentialDetailsSchema>
  ) => {
    setFormData((prev) => ({ ...prev, ...data }));
    onHandleNext();
  };

  const addFamilyMember = () => {
    setFamilyMembers((prev) => [
      ...prev,
      {
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        placeOfBirthCity: "",
        gender: "MALE",
        relationshipToRequestor: "SELF",
      },
    ]);
  };

  const removeFamilyMember = (index: number) => {
    // Clear the errors of removed input fields
    clearErrors(`familyMembers.${index}`);

    console.log(errors);
    // Unregister the removed input fields
    unregister(`familyMembers.${index}`);

    // Remove the family member from the list of family members
    setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form
      className="flex gap-3 flex-col"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <h1 className="text-lg font-medium mb-3 border-b-2 border-border w-fit">
        Migration Details
      </h1>

      {/* Current Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-4">
        {/* User Inputs -- Current Country */}
        <Input
          label="Current Country"
          name="currentCountry"
          type="text"
          placeholder="Country"
          error={errors.currentCountry?.message}
          register={register("currentCountry")}
        />

        {/* User Inputs -- Current Province */}
        <Input
          label="Current Province"
          name="currentProvince"
          type="text"
          placeholder="Province"
          error={errors.currentProvince?.message}
          register={register("currentProvince")}
        />

        {/* User Inputs -- Current District */}
        <Input
          label="Current District"
          name="currentDistrict"
          type="text"
          placeholder="District"
          error={errors.currentDistrict?.message}
          register={register("currentDistrict")}
        />

        {/* User Inputs -- Current City */}
        <Input
          label="Current City"
          name="currentCity"
          type="text"
          placeholder="City"
          error={errors.currentCity?.message}
          register={register("currentCity")}
        />
      </div>

      {/* Destination Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-4">
        {/* User Inputs -- Destination Country */}
        <Input
          label="Destination Country"
          name="destinationCountry"
          type="text"
          placeholder="Country"
          error={errors.destinationCountry?.message}
          register={register("destinationCountry")}
        />
        {/* User Inputs -- Destination Province */}
        <Input
          label="Destination Province"
          name="destinationProvince"
          type="text"
          placeholder="Province"
          error={errors.destinationProvince?.message}
          register={register("destinationProvince")}
        />
        {/* User Inputs -- Destination District */}
        <Input
          label="Destination District"
          name="destinationDistrict"
          type="text"
          placeholder="District"
          error={errors.destinationDistrict?.message}
          register={register("destinationDistrict")}
        />
        {/* User Inputs -- Destination City */}
        <Input
          label="Destination City"
          name="destinationCity"
          type="text"
          placeholder="City"
          error={errors.destinationCity?.message}
          register={register("destinationCity")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        {/* User Inputs -- Date of Residential Migration */}
        <Input
          label="Date of Residential Migration"
          name="dateOfResidentialMigration"
          type="date"
          placeholder="Date of Residential Migration"
          error={errors.dateOfResidentialMigration?.message}
          register={register("dateOfResidentialMigration")}
        />
      </div>

      {/* Family Members */}
      <h2 className="text-lg font-medium mb-3 border-b-2 border-border w-fit">
        Family Members
      </h2>
      {familyMembers.map((_, index) => (
        <div key={index}>
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-medium mb-3">Member {index + 1}</h3>
            <Button
              className="w-28"
              destructive
              onClick={() => removeFamilyMember(index)}
            >
              Remove
            </Button>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4">
            {/* User Inputs -- First Name */}
            <Input
              label="First Name"
              name={`familyMembers.${index}.firstName`} // Computed property name
              type="text"
              placeholder="First Name"
              error={errors?.familyMembers?.[index]?.firstName?.message}
              register={register(`familyMembers.${index}.firstName`)}
            />
            {/* User Inputs -- Middle Name */}
            <Input
              label="Middle Name"
              name={`familyMembers.${index}.middleName`}
              type="text"
              placeholder="Middle Name"
              error={errors?.familyMembers?.[index]?.middleName?.message}
              register={register(`familyMembers.${index}.middleName`)}
            />
            {/* User Inputs -- Last Name */}
            <Input
              label="Last Name"
              name={`familyMembers.${index}.lastName`}
              type="text"
              placeholder="Last Name"
              error={errors?.familyMembers?.[index]?.lastName?.message}
              register={register(`familyMembers.${index}.lastName`)}
            />
          </div>

          {/* Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-4">
            {/* User Inputs -- Date of Birth */}
            <Input
              label="Date of Birth"
              name={`familyMembers.${index}.dateOfBirth`}
              type="date"
              placeholder="Date of Birth"
              error={errors?.familyMembers?.[index]?.dateOfBirth?.message}
              register={register(`familyMembers.${index}.dateOfBirth`)}
            />
            {/* User Inputs -- Place of Birth */}
            <Input
              label="Place of Birth"
              name={`familyMembers.${index}.placeOfBirth`}
              type="text"
              placeholder="Place of Birth"
              error={errors?.familyMembers?.[index]?.placeOfBirth?.message}
              register={register(`familyMembers.${index}.placeOfBirth`)}
            />
            {/* User Inputs -- Gender */}
            <Select
              selectLabel="Gender"
              name={`familyMembers.${index}.gender`}
              value={selectGender}
              setSelectValue={setSelectGender}
              error={errors?.familyMembers?.[index]?.gender?.message}
              register={register(`familyMembers.${index}.gender`)}
              options={genderOptions}
            />

            {/* User Inputs -- Relationship to Requestor */}
            <Select
              selectLabel="Relationship to Requestor"
              name={`familyMembers.${index}.relationshipToRequestor`}
              value={selectRelation}
              setSelectValue={setSelectRelation}
              error={
                errors?.familyMembers?.[index]?.relationshipToRequestor?.message
              }
              register={register(
                `familyMembers.${index}.relationshipToRequestor`
              )}
              options={relationshipOptions}
            />
          </div>
        </div>
      ))}
      <Button
        onClick={addFamilyMember}
        type="button"
        className="bg-green-700 hover:bg-green-700/90 hover:text-background"
      >
        Add Family Member
      </Button>

      <div className="flex gap-4 justify-end mt-4">
        <Button className="w-28">Next</Button>
      </div>
    </form>
  );
};

export default ResidentialDetailsForm;
