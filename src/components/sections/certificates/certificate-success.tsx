"use client";

import { GiConfirmed } from "react-icons/gi";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ICertificateSuccessProps {
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const CertificateSuccess = ({ setShowSuccess }: ICertificateSuccessProps) => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 bg-black/40 h-screen w-full z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-background p-6 rounded-md max-md:w-full md:w-[700px] flex flex-col gap-6">
        <div className="flex text-success-foreground bg-success py-4 px-2 items-center justify-center gap-4 text-center font-semibold text-lg md:text-2xl rounded-sm">
          <GiConfirmed />
          <h1>Certificate Submitted Successfully!</h1>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground text-sm">
            Thank you for submitting your certificate request. Your form has
            been successfully submitted.
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/your-certificates">
            <Button
              className="w-36"
              onClick={() => {
                setShowSuccess(false);
              }}
            >
              Close
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CertificateSuccess;
