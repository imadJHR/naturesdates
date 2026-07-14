import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva("shad-badge", {
  variants: {
    variant: {
      default: "shad-badge-default",
      secondary: "shad-badge-secondary",
      outline: "shad-badge-outline",
    },
  },
  defaultVariants: { variant: "default" },
});

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
