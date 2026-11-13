import { Link } from "@tanstack/react-router";
import { NAV_ITEMS } from "@/types/NavigationItems";

export default function HeaderNav() {
  return (
    <nav className="hidden xl:flex shrink-0 items-center gap-4 text-sm font-medium">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          hash={item.hash}
          className="inline-flex min-h-11 items-center whitespace-nowrap hover:text-primary transition"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
