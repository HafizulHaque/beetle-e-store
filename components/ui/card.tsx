import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn";

export const cardVariants = cva("rounded-2xl", {
  variants: {
    tone: {
      default: "bg-white",
      muted: "bg-brand/10",
      outline: "border border-black/10 bg-white",
      ink: "bg-ink text-white",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
    },
    interactive: {
      true: "transition hover:shadow-md",
      false: "",
    },
  },
  defaultVariants: {
    tone: "default",
    padding: "none",
    interactive: false,
  },
});

type CardVariantProps = VariantProps<typeof cardVariants>;

type CardProps = HTMLAttributes<HTMLElement> &
  CardVariantProps & {
    as?: "div" | "article" | "li" | "p";
    children?: ReactNode;
  };

export function Card({
  as: Tag = "div",
  tone,
  padding,
  interactive,
  className,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(cardVariants({ tone, padding, interactive }), className)}
      {...props}
    />
  );
}
