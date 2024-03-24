"use client";

import Image from "next/image";
import toast from "react-hot-toast";

import { UploadButton } from "@/lib/uploadthing";
import { UseFormSetValue } from "react-hook-form";
import { useState } from "react";
import Button from "../ui/Button";

interface ChangeProfileImgProps {
  value?: string;
  setValue?: UseFormSetValue<{
    image?: string | undefined;
    role: "ADMIN" | "USER";
    name?: string | undefined;
    isTwoFactorEnabled?: boolean | undefined;
    email?: string | undefined;
    password?: string | undefined;
    newPassword?: string | undefined;
  }>;
  isEdit?: boolean;
}

const ChangeProfileImg = ({
  value,
  setValue,
  isEdit,
}: ChangeProfileImgProps) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleProfileDelete = () => {
    setImageUrl("");

    setValue && setValue("image", "");
  };

  return (
    <>
      <div className="mb-4 text-left flex items-center justify-between w-full gap-4">
        <div className="h-36 w-36 p-1 rounded-full cursor-pointer duration-300 relative">
          <Image
            src={imageUrl || value || "/images/default-profile.png"}
            alt="Profile"
            width={500}
            height={500}
            className="w-full h-full rounded-full"
            priority
          />
        </div>
        {isEdit && (
          <div className="flex gap-4 items-start">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setValue && setValue("image", res[0].url);
                setImageUrl(res[0].url);

                toast.success("Upload completed.");
              }}
              onUploadError={(error: Error) => {
                toast.error(`ERROR! ${error.message}`);
              }}
            />
            <Button
              onClick={handleProfileDelete}
              className="w-32 bg-destructive text-destructive-foreground"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChangeProfileImg;
