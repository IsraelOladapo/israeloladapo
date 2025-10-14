"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-hover focus:ring-primar",
        secondary:
          "bg-secondary text-white hover:bg-secondary-hover focus:ring-secondar",
        outline: "border border-border text-txt hover:bg-surface/70",
        subtle: "bg-surface text-txt hover:bg-surface/80 focus:ring-border",
        ghost: "text-txt hover:bg-surface/50 focus:ring-border",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant, size, loading, disabled, ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
      {children}
    </button>
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
