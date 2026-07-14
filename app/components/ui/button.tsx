import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("shad-button", {
  variants: {
    variant: {
      default: "shad-button-default",
      secondary: "shad-button-secondary",
      outline: "shad-button-outline",
      ghost: "shad-button-ghost",
    },
    size: {
      default: "shad-button-md",
      sm: "shad-button-sm",
      lg: "shad-button-lg",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
