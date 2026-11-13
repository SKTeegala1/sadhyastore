import { Link } from "@tanstack/react-router";
import { NAV_ITEMS } from "@/types/NavigationItems";

export default function HeaderNav() {
  return (
    <nav className="hidden xl:flex items-center gap-8 text-sm font-medium">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          hash={item.hash}
          className="hover:text-primary transition"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
