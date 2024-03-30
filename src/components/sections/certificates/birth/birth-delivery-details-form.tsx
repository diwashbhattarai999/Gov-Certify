"use client";

import { useForm } from "react-hook-form";
import { useFormState } from "@/context/form-context";
import { IBirthFormData } from "@/types";

const BirthDeliveryDetailsForm = () => {
  const { onHandleNext, setFormData, onHandleBack, formData } = useFormState();
  const { register, handleSubmit } = useForm<IBirthFormData>({
    defaultValues: formData,
  });

  const onHandleFormSubmit = (data: IBirthFormData) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext();
  };

  return (
    <form
      className="flex gap-1 flex-col"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <h1>Birth Delivery Details Form</h1>
      <label htmlFor="deliveryAddress">Delivery Address</label>
      <input
        autoFocus
        id="deliveryAddress"
        {...register("deliveryAddress")}
        className="border h-11 px-4 rounded-md focus:outline-blue-500 "
        required={true}
        type="text"
      />
      <div className="flex gap-4 justify-end mt-4">
        <button
          type="button"
          onClick={onHandleBack}
          className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md"
        >
          Back
        </button>
        <button className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md">
          Next
        </button>
      </div>
    </form>
  );
};

export default BirthDeliveryDetailsForm;
