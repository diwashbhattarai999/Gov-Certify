"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { IResidentialFormData } from "@/types";

type IFormData = IResidentialFormData;

interface IResidentialFormContext {
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
  resetFormData: () => void;
  onHandleBack: () => void;
  onHandleNext: () => void;
  step: number;
}

const ResidentialFormContext = createContext<IResidentialFormContext>({
  formData: {} as IFormData,
  onHandleBack: () => {},
  onHandleNext: () => {},
  setFormData: () => {},
  resetFormData: () => {},
  step: 0,
});

interface IProps {
  children: ReactNode;
  initialFormData: IFormData;
}

export function ResidentialFormProvider({ children, initialFormData }: IProps) {
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [step, setStep] = useState(1);

  function onHandleNext() {
    setStep((prev) => prev + 1);
  }

  function onHandleBack() {
    setStep((prev) => prev - 1);
  }

  function resetFormData() {
    setFormData(initialFormData);
  }

  return (
    <ResidentialFormContext.Provider
      value={{
        formData,
        setFormData,
        resetFormData,
        onHandleBack,
        onHandleNext,
        step,
      }}
    >
      {children}
    </ResidentialFormContext.Provider>
  );
}

export function useResidentialFormState() {
  return useContext(ResidentialFormContext);
}
