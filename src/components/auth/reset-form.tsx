"use client";

import { useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuMail } from "react-icons/lu";

import { reset } from "@/actions/reset";

import { ResetSchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import CardWrapper from "@/components/ui/card-wrapper";

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
    // console.log(values);
  };

  return (
    <CardWrapper
      headerLabel="Login"
      subHeaderLabel="Welcome back"
      backButtonHref="/login"
      backButtonLabel="Go back to login"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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

        {/* Sucess Message */}
        {success && <FormSuccess message={success} />}

        {/* Error Message */}
        {error && <FormError message={error} />}

        {/* Submit Button */}
        <Button disabled={isPending} loader={isPending} type="submit" full>
          Send Reset Email
        </Button>
      </form>
    </CardWrapper>
  );
};

export default ResetForm;
