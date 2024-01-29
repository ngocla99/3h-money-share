// Modified from: https://github.com/shadcn-ui/ui/blob/main/apps/www/components/page-header.tsx

import { cva } from "class-variance-authority";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function PageHeader({
  className,
  children,
  as: Comp = "section",
  separated = false,
  ...props
}) {
  return (
    <Comp className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
      {separated ? <Separator className="mt-2.5" /> : null}
    </Comp>
  );
}

const headingVariants = cva(
  "font-bold leading-tight tracking-tighter lg:leading-[1.1]",
  {
    variants: {
      size: {
        default: "text-3xl md:text-4xl",
        sm: "text-2xl md:text-3xl",
        lg: "text-4xl md:text-5xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function PageHeaderHeading({ className, size, as: Comp = "h1", ...props }) {
  return (
    <Comp className={cn(headingVariants({ size, className }))} {...props} />
  );
}

const descriptionVariants = cva(
  "max-w-[750px] text-balance text-muted-foreground",
  {
    variants: {
      size: {
        default: "text-base sm:text-lg",
        sm: "text-sm sm:text-base",
        lg: "text-lg sm:text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function PageHeaderDescription({ className, size, ...props }) {
  return (
    <p className={cn(descriptionVariants({ size, className }))} {...props} />
  );
}

export { PageHeader, PageHeaderDescription, PageHeaderHeading };
