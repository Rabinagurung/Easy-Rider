import { Specification } from './Specificaiton';

export interface CarFeature {
  id: string;
  name: string;
  value: string;
}

export const carFeatures: CarFeature[] = [
  { id: '1', name: 'Model', value: 'GT5000' },
  { id: '2', name: 'Capacity', value: '760hp' },
  { id: '3', name: 'Seats', value: '4' },
  { id: '4', name: 'Fuel', value: 'Octane' },
  { id: '5', name: 'Transmission', value: 'Automatic' }
];

export interface Vehicle extends CarFeature {
  id: string;
  name: string;
  details: string;
  distance: string;
  image: string;
  specifications: Specification[];
  features: CarFeature[];
}
