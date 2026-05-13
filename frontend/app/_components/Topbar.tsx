"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

type TopbarProps = {
  onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const crumbs = useMemo(() => {
    if (pathname === "/") return [{ label: "Dashboard" }];
    return pathname
      .split("/")
      .filter(Boolean)
      .map((seg, index, arr) => ({
        label: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        to: index < arr.length - 1 ? "/" + arr.slice(0, index + 1).join("/") : undefined,
      }));
  }, [pathname]);

  return (
    <header
      className="flex h-[60px] shrink-0 items-center gap-4 px-6"
      style={{
        background: "hsl(var(--card))",
        borderBottom: "1px solid hsl(var(--border))",
      }}
    >
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 -ml-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <nav className="flex items-center gap-1.5 text-sm min-w-0">
        {crumbs.map((crumb, index) => (
          <span key={crumb.label} className="flex items-center gap-1.5 min-w-0">
            {index > 0 ? (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            ) : null}
            <span
              className={cn(
                "truncate",
                index === crumbs.length - 1
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex items-center gap-2 text-muted-foreground text-sm font-normal h-8 px-3"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search…</span>
          <kbd className="ml-2 text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">
            ⌘K
          </kbd>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 text-muted-foreground"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-orange-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-0.5 py-2.5">
              <span className="text-sm font-medium">New enrollment request</span>
              <span className="text-xs text-muted-foreground">
                Grade 8 · 2 minutes ago
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-0.5 py-2.5">
              <span className="text-sm font-medium">Attendance report ready</span>
              <span className="text-xs text-muted-foreground">
                October 2024 · 1 hour ago
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs text-center text-primary font-medium justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full ring-2 ring-transparent hover:ring-border transition-all">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background: "hsl(var(--primary))",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                AD
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Administrator</p>
                <p className="text-xs text-muted-foreground font-normal">
                  admin@school.edu.np
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Account settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
