import { Car } from "../types/car.interface";

interface CarListProps {
  cars: Car[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => {
  const formatPrice = (price) => (price / 100).toFixed(2);
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
                  Price per day: {formatPrice(car.pricePerDay)} € | Price per
                  km: {car.pricePerKm} €
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
