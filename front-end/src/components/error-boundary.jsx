import { useRouteError } from "react-router-dom";
import { Button } from "./ui/button";

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <main className='h-lvh bg-gray-100 flex items-center justify-center p-18'>
      <div className='bg-gray-50 border rounded-md text-center p-20'>
        <h1 className='mb-6'>Something went wrong 🧐</h1>
        <p className='mb-12'>{error.message}</p>
        <Button size='lg' onClick={() => window.location.replace("/")}>
          Try again
        </Button>
      </div>
    </main>
  );
}
