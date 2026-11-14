import type { ReactNode } from "react";

type ProductLayoutProps = {
  left: ReactNode;
  right: ReactNode;
};

export default function ProductLayout({ left, right }: ProductLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
      {/* Left Section */}
      <div className="min-w-0 lg:sticky lg:top-24">{left}</div>

      {/* Right Section */}
      <div className="min-w-0 space-y-6">{right}</div>
    </div>
  );
}
