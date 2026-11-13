import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { api, message } from "@/lib/api";
import type { Order } from "@/lib/orders";
import RequireAccount from "@/components/account/RequireAccount";
import AddressBook from "@/components/account/AddressBook";
import OrderList from "@/components/account/OrderList";
import { Panel, ErrorNotice } from "@/components/account/StoreForms";
export const Route = createFileRoute("/account")({
  component: () => (
    <RequireAccount>
      <Account />
    </RequireAccount>
  ),
});
function Account() {
  const { user } = useAuth();
  const {
    data = [],
    error,
    isPending,
  } = useQuery({ queryKey: ["orders", user?.id], queryFn: () => api<Order[]>("/orders") });
  return (
    <Panel title={`Hello, ${user?.fullName}`} subtitle="Your delivery addresses and order history.">
      <h2 className="mb-4 text-xl font-semibold">Saved addresses</h2>
      <AddressBook />
      <h2 id="orders" className="mb-4 mt-10 scroll-mt-28 text-xl font-semibold">
        Your orders
      </h2>
      <ErrorNotice text={error ? message(error) : ""} />
      {isPending ? <p>Loading orders…</p> : <OrderList orders={data} />}
    </Panel>
  );
}
