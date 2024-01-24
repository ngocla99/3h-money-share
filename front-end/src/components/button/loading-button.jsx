import { Icons } from "../icons";
import { Button } from "../ui/button";

export default function LoadingButton({ children, onClick, disabled, loading, icon, ...props }) {
  return (
    <Button
      {...props}
      type={onClick ? "button" : "submit"}
      {...(onClick ? { onClick } : {})}
      disabled={disabled || loading}
    >
      {loading ? (
        <Icons.spinner className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
      ) : (
        <>
          {icon}
          <p>{children}</p>
        </>
      )}
    </Button>
  );
}
