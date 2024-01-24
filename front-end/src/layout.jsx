import { SiteFooter } from "@/components/layouts/site-footer";
import { cn } from "@/lib/utils";

export const AppLayout = ({ children }) => {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <div className='relative flex min-h-screen flex-col'>
        {/* <SiteHeader user={user} /> */}
        <main className='flex-1'>{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
};
