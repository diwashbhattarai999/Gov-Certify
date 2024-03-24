"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuKeyRound, LuMail, LuHash } from "react-icons/lu";

import { login } from "@/actions/login";

import { LoginSchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import CardWrapper from "@/components/ui/card-wrapper";

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different Provider!"
      : "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = (
    values: z.infer<typeof LoginSchema>
  ) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }
          if (data?.success) {
            reset();
            setSuccess(data?.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
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
        headerLabel={showTwoFactor ? "Two Factor Code" : "Login"}
        subHeaderLabel={showTwoFactor ? "" : "Welcome back"}
        backButtonHref="/register"
        backButtonLabel="Don't have an account ? Register Now"
        showSocial={showTwoFactor ? false : true}
        disabled={isPending}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start"
        >
          {/* 2FA  */}

          {showTwoFactor ? (
            <>
              {/* 2FA */}
              {/* User Inputs -- Code */}
              <Input
                label="2FA Code"
                name="code"
                type="number"
                placeholder="Code"
                icon={LuHash}
                error={errors.code?.message}
                disabled={isPending}
                register={register("code")}
              />
            </>
          ) : (
            <>
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
            </>
          )}

          {/* Sucess Message */}
          {success && <FormSuccess message={success} />}

          {/* Error Message */}
          {error && <FormError message={error || urlError} />}

          <Link
            href="/reset"
            className="underline text-secondary-foreground hover:text-primary-foreground text-sm mb-6"
          >
            Forgot Password?
          </Link>

          {/* Submit Button */}
          <Button disabled={isPending} type="submit" full>
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </CardWrapper>
    </>
  );
};

export default LoginForm;
