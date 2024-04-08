"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DeliveryOption } from "@prisma/client";

import { DeliveryDetailsSchema } from "@/schemas";

import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/Button";
import { useDeathFormState } from "@/context/death-form-context";

const deliveryOptions = Object.keys(DeliveryOption).map((key) => ({
  label: key,
  value: key.toUpperCase(),
}));

const DeathDeliveryDetailsForm = () => {
  const { onHandleNext, setFormData, onHandleBack, formData } =
    useDeathFormState();
  const [selectDelivery, setSelectDelivery] = useState(formData.DeliveryOption);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof DeliveryDetailsSchema>>({
    resolver: zodResolver(DeliveryDetailsSchema),
    defaultValues: formData,
  });

  const onHandleFormSubmit = (data: z.infer<typeof DeliveryDetailsSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    onHandleNext();
  };

  return (
    <form
      className="flex gap-1 flex-col"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <h1 className="text-lg font-medium mb-3 border-b-2 border-border w-fit">
        {`Delivery Details`}
      </h1>

      <div className="flex max-md:flex-col gap-4">
        {/* User Inputs -- Delivery Option */}
        <Select
          selectLabel="Delivery Option"
          name="DeliveryOption"
          value={selectDelivery}
          setSelectValue={setSelectDelivery}
          error={errors.DeliveryOption?.message}
          register={register("DeliveryOption")}
          options={deliveryOptions}
        />
      </div>

      <div className="flex max-md:flex-col gap-4">
        {/* User Inputs -- Delivery Province */}
        <Input
          label={
            selectDelivery === "PICK_UP"
              ? "Pickup Province"
              : "Delivery Province"
          }
          name="deliveryProvince"
          type="text"
          placeholder="Province"
          error={errors.deliveryProvince?.message}
          register={register("deliveryProvince")}
        />

        {/* User Inputs -- Delivery District */}
        <Input
          label={
            selectDelivery === "PICK_UP"
              ? "Pickup District"
              : "Delivery District"
          }
          name="deliveryDistrict"
          type="text"
          placeholder="District"
          error={errors.deliveryDistrict?.message}
          register={register("deliveryDistrict")}
        />

        {/* User Inputs -- Delivery Option */}
        <Input
          label={
            selectDelivery === "PICK_UP" ? "Pickup Address" : "Delivery Address"
          }
          name="deliveryAddress"
          type="text"
          placeholder="Address"
          error={errors.deliveryAddress?.message}
          register={register("deliveryAddress")}
        />
      </div>

      {selectDelivery === "PICK_UP" && (
        <div className="flex max-md:flex-col gap-4">
          {/* User Inputs -- Delivery Municipality */}
          <Input
            label="Pickup Municipality"
            name="deliveryMunicipality"
            type="text"
            placeholder="Municipality"
            error={errors.deliveryMunicipality?.message}
            register={register("deliveryMunicipality")}
          />

          {/* User Inputs -- Delivery Ward */}
          <Input
            label="Pickup Ward"
            name="deliveryWard"
            type="text"
            placeholder="Ward"
            error={errors.deliveryWard?.message}
            register={register("deliveryWard")}
          />
        </div>
      )}

      <div className="flex max-md:flex-col gap-4">
        {/* User Inputs -- Postal Code */}
        <Input
          label="Postal Code (Optional)"
          name="deliveryPostalCode"
          type="text"
          placeholder="Postal Code"
          error={errors.deliveryPostalCode?.message}
          register={register("deliveryPostalCode")}
        />
      </div>

      <div className="flex gap-4 justify-end mt-4">
        <Button
          type="button"
          onClick={onHandleBack}
          className="w-28"
          destructive
        >
          Back
        </Button>
        <Button className="w-28">Next</Button>
      </div>
    </form>
  );
};

export default DeathDeliveryDetailsForm;
