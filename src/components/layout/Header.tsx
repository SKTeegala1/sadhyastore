import HeaderLogo from "./header/HeaderLogo";
import { Sparkles, Truck, Leaf, ShieldCheck, LogOut } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import SearchBar from "@/components/search/SearchBar";
import HeaderNav from "./header/HeaderNav";
import HeaderActions from "./header/HeaderActions";
import MobileMenuButton from "./header/MobileMenuButton";
import { useState } from "react";
import MobileMenu from "./header/MobileMenu";

function Header() {
const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
// backdrop-blur-md
  return (
    <header className="sticky top-0 z-30  bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <HeaderLogo />
       <HeaderNav />
        <HeaderActions
    onNavigate={() => setMobileMenuOpen(false)}
/>
        <MobileMenuButton
    onClick={() => setMobileMenuOpen(true)}
/>
<MobileMenu
    open={mobileMenuOpen}
    onClose={() => setMobileMenuOpen(false)}
/>
      </div>
    </header>
  );
}

export default Header;