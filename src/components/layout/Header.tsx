import HeaderLogo from "./header/HeaderLogo";
import HeaderNav from "./header/HeaderNav";
import HeaderActions from "./header/HeaderActions";
import MobileMenuButton from "./header/MobileMenuButton";
import MobileMenu from "./header/MobileMenu";
import { useState } from "react";
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <HeaderLogo />
        <HeaderNav />
        <HeaderActions onNavigate={() => setMobileMenuOpen(false)} />
        <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
        <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </div>
    </header>
  );
}
