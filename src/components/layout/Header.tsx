import logo from "@/assets/logo.jpg";
import { ShoppingBag, Sparkles, Truck, Leaf, ShieldCheck, LogOut } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

function Header() {

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
  to="/"
  className="flex items-center gap-3"
>
          
          <div
  className="w-11 h-11 rounded-full overflow-hidden border border-primary/20 bg-white flex items-center justify-center"
>
  <img
    src={logo}
    alt="Sadhya Snack Box"
    className="w-full h-full object-cover"
  />
</div>
          <div>
            <div className="font-display text-xl font-bold leading-none text-secondary">Sadhya</div>
            <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Snak Box</div>
          </div>
        </Link>
       <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

 <Link
  to="/"
  hash="shop"
  className="hover:text-primary transition"
>
  Shop
</Link>

 <Link
  to="/"
  hash="categories"
  className="hover:text-primary transition"
>
  Categories
</Link>

  <Link
  to="/"
  hash="why"
  className="hover:text-primary transition"
>
  Why Us
</Link>

 <Link
  to="/"
  hash="contact"
  className="hover:text-primary transition"
>
  Contact
</Link>

</nav>
        <Link
  to="/"
  hash="shop"
  className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-primary-foreground text-sm font-semibold hover:scale-105 transition"
  style={{ background: "var(--gradient-hero)" }}
>
  <ShoppingBag className="w-4 h-4" />
  Shop Now
</Link>
      </div>
    </header>
  );
}

export default Header;