import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 px-3 py-1 min-w-fit min-h-fit whitespace-nowrap label-large transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: "cursor-pointer disabled:cursor-default",
        outline: "cursor-pointer disabled:cursor-default bg-transparent border",
      },
      size: {
        default: "h-[32px] rounded-md",
        sm: "h-[32px] w-[100px] rounded-full",
        md: "h-[48px] w-[112px] rounded-full",
        lg: "h-[44px] w-[248px] rounded-md",
      },
      color: {
        purple:
          "bg-purple text-white border-purple hover:bg-purple/90 disabled:bg-purple/50 disabled:text-white/70",
        pink: "bg-pink text-white border-pink hover:bg-pink/90 disabled:bg-pink/50 disabled:text-white/70",
        "light-pink":
          "bg-light-pink text-black border-light-pink hover:bg-light-pink/90 disabled:bg-light-pink/50",
        "vivid-pink":
          "bg-vivid-pink text-white border-vivid-pink hover:bg-vivid-pink/90 disabled:bg-vivid-pink/50",
        "light-blue":
          "bg-light-blue text-black border-light-blue hover:bg-light-blue/90 disabled:bg-light-blue/50",
        yellow:
          "bg-yellow text-black border-yellow hover:bg-yellow/90 disabled:bg-yellow/50",
        white:
          "bg-white text-black border-grey hover:bg-grey/10 disabled:bg-grey/20",
        grey: "bg-grey text-black border-deep-grey hover:bg-deep-grey/10 disabled:bg-deep-grey/30",
        black:
          "bg-black text-white border-black hover:bg-black/90 disabled:bg-deep-deep-grey/50",
        red: "bg-red text-white border-red hover:bg-red/90 disabled:bg-red/50",
        green:
          "bg-green text-white border-green hover:bg-green/90 disabled:bg-green/50",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        color: "purple",
        className:
          "bg-transparent text-purple border-purple hover:bg-purple/10 disabled:bg-transparent disabled:text-purple/50 disabled:border-purple/50",
      },
      {
        variant: "outline",
        color: "pink",
        className:
          "bg-transparent text-pink border-pink hover:bg-pink/10 disabled:bg-transparent disabled:text-pink/50 disabled:border-pink/50",
      },
      {
        variant: "outline",
        color: "light-pink",
        className:
          "bg-transparent text-light-pink border-light-pink hover:bg-light-pink/10 disabled:bg-transparent disabled:text-light-pink/50 disabled:border-light-pink/50",
      },
      {
        variant: "outline",
        color: "vivid-pink",
        className:
          "bg-transparent text-vivid-pink border-vivid-pink hover:bg-vivid-pink/10 disabled:bg-transparent disabled:text-vivid-pink/50 disabled:border-vivid-pink/50",
      },
      {
        variant: "outline",
        color: "light-blue",
        className:
          "bg-transparent text-light-blue border-light-blue hover:bg-light-blue/10 disabled:bg-transparent disabled:text-light-blue/50 disabled:border-light-blue/50",
      },
      {
        variant: "outline",
        color: "yellow",
        className:
          "bg-transparent text-yellow border-yellow hover:bg-yellow/10 disabled:bg-transparent disabled:text-yellow/50 disabled:border-yellow/50",
      },
      {
        variant: "outline",
        color: "white",
        className:
          "bg-transparent text-white border-white hover:bg-white/10 disabled:bg-transparent disabled:text-white/50 disabled:border-white/50",
      },
      {
        variant: "outline",
        color: "grey",
        className:
          "bg-transparent text-deep-grey border-deep-grey hover:bg-deep-grey/10 disabled:bg-transparent disabled:text-deep-grey/50 disabled:border-deep-grey/50",
      },
      {
        variant: "outline",
        color: "black",
        className:
          "bg-transparent text-black border-black hover:bg-black/10 disabled:bg-transparent disabled:text-black/50 disabled:border-black/50",
      },
      {
        variant: "outline",
        color: "red",
        className:
          "bg-transparent text-red border-red hover:bg-red/10 disabled:bg-transparent disabled:text-red/50 disabled:border-red/50",
      },
      {
        variant: "outline",
        color: "green",
        className:
          "bg-transparent text-green border-green hover:bg-green/10 disabled:bg-transparent disabled:text-green/50 disabled:border-green/50",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "purple",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, color, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
