"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { IBirthFormData } from "@/types";

type IFormData = IBirthFormData;

interface IBirthFormContext {
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
  resetFormData: () => void;
  onHandleBack: () => void;
  onHandleNext: () => void;
  step: number;
}

const BirthFormContext = createContext<IBirthFormContext>({
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

export function BirthFormProvider({ children, initialFormData }: IProps) {
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
    <BirthFormContext.Provider
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
    </BirthFormContext.Provider>
  );
}

export function useBirthFormState() {
  return useContext(BirthFormContext);
}
