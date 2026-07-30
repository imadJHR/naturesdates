import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "w-fit min-h-[28px] inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-black tracking-[0.08em] leading-none uppercase",
  {
    variants: {
      variant: {
        default: "bg-[#8B1832] text-white",
        secondary: "bg-[rgba(27,77,62,0.16)] text-[#1B4D3E]",
        outline: "border border-[rgba(27,77,62,0.2)] bg-white/46 text-[#1B4D3E]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
