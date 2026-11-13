export type AddressDetails = {
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
};
export type Address = { id: string; details: AddressDetails };
export type Order = {
  id: string;
  customerEmail: string;
  createdAt: string;
  status: string;
  total: number;
  paymentMethod: string;
  address: AddressDetails;
  items: {
    productId: string;
    name: string;
    image: string;
    weight: string;
    quantity: number;
    unitPrice: number;
  }[];
};
export const money = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);
