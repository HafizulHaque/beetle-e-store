import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn";

export const fieldVariants = cva(
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-brand",
  {
    variants: {
      invalid: {
        true: "border-red-700 focus:border-red-700 focus:ring-red-200",
        false: "border-black/15",
      },
    },
    defaultVariants: {
      invalid: false,
    },
  },
);

type FieldVariantProps = VariantProps<typeof fieldVariants>;

export function Input({
  invalid,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & FieldVariantProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(fieldVariants({ invalid }), className)}
      {...props}
    />
  );
}

export function Textarea({
  invalid,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & FieldVariantProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(fieldVariants({ invalid }), className)}
      {...props}
    />
  );
}

export function Select({
  invalid,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & FieldVariantProps) {
  return (
    <select
      aria-invalid={invalid || undefined}
      className={cn(fieldVariants({ invalid }), className)}
      {...props}
    />
  );
}
