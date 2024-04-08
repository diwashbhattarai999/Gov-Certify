"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";

import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LuKeyRound,
  LuMail,
  LuPhone,
  LuUserCircle,
  LuUserPlus,
} from "react-icons/lu";

import { register } from "@/actions/register";

import { RegisterSchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import CardWrapper from "@/components/ui/card-wrapper";
import Select from "../ui/select";
import { Gender } from "@prisma/client";

type DefaultValuesType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  phoneNumber: string;
};

const defaultValues: DefaultValuesType = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: Gender.MALE,
  phoneNumber: "",
};

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [selectGender, setSelectGender] = useState("Select a gender");

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
    <>
      <Link
        href="/"
        className="text-2xl font-bold tracking-tight text-primary-foreground md:flex items-center justify-center gap-4 my-8 max-md:hidden"
      >
        <Image
          src="images/Emblem_of_Nepal.svg"
          alt="Logo"
          width={500}
          height={500}
          className="w-14 h-14"
        />
        <div>
          <h1>
            Gov <span>Certify</span>
          </h1>
          <p className="text-sm font-normal -tracking-[0.06em]">
            Your Digital Gateway to Official Certificates
          </p>
        </div>
      </Link>
      <CardWrapper
        headerLabel="Register"
        subHeaderLabel="Join us today"
        backButtonHref="/login"
        backButtonLabel="Already have an account ? Login Now"
        showSocial
        className="mb-20"
        wrapperClassName="min-h-fit"
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

          {/* User Inputs -- Gender */}
          <Select
            selectLabel="Gender"
            name="gender"
            value={selectGender}
            setSelectValue={setSelectGender}
            Icon={LuUserPlus}
            error={errors.gender?.message}
            disabled={isPending}
            options={[
              { label: "Male", value: "MALE" },
              { label: "Female", value: "FEMALE" },
              { label: "Others", value: "OTHERS" },
            ]}
            register={reg("gender")}
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
            register={reg("phoneNumber")}
          />

          {/* //TODO: Add Date of birth field */}

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
          <Button disabled={isPending} loader={isPending} type="submit" full>
            Register
          </Button>
        </form>
      </CardWrapper>
    </>
  );
};

export default RegisterForm;
