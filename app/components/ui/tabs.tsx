"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={cn("grid gap-9", className)} {...props} />;
}

export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "w-fit max-w-full flex gap-1.5 overflow-x-auto p-1.5 border border-[rgba(27,77,62,0.1)] rounded-full bg-white/64 [scrollbar-width:none]",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "min-h-[42px] flex-none rounded-full px-[17px] py-[9px] bg-transparent text-[rgba(27,77,62,0.68)] font-black cursor-pointer data-[state=active]:bg-white data-[state=active]:text-[#1B4D3E] data-[state=active]:shadow-[0_4px_12px_rgba(27,77,62,0.12)]",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("outline-none data-[state=inactive]:hidden", className)}
      {...props}
    />
  );
}
