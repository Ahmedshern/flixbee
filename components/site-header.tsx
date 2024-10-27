"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Ensure this import is correct and the function exists
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuthContext } from "@/components/auth-provider";
import { Film } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const { user } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Film className="h-6 w-6 text-yellow-500" />
          <span className="font-bold text-xl">BeeFlix</span>
        </Link>
        <NavigationMenu className="mx-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="/browse"
              >
                Browse
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="/pricing"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/login"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                Login
              </Link>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}