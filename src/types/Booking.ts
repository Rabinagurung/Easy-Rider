import { DocumentData } from 'firebase/firestore';
import { Address } from './Address';

export enum BookingStatus {
  Active = 'active',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface NewBooking extends DocumentData {
  userID: string;
  driverID: string;
  vehicleID: string;
  price: number;
  status: BookingStatus;
  origin: Address;
  destination: Address;
}
export interface Booking extends NewBooking {
  id: string;
}
