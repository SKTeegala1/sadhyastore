import WhatsAppHelp from "../WhatsAppHelp";
import type { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import FloatingCart from "../FloatingCart";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />

      <WhatsAppHelp />
      <FloatingCart />
    </>
  );
}
