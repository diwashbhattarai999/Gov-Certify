"use client";

import { useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuMessageSquare, LuMail, LuUserCircle2 } from "react-icons/lu";

import { ContactFormSchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import Textarea from "./textarea";
import { contact } from "@/actions/contact";

const ContactForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    name: "",
    email: "",
    message: "",
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (values: z.infer<typeof ContactFormSchema>) => {
    startTransition(() => {
      contact(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            setSuccess("");
          }
          if (data.success) {
            setSuccess(data.success);
            setError("");

            reset();
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start w-full shadow-md rounded-md bg-border border-2 border-border p-4 justify-center gap-4"
    >
      {/* User Inputs -- Name */}
      <Input
        label="Name"
        name="name"
        type="text"
        placeholder="Full name"
        value="Full name"
        icon={LuUserCircle2}
        error={errors.name?.message}
        disabled={isPending}
        register={register("name")}
      />

      {/* User Inputs -- Email */}
      <Input
        label="Email"
        name="email"
        type="email"
        value=""
        placeholder="name@example.com"
        icon={LuMail}
        error={errors.email?.message}
        disabled={isPending}
        register={register("email")}
      />

      {/* User Inputs -- Icon(SVG) */}
      <Textarea
        label="Message"
        name="message"
        Icon={LuMessageSquare}
        setValue={setValue}
        disabled={isPending}
        error={errors.message?.message}
        register={register}
      />

      {/* Sucess Message */}
      {success && <FormSuccess message={success} />}

      {/* Error Message */}
      {error && <FormError message={error} />}

      {/* Submit Button */}
      <Button disabled={isPending} type="submit" className="px-6 w-24">
        Send
      </Button>
    </form>
  );
};

export default ContactForm;
