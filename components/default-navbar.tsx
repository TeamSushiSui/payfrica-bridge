import React from "react";
import { Logo } from "./logo";
import { navLinks } from "@/constants";
import Link from "next/link";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { ConnectWalletButton } from "./connect-wallet-button";
import { MobileNavBar } from "./mobile-nav-links";

export const DefaultNavBar = () => {
  return (
    <nav className="w-screen bg-accent/35 p-4 z-50 fixed top-0 left-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Logo width={120} height={120} />
          <NavLinks />
        </div>
        <div className="space-x-2">
          <ConnectWalletButton />
          <MobileNavBar />
        </div>
      </div>
    </nav>
  );
};

const NavLinks = () => {
  const desktopNavLinks = navLinks.filter((l) => l.showOnDesktop);

  return (
    <div>
      <ul className="items-center gap-7 md:flex hidden">
        {desktopNavLinks.map((link, idx) => (
          <li key={idx}>
            <Link href={link.path}>{link.label}</Link>
          </li>
        ))}
        <Button variant="ghost">
          More <Play fill="#fff" size={10} className=" rotate-90 size-2" />
        </Button>
      </ul>
    </div>
  );
};
