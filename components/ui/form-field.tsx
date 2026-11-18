import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="ml-1 text-sm font-bold text-ink">{label}</span>
      {children}
      {error ? (
        <span role="alert" className="text-sm text-red-700">
          {error}
        </span>
      ) : null}
    </label>
  );
}
