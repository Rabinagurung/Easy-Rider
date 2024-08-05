export type Address = {
  type: 'origin' | 'destination';
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};
