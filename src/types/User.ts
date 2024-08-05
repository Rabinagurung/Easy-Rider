type Role = 'rider' | 'driver';
export type User = {
  name: string;
  email: string;
  roles: Role[];
  phone: string;
  activeBooking: null;
  pastBookings: never[];
};
