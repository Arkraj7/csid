import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-border bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            {/* You can change w-16 h-auto to make the logo larger or smaller */}
            <AppLogo className="w-16 h-auto drop-shadow-md" />
            <span className="font-bold text-xl tracking-tight text-foreground">
              CSID
            </span>
          </Link>

          {/* Rest of your Navbar links... */}
        </div>
      </div>
    </nav>
  );
}
