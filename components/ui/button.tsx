import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-full font-bold transition active:scale-95 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-brand text-ink ring-2 ring-ink/10 hover:brightness-95",
        secondary: "bg-ink text-white hover:bg-black",
        dark: "bg-ink text-brand hover:bg-black",
        soft: "bg-brand/20 text-ink hover:bg-brand/30",
        ghost: "text-ink hover:bg-brand/20",
        outline: "border-2 border-ink bg-white text-ink hover:bg-brand",
        muted: "bg-black/10 text-black/40",
      },
      size: {
        md: "min-h-11 px-6 py-3 text-sm",
        lg: "min-h-12 px-8 py-4 text-base",
        icon: "h-11 w-11 p-0 text-lg",
        stepper: "h-7 w-7 p-0 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonVariantProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
