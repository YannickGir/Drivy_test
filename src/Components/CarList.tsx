import { Car } from "../types/car.interface";
import { formatPrice, calculateTotalPrice } from "../utils/priceUtils";

interface CarListProps {
  cars: Car[];
  distance: number;
  duration: number;
}

const CarList: React.FC<CarListProps> = ({ cars, distance, duration }) => {
  return (
    <>
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cars.map((car) => (
            <div
              key={car.id}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img
                className="w-full"
                src={car.pictureUrl}
                alt={`${car.brand} ${car.model}`}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 flex items-center justify-center">{`${car.brand} ${car.model}`}</div>
                <p className="text-gray-700 text-base flex items-center justify-center">
                  Prix par jour: {formatPrice(car.pricePerDay)} € <br />
                  Prix par km: {formatPrice(car.pricePerKm)} € <br />
                  Prix à payer: {calculateTotalPrice(
                    car.pricePerDay,
                    duration,
                    car.pricePerKm,
                    distance
                  )}{" "}
                  €
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No cars available</p>
      )}
    </>
  );
};
export default CarList;
