import { ShoppingBag, Sparkles, Truck, Leaf, ShieldCheck, LogOut } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

function Footer() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isHome = pathname === "/";

  const getNavLink = (section: string) => {
    return isHome ? `#${section}` : `/#${section}`;
  };

  return (
    <footer id="contact" className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full grid place-items-center text-primary-foreground font-display font-bold"
              style={{ background: "var(--gradient-hero)" }}
            >
              S
            </div>
            <div>
              <div className="font-display text-xl font-bold text-secondary">Sadhya Snak Box</div>
              <div className="text-[10px] tracking-widest text-muted-foreground uppercase">
                Tradition · Nutrition
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 max-w-xs">
            Premium dry fruits, nuts & snack boxes handcrafted for every celebration.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold text-secondary mb-3">Order via WhatsApp</h4>
          <a
            href="https://wa.me/919666585143"
            target="_blank"
            rel="noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            +91 96665 85143
          </a>
          <p className="text-sm text-muted-foreground mt-2">
            Message us to place your order or ask for custom hampers.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold text-secondary mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={getNavLink("shop")} className="hover:text-primary">
                Shop
              </a>
            </li>
            <li>
              <a href={getNavLink("categories")} className="hover:text-primary">
                Categories
              </a>
            </li>
            <li>
              <a href={getNavLink("why")} className="hover:text-primary">
                Why Sadhya
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sadhya Snak Box. Made with love.
      </div>
    </footer>
  );
}
export default Footer;
