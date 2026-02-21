import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DashboardGreeting } from './DashboardGreeting';
import { SidebarUser } from './SidebarUser';
import {
  GraduationCap,
  LayoutDashboard,
  BookMarked,
  UsersRound,
  PieChart,
  Settings2,
  ChevronLeft,
  LogOut,
  Menu,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  adminOnly?: boolean;
}

const sidebarLinks: SidebarLink[] = [
  { href: '/backoffice', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/backoffice/courses', label: 'Courses', icon: BookMarked },
  { href: '/backoffice/learners', label: 'Learners', icon: UsersRound },
  { href: '/backoffice/instructors', label: 'Instructors', icon: GraduationCap, adminOnly: true },
  { href: '/backoffice/reports', label: 'Reports', icon: PieChart },
  { href: '/backoffice/settings', label: 'Settings', icon: Settings2 },
];

export function BackofficeLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex h-16 items-center border-b border-border px-4",
          collapsed ? "justify-center" : "justify-between"
        )}>
          <Link
            to="/backoffice"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              if (collapsed) {
                e.preventDefault();
                setCollapsed(false);
              }
            }}
          >
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white/5 transition-all group-hover:bg-white/10">
              <img
                src="/logo.png"
                alt="LearnSphere Logo"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(113,75,110,0.5)]"
              />
            </div>
            {!collapsed && (
              <span className="font-display text-lg font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
                LearnSphere
              </span>
            )}
          </Link>
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setCollapsed(true)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {sidebarLinks.map(({ href, label, icon: Icon, exact, adminOnly }) => {
            if (adminOnly && user?.role !== 'admin') return null;
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(href, exact)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <SidebarUser user={user} collapsed={collapsed} logout={logout} />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={cn(
        "flex flex-1 flex-col transition-all duration-300",
        collapsed ? "md:pl-16" : "md:pl-64"
      )}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} title="Go to Site">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <DashboardGreeting name={user?.name || 'User'} className="mr-0" />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
