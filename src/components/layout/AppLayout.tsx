import { useRouterState } from "@tanstack/react-router";
import WhatsAppHelp from "../WhatsAppHelp";
import type { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import FloatingCart from "../FloatingCart";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  const isAdmin = useRouterState({
    select: (state) => state.location.pathname.startsWith("/admin"),
  });
  return (
    <>
      <Header />

      <main className="min-w-0">{children}</main>

      <Footer />

      {!isAdmin && (
        <>
          <WhatsAppHelp />
          <FloatingCart />
        </>
      )}
    </>
  );
}
