"use client";

import React, { useEffect, useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LuArrowLeftCircle,
  LuKeyRound,
  LuMail,
  LuSettings,
  LuUserCircle2,
} from "react-icons/lu";
import { useSession } from "next-auth/react";

import { settings } from "@/actions/settings";

import { SettingsSchema } from "@/schemas";

import { useCurrentUser } from "@/hooks/use-current-user";

import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Switch from "@/components/ui/switch";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import ChangeProfileImg from "@/components/user-profile/change-profile";
import AnimationWrapper from "@/components/animations/page-animation";
import { AnimatePresence } from "framer-motion";

interface SettingsFormProp {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsForm = ({ isEdit, setIsEdit }: SettingsFormProp) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [selectValue, setSelectValue] = useState("Select a Role");

  const { update } = useSession();

  const user = useCurrentUser();

  const defaultValues = {
    image: user?.image || undefined,
    name: user?.name || undefined,
    email: user?.email || undefined,
    password: undefined,
    newPassword: undefined,
    role: user?.role || undefined,
    isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
  };

  useEffect(() => {
    if (user) {
      setSelectValue(user.role);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      console.log(values);
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            setSuccess("");
          }
          if (data.success) {
            update();
            setSuccess(data.success);
            setError("");
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold py-2 text-center border-b border-b-border w-fit">
          User Profile
        </h1>
        {isEdit && (
          <Button
            outline
            className="w-24"
            icon
            onClick={() => setIsEdit(false)}
          >
            <LuArrowLeftCircle />
            Back
          </Button>
        )}
      </div>
      {isEdit ? (
        <AnimatePresence>
          <AnimationWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="z-0 flex flex-col items-start my-5"
            >
              <ChangeProfileImg
                setValue={setValue}
                value={defaultValues.image}
                isEdit
              />

              {/* User Inputs -- Name */}
              <Input
                label="Name"
                name="name"
                type="text"
                placeholder="Full name"
                icon={LuUserCircle2}
                error={errors.name?.message}
                disabled={isPending}
                register={register("name")}
              />
              {user?.isOAuth === false && (
                <>
                  {/* User Inputs -- Email */}
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
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

                  {/* User Inputs -- New Password */}
                  <Input
                    label="New Password"
                    name="newPassword"
                    type="password"
                    placeholder="******"
                    icon={LuKeyRound}
                    error={errors.newPassword?.message}
                    disabled={isPending}
                    register={register("newPassword")}
                  />
                </>
              )}
              {/* User Inputs -- Role */}
              <Select
                selectLabel="Role"
                name="role"
                value={selectValue}
                setSelectValue={setSelectValue}
                error={errors.role?.message}
                disabled={isPending}
                register={register("role")}
                options={[
                  { label: "Admin", value: "ADMIN" },
                  { label: "User", value: "USER" },
                ]}
              />

              {/* User Inputs -- 2FA */}
              {user?.isOAuth === false && (
                <Switch
                  value={defaultValues.isTwoFactorEnabled}
                  error={errors.isTwoFactorEnabled?.message}
                  disabled={isPending}
                  setValue={setValue}
                  label="Two Factor Authentication"
                  descriptions="Enable two factor authentication for your account"
                />
              )}

              {/* Sucess Message */}
              {success && <FormSuccess message={success} />}

              {/* Error Message */}
              {error && <FormError message={error} />}

              {/* Submit Button */}
              <Button disabled={isPending} type="submit" className="w-24 px-6">
                Save
              </Button>
            </form>
          </AnimationWrapper>
        </AnimatePresence>
      ) : (
        <AnimationWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="z-0 flex flex-col items-start my-5">
            <div className="flex justify-between items-center w-full py-2 border-b border-b-border">
              <ChangeProfileImg value={defaultValues.image} />
              <Button className="w-32" onClick={() => setIsEdit(true)}>
                Edit Profile
              </Button>
            </div>

            <div className="flex items-center my-1 py-2">
              <h2 className="text-primary-foreground font-medium text-lg w-32">
                Username
              </h2>
              <p className="text-muted-foreground  pt-1">{user?.name}</p>
            </div>

            <div className="flex items-center my-1 py-2">
              <h2 className="text-primary-foreground font-medium text-lg w-32">
                Email
              </h2>
              <p className="text-muted-foreground  pt-1">{user?.email}</p>
            </div>
            <div className="flex items-center my-1 py-2">
              <h2 className="text-primary-foreground font-medium text-lg w-32">
                Role
              </h2>
              <p className="text-muted-foreground  pt-1">{user?.role}</p>
            </div>
          </div>
        </AnimationWrapper>
      )}
    </>
  );
};

export default SettingsForm;
