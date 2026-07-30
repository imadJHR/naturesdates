import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const cardStyles = "overflow-hidden border border-[rgba(212,165,116,0.2)] rounded-[32px] bg-white/90 shadow-[0_20px_55px_rgba(27,77,62,0.1)]";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(cardStyles, className)} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-[11px] px-6 pt-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("m-0 text-[#1B4D3E] text-[clamp(23px,2.5vw,32px)] leading-[1.05] tracking-[-0.035em]", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("m-0 text-[rgba(27,77,62,0.7)] text-[15px] leading-[1.55]", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-[18px] px-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-wrap gap-2.5 px-6 pb-6 pt-5", className)} {...props} />;
}
