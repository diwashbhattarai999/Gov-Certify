"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuKeyRound } from "react-icons/lu";

import { newPassword } from "@/actions/new-password";

import { NewPasswordSchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import CardWrapper from "@/components/ui/card-wrapper";

const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
    // console.log(values);
  };

  return (
    <CardWrapper
      headerLabel="Change Password"
      subHeaderLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Inputs -- Password */}
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="******"
          icon={LuKeyRound}
          error={errors.password?.message}
          disabled={isPending}
          register={register("password")}
        />

        {/* Sucess Message */}
        {success && <FormSuccess message={success} />}

        {/* Error Message */}
        {error && <FormError message={error} />}

        {/* Submit Button */}
        <Button disabled={isPending} type="submit" full>
          Reset Password
        </Button>
      </form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
