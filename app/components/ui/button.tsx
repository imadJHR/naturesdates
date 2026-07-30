import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-black tracking-[0.02em] cursor-pointer transition-all duration-200 hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-[#8B1832] text-white shadow-[0_14px_30px_rgba(139,24,50,0.2)] hover:bg-[#7a152d] hover:shadow-[0_18px_38px_rgba(139,24,50,0.28)]",
        secondary: "bg-[#1B4D3E] text-white",
        outline: "border border-[rgba(27,77,62,0.2)] bg-white/55 text-[#1B4D3E] hover:border-[#8B1832] hover:text-[#8B1832] hover:bg-white",
        ghost: "bg-transparent text-[#1B4D3E] hover:bg-[rgba(27,77,62,0.08)]",
      },
      size: {
        sm: "min-h-[38px] px-3.5 py-2 text-xs",
        md: "min-h-[44px] px-[18px] py-2.5 text-xs",
        lg: "min-h-[52px] px-[22px] py-3 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
