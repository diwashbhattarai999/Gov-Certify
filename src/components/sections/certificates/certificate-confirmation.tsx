import Button from "@/components/ui/Button";
import { LuX } from "react-icons/lu";

interface ICertificateConfirmationProps {
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  isPending: boolean;
}

const CertificateConfirmation = ({
  setShowConfirmation,
  handleSubmit,
  isPending,
}: ICertificateConfirmationProps) => {
  return (
    <div className="fixed top-0 left-0 bg-black/40 h-screen w-full z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-background p-6 rounded-md max-md:w-full md:w-[700px] flex flex-col gap-6">
        <div className="flex justify-between items-center gap-4 text-secondary-foreground font-semibold text-2xl">
          <h1>Terms and Agreements</h1>
          <LuX
            className="cursor-pointer"
            onClick={() => setShowConfirmation(false)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground text-sm">
            Please carefully review the terms and agreements outlined below
            before proceeding.
          </p>
          <p className="text-muted-foreground text-sm">
            {`By clicking "Yes, I agree," you acknowledge that you have read,
            understood, and agree to abide by the terms and conditions set forth
            herein.`}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">
            1. Users are solely responsible for the accuracy and authenticity of
            the information provided during the registration process.
          </p>
          <p className="text-muted-foreground text-sm">
            2. Users agree not to engage in any unlawful, harmful, or
            unauthorized activities on the platform.
          </p>
          <p className="text-muted-foreground text-sm">
            3. The platform reserves the right to suspend or terminate user
            accounts found violating the terms of service.
          </p>
          {/* Add more terms and conditions as needed */}
        </div>

        <div>
          <h3 className="font-medium text-lg">
            Are you sure you want to accept?
          </h3>
          <p className="text-muted-foreground text-sm">
            By accepting, you agree to comply with all applicable laws and
            regulations and to use the provided services responsibly.
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            className="w-36"
            destructive
            onClick={() => {
              setShowConfirmation(false);
            }}
          >
            No, Cancel
          </Button>
          <Button
            className="w-36"
            onClick={() => {
              handleSubmit();
              setShowConfirmation(false);
            }}
            disabled={isPending}
            loader={isPending}
          >
            Yes, I Agree
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificateConfirmation;
