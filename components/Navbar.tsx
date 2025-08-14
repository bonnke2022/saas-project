"use client";
import Image from "next/image";
import Link from "next/link";
import NavItems, { navItems } from "./NavItems";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <NavItems />
        <SignedOut>
          <div className="flex items-center gap-2 cursor-pointer">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton afterSwitchSessionUrl="/" />
        </SignedIn>
        <Sheet>
          <SheetTrigger className="lg:hidden">
            <Menu className="w-8 h-6" />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start gap-18 p-6 lg:hidden">
            <SheetTitle>
              <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                  <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={46}
                    height={44}
                  />
                </div>
              </Link>
            </SheetTitle>
            <nav className="lg:hidden flex flex-col gap-4 whitespace-nowrap">
              {navItems.map((item) => {
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className={cn(
                      pathname === item.href && "text-primary font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
