export interface NavItem {
  label: string;
  to: "/";
  hash?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Shop",
    to: "/",
    hash: "shop",
  },
  {
    label: "Categories",
    to: "/",
    hash: "categories",
  },
  {
    label: "Why Us",
    to: "/",
    hash: "why",
  },
  {
    label: "Contact",
    to: "/",
    hash: "contact",
  },
];