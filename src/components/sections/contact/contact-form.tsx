"use client";

import { useState, useTransition } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuMail, LuMessageSquare, LuPhone } from "react-icons/lu";

import { ContactSchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import Textarea from "@/components/ui/textarea";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

const ContactForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof ContactSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // TODO: Call server action to send the email to admin and save in database
      console.log(values);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* User Inputs -- FIrst Name */}
      <Input
        label="First Name"
        name="firstName"
        type="text"
        placeholder="First Name"
        icon={MdOutlineDriveFileRenameOutline}
        error={errors.firstName?.message}
        disabled={isPending}
        register={register("firstName")}
      />

      {/* User Inputs -- Last Name */}
      <Input
        label="Last Name"
        name="lastName"
        type="text"
        placeholder="Last Name"
        icon={MdOutlineDriveFileRenameOutline}
        error={errors.lastName?.message}
        disabled={isPending}
        register={register("lastName")}
      />

      {/* User Inputs -- Email */}
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
        icon={LuMail}
        error={errors.email?.message}
        disabled={isPending}
        register={register("email")}
      />

      {/* User Inputs -- Phone Number */}
      <Input
        label="Phone Number"
        name="phoneNumber"
        type="number"
        placeholder="+977 9876543210"
        icon={LuPhone}
        error={errors.phoneNumber?.message}
        disabled={isPending}
        register={register("phoneNumber")}
      />

      {/* User Inputs -- Message */}
      <Textarea
        label="Your Message"
        placeholder="What would you like to say?"
        name="message"
        Icon={LuMessageSquare}
        error={errors.message?.message}
        disabled={isPending}
        setValue={setValue}
        register={register}
      />

      {/* Sucess Message */}
      {success && <FormSuccess message={success} />}

      {/* Error Message */}
      {error && <FormError message={error} />}

      {/* Submit Button */}
      <Button
        disabled={isPending}
        loader={isPending}
        type="submit"
        className="w-40 mt-4"
      >
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
