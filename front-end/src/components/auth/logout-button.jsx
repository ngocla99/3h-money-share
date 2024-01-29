import * as React from "react";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useNavigate } from "react-router-dom";

export function LogOutButtons() {
  const { clearToken } = useAuth();
  const navigate = useNavigate();
  const mounted = useMounted();
  const [isPending, startTransition] = React.useTransition();

  const signout = () => {
    startTransition(() => {
      clearToken();
      navigate("/signin");
    });
  };

  return (
    <div className="flex w-full items-center space-x-2">
      {mounted ? (
        <Button
          aria-label="Log out"
          size="sm"
          className="w-full"
          disabled={isPending}
          onClick={signout}
        >
          {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Log out
        </Button>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full bg-muted text-muted-foreground"
          )}
        >
          Log out
        </Skeleton>
      )}
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => navigate(-1)}
        disabled={isPending}
      >
        Go back
      </Button>
    </div>
  );
}
