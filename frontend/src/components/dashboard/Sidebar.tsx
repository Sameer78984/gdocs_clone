'use client';

import { useAuthStore } from '../../store/auth.store';
import { useLogout } from '../../features/auth/queries/useLogout';
import { useUIStore } from '../../store/ui.store';
import { FileText, Users, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Sheet, SheetContent } from '../ui/sheet';

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const { user } = useAuthStore();
  const logout = useLogout();
  const pathname = usePathname();

  const handleLogout = () => {
    logout.mutate();
  };

  const navLinks = [
    { href: '/dashboard', label: 'My Documents', icon: FileText },
    { href: '/dashboard/shared', label: 'Shared With Me', icon: Users },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded shrink-0">
            <FileText size={20} />
          </div>
          <span>Docs AI</span>
        </h1>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-gray-500"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <Icon size={18} className="shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <div className="mb-3 px-2 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
          disabled={logout.isPending}
        >
          <LogOut size={18} className="mr-2 shrink-0" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      {/* Desktop sidebar — hidden on mobile */}
      <aside className="hidden md:flex md:w-56 lg:w-64 border-r bg-white flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72 max-w-[85vw]">
          <SidebarContent onClose={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
