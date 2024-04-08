"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { IDeathFormData } from "@/types";

type IFormData = IDeathFormData;

interface IDeathFormContext {
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
  resetFormData: () => void;
  onHandleBack: () => void;
  onHandleNext: () => void;
  step: number;
}

const DeathFormContext = createContext<IDeathFormContext>({
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

export function DeathFormProvider({ children, initialFormData }: IProps) {
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
    <DeathFormContext.Provider
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
    </DeathFormContext.Provider>
  );
}

export function useDeathFormState() {
  return useContext(DeathFormContext);
}
