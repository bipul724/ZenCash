"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LayoutDashboard, PenBox } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const navItems = [
    // {
    //   name: "Features",
    //   link: "#features",
    // },
    // {
    //   name: "Pricing",
    //   link: "#pricing",
    // },
    // {
    //   name: "Contact",
    //   link: "#contact",
    // },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo>
            <Link href="/">
          <Image
            src="/cover1.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>
          </NavbarLogo>

          {/* Static nav items */}
          <NavItems items={navItems} />

          {/* Auth + dashboard actions */}
          <div className="flex items-center gap-3">
            <SignedIn>
              <Link href="/dashboard">
                <NavbarButton asChild variant="secondary" className="flex items-center gap-2">
                  <LayoutDashboard size={18} />
                  <span className="hidden md:inline">Dashboard</span>
                </NavbarButton>
              </Link>
            </SignedIn>

            <SignedIn>
              <Link href="/transactions/create">
                <NavbarButton variant="primary" className="flex items-center gap-2">
                  <PenBox size={18} />
                  <span className="hidden md:inline">Add Transaction</span>
                </NavbarButton>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard">
                <NavbarButton variant="secondary">Login</NavbarButton>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo>
              <Link href="/">
                <Image src="/cover1.png" alt="Logo" width={80} height={80} />
              </Link>
            </NavbarLogo>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-200">
                <span className="block">{item.name}</span>
              </a>
            ))}

            <div className="flex w-full flex-col gap-4 mt-4">
              <SignedOut>
                <SignInButton forceRedirectUrl="/dashboard">
                  <NavbarButton variant="secondary" className="w-full">
                    Login
                  </NavbarButton>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard">
                  <NavbarButton variant="secondary" className="w-full flex items-center gap-2">
                    <LayoutDashboard size={18} /> Dashboard
                  </NavbarButton>
                </Link>
              </SignedIn>

              <SignedIn>
                <Link href="/transactions/create">
                  <NavbarButton variant="primary" className="w-full flex items-center gap-2">
                    <PenBox size={18} /> Add Transaction
                  </NavbarButton>
                </Link>
              </SignedIn>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
