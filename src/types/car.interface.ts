
export interface Car {
    id: number;
    pictureUrl: string;
    brand: string;
    model: string;
    pricePerDay: number;
    pricePerKm: number;
    availability: {
      maxDuration: number;
      maxDistance: number;
    };
  }
  
  export interface CarListProps {
  distance: number;
  duration: number;
}