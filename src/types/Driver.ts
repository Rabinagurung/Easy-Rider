export interface Driver {
  id: string;
  name: string;
  imageUrl: string;
  phone: string;
  rating: number;
  vehicle: string;
  reviews: {
    reviewer: string;
    comment: string;
    rating: number;
  }[];
}
