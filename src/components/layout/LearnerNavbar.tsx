
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, LayoutDashboard, Menu, X, User, LogOut, Settings, ArrowLeft, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function LearnerNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if current page has a dark hero section (Landing & Courses)
  const isDarkBg = ['/', '/courses'].includes(location.pathname);

  const navLinks: { href: string; label: string; icon: React.ElementType }[] = [];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* Mirror/Glassmorphism Base Layer */}
      <div className="absolute inset-0 bg-background/5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/5" />

      {/* Glossy Reflective Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none opacity-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-mirror-shine w-1/2" />
      </div>

      {/* Classy Bottom Border Beam */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent" />

      {/* Ultra-subtle inner glow */}
      <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />

      <div className="container relative z-10 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to={isAuthenticated ? "/my-courses" : "/"}
          className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 group"
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/5 shadow-2xl transition-all group-hover:bg-white/10 group-hover:shadow-primary/20">
            <img
              src="/logo.png"
              alt="LearnSphere Logo"
              className="h-full w-full object-cover mix-blend-normal transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(113,75,110,0.6)]"
            />
            {/* Subtle glow orb behind logo */}
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className={cn(
            "font-display text-2xl font-extrabold tracking-tight transition-all duration-300",
            // Conditional color: White with glow on dark backgrounds, standard foreground otherwise
            isDarkBg
              ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              : "text-foreground group-hover:text-primary"
          )}>
            LearnSphere
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive(href)
                  ? "text-primary"
                  : isDarkBg
                    ? "text-white/80 hover:text-white"
                    : "text-muted-foreground hover:text-primary"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              {(user?.role === 'admin' || user?.role === 'instructor') && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/backoffice">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Backoffice
                  </Link>
                </Button>
              )}

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-300 p-0 overflow-hidden group">
                    <Avatar className="h-full w-full transition-transform duration-500 group-hover:scale-110">
                      <AvatarImage src={user?.avatar} alt={user?.name} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* Status Dot */}
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-80 p-0 mt-2 border-primary/20 bg-background/80 backdrop-blur-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 duration-300"
                  align="end"
                  forceMount
                >
                  {/* Glass Gradient Overlay */}
                  <div className="bg-gradient-to-b from-primary/5 via-transparent to-transparent">

                    {/* Profile Header */}
                    <div className="relative p-6 pb-5 border-b border-border/40 bg-gradient-to-b from-white/5 to-transparent animate-in slide-in-from-top-4 fade-in duration-700">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {/* Avatar Glow Ring */}
                          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-purple-600 opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
                          <Avatar className="relative h-12 w-12 ring-2 ring-background shadow-lg">
                            <AvatarImage src={user?.avatar} className="object-cover" />
                            <AvatarFallback className="bg-primary text-white font-bold">{user?.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-background flex items-center justify-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-white opacity-50 animate-pulse" />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-0.5 min-w-0">
                          <p className="font-bold text-base bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 truncate leading-tight">
                            {user?.name}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium tracking-wide truncate">
                            {user?.email}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] font-bold text-green-500/80 uppercase tracking-wider">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                      {[
                        { href: '/courses', label: 'Courses', icon: BookOpen },
                        { href: '/my-courses', label: 'My Courses', icon: GraduationCap },
                        { href: '/badges', label: 'My Badges', icon: Award },
                        { href: '/settings', label: 'Settings', icon: Settings }
                      ].map((item, index) => (
                        <DropdownMenuItem asChild key={item.href} className="focus:bg-transparent">
                          <Link
                            to={item.href}
                            className={cn(
                              "group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-300 border border-transparent animate-in slide-in-from-left-2 fade-in duration-500 hover:scale-[1.02]",
                              isActive(item.href)
                                ? "bg-primary/10 border-primary/20 shadow-sm"
                                : "hover:bg-primary/5 hover:border-primary/10 hover:shadow-sm"
                            )}
                            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "flex items-center justify-center w-9 h-9 rounded-lg bg-background shadow-sm border border-border/50 transition-all duration-300 group-hover:scale-110",
                                isActive(item.href) ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground group-hover:text-primary"
                              )}>
                                <item.icon className="h-4 w-4" />
                              </div>
                              <span className={cn(
                                "font-medium text-sm transition-colors duration-300",
                                isActive(item.href) ? "text-primary" : "text-foreground/80 group-hover:text-primary"
                              )}>
                                {item.label}
                              </span>
                            </div>
                            <ArrowLeft className={cn(
                              "h-4 w-4 text-primary/50 opacity-0 -translate-x-2 transition-all duration-300 rotate-180",
                              "group-hover:opacity-100 group-hover:translate-x-0"
                            )} />
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>

                    {/* Logout Section */}
                    <div
                      className="p-2 mt-1 border-t border-border/40 bg-destructive/5 animate-in slide-in-from-bottom-2 fade-in duration-700 zoom-in-95"
                      style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}
                    >
                      <DropdownMenuItem
                        onClick={logout}
                        className="group flex items-center gap-3 p-2.5 rounded-xl cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 transition-all duration-300 hover:shadow-inner"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-destructive/10 group-hover:bg-destructive group-hover:text-white transition-colors duration-300">
                          <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                        </div>
                        <span className="font-semibold text-sm">Log Out</span>
                      </DropdownMenuItem>
                    </div>

                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  "transition-colors",
                  isDarkBg ? "text-white hover:bg-white/10 hover:text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="shadow-lg shadow-primary/20">
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", isDarkBg && "text-white hover:bg-white/10 hover:text-white")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden bg-background/95 backdrop-blur-xl">
          <nav className="container flex flex-col gap-2 py-4">
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive('/courses') ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Courses
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-courses"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive('/my-courses') ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <GraduationCap className="h-4 w-4" />
                My Courses
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/badges"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive('/badges') ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Award className="h-4 w-4" />
                My Badges
              </Link>
            )}
            <div className="my-2 h-px bg-border" />
            {isAuthenticated ? (
              <>
                {(user?.role === 'admin' || user?.role === 'instructor') && (
                  <Link
                    to="/backoffice"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Backoffice
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
