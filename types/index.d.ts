import { PaymentType, Gender } from "./enum";

export type Travel = {
  id?: number;
  name: string;
  departure_date: string;
  return_date: string;
  picture: string;
  description: string;
  price: number;
  rating?: number;
};

export type Customer = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: Gender;
};

export type Booking = {
  id?: number;
  travel?: Travel | null;
  customer?: Customer;
  paymentType?: PaymentType;
  notes?: string;
};
