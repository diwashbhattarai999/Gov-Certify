"use client";

import { useState, useTransition } from "react";

import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuKeyRound, LuMail, LuUserCircle } from "react-icons/lu";

import { register } from "@/actions/register";

import { RegisterSchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import CardWrapper from "@/components/ui/card-wrapper";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register: reg,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  //   console.log(errors);

  const onSubmit: SubmitHandler<typeof defaultValues> = (values) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.sucess);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Register"
      subHeaderLabel="Join us today"
      backButtonHref="/login"
      backButtonLabel="Already have an account ? Login Now"
      showSocial
      className="mb-20 mt-10"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Inputs -- UserName */}
        <Input
          label="Full Name"
          name="name"
          type="text"
          placeholder="Full Name"
          icon={LuUserCircle}
          error={errors.name?.message}
          disabled={isPending}
          register={reg("name")}
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
          register={reg("email")}
        />

        {/* User Inputs -- Password */}
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="******"
          icon={LuKeyRound}
          error={errors.password?.message}
          disabled={isPending}
          register={reg("password")}
        />

        {/* User Inputs -- Password */}
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="******"
          icon={LuKeyRound}
          error={errors.confirmPassword?.message}
          disabled={isPending}
          register={reg("confirmPassword")}
        />

        {/* Sucess Message */}
        {success && <FormSuccess message={success} />}

        {/* Error Message */}
        {error && <FormError message={error} />}

        {/* Submit Button */}
        <Button disabled={isPending} type="submit" full>
          Register
        </Button>
      </form>
    </CardWrapper>
  );
};

export default RegisterForm;
