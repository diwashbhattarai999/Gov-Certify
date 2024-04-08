"use client";

import { signIn } from "next-auth/react";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Button from "@/components/ui/Button";

const AUTH_SOCIAL_LINKS = [
  {
    label: "google",
    icon: FcGoogle,
  },
  {
    label: "facebook",
    icon: FaFacebook,
  },
];

const AuthSocial = ({ disabled }: { disabled?: boolean }) => {
  const handleSocialLogin = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center justify-between w-full gap-4">
      {AUTH_SOCIAL_LINKS.map((link) => {
        return (
          <Button
            key={link.label}
            className="flex items-center justify-center p-3 bg-border hover:bg-border/60"
            full
            onClick={() =>
              handleSocialLogin(link.label === "google" ? "google" : "facebook")
            }
            disabled={disabled}
            loader={disabled}
          >
            <link.icon className="w-6 h-6 text-blue-600" />
          </Button>
        );
      })}
    </div>
  );
};

export default AuthSocial;
