import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground mb-8">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-primary transition-colors"
      >
        <Home className="h-4 w-4" />
        Home
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />

          {item.to ? (
            <Link
              to={item.to}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-secondary">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}