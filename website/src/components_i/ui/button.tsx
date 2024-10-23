import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-center",
  {
    variants: {
      variant: {
        default: "bg-[#0053f8] text-white hover:bg-[#0041c2]",
        large: "bg-[#0053f8] text-white hover:bg-[#0041c2]",
        extraLarge: "bg-[#0053f8] text-white hover:bg-[#0041c2]",
        outline:
          "border border-[#E0DEF7] text-[#0053f8] hover:bg-[rgb(209,224,253)]/20", // Aqui já está a cor do texto como #0053f8
        outlineDefault:
          "border-2 border-[#E0DEF7] text-[#0053f8] hover:bg-[#E0DEF7]/20",
        outlineLarge:
          "border-2 border-[#E0DEF7] text-[#0053f8] hover:bg-[#E0DEF7]/20",
        outlineExtraLarge:
          "border-2 border-[#E0DEF7] text-[#0053f8] hover:bg-[#E0DEF7]/20",
        ghost: "text-purple-600 hover:bg-purple-100",
        link: "text-blue-600 underline hover:text-blue-800",
        google:
          "border border-[#D6DDEB] bg-white text-[#000929] font-bold text-[16px] leading-[1.5] font-['Plus Jakarta Sans'] gap-2",
      },
      size: {
        sm: "h-8 px-3 rounded-md font-bold text-[14px] leading-[1.4] font-['Plus Jakarta Sans']",
        md: "h-10 px-4 rounded-md font-bold text-[14px] leading-[1.4] font-['Plus Jakarta Sans']",
        lg: "h-12 px-6 rounded-lg font-bold text-[14px] leading-[1.4] font-['Plus Jakarta Sans']",
        icon: "h-10 w-10 flex items-center justify-center font-bold text-[14px] leading-[1.4] font-['Plus Jakarta Sans']",
        large:
          "h-14 px-8 py-3 rounded-lg text-lg leading-[1.5] font-bold font-['Plus Jakarta Sans']",
        large2:
          "h-14 px-6 py-3 rounded-lg text-lg leading-[1.5] font-bold font-['Plus Jakarta Sans']",
        extraLarge:
          "h-16 px-10 py-4 rounded-lg text-xl leading-[1.5] font-bold font-['Plus Jakarta Sans']",
        xxLarge:
          "h-20 px-12 py-5 rounded-lg text-2xl leading-[1.5] font-bold font-['Plus Jakarta Sans']",
        google: "px-16 py-3 rounded-md", // Tamanho específico para o botão Google
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
