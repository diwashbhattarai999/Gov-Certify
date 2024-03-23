import { LuCheckCircle2 } from "react-icons/lu";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="w-full bg-success  p-3 my-4 rounded-md flex items-center gap-x-2 font-semibold text-success">
      <LuCheckCircle2 className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
