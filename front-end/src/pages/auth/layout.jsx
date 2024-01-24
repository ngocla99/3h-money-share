import { Icons } from "@/components/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";

export function AuthLayout({ children }) {
  return (
    <div className='grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2'>
      <AspectRatio ratio={16 / 9}>
        <img
          className='w-100 absolute inset-0 object-cover'
          src='/images/auth-layout.webp'
          alt='A skateboarder doing a high drop'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40' />
        <Link href='/' className='absolute left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight'>
          <Icons.logo className='mr-2 h-6 w-6' aria-hidden='true' />
          <span>{siteConfig.name}</span>
        </Link>
      </AspectRatio>
      <main className='container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1'>
        {children}
      </main>
    </div>
  );
}
