"use client";

import { useId, type ComponentProps } from "react";
import { FieldError } from "react-hook-form";

type Props = {
  label?: string;
  error?: FieldError;
} & ComponentProps<"input">;

export const Input = ({ label, id, error, ...rest }: Props) => {
  const reactId = useId();
  const elemId = id ? id : reactId;
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={elemId}>{label}</label>}
      <input
        id={elemId}
        className="outline rounded-sm p-1 outline-slate-700 focus:outline-white"
        {...rest}
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
