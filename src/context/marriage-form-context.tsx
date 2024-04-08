"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { IMarriageFormData } from "@/types";

type IFormData = IMarriageFormData;

interface IMarriageFormContext {
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
  resetFormData: () => void;
  onHandleBack: () => void;
  onHandleNext: () => void;
  step: number;
}

const MarriageFormContext = createContext<IMarriageFormContext>({
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

export function MarriageFormProvider({ children, initialFormData }: IProps) {
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
    <MarriageFormContext.Provider
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
    </MarriageFormContext.Provider>
  );
}

export function useMarriageFormState() {
  return useContext(MarriageFormContext);
}
