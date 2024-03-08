import { Car, CarListProps } from "../types/car.interface";
import {formatToString, formatPriceFromCentToEuros, calculateTotalPrice } from "../utils/priceUtils";

const CarList: React.FC<CarListProps> = ({ cars, distance, duration }) => {
  const displayTotalPriceAndPromo = (
    pricePerDay: number,
    duration: number,
    pricePerKm: number,
    distance: number
  ) => {
    const totalPrice = calculateTotalPrice(
      pricePerDay,
      duration,
      pricePerKm,
      distance
    );
    if (totalPrice.pricePromoted && totalPrice.pricePromoted.percentage) {
      const { pricepromoted, percentage } = totalPrice.pricePromoted;
      return (
        <>
          {formatToString(totalPrice.currentPrice)} €
          <br />
          Avec promo de {percentage} : {formatToString(pricepromoted)} €
        </>
      );
    } else {
      return <>{formatToString(totalPrice.currentPrice)} €</>;
    }
  };
  return (
    <>
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
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
                <p className="font-medium text-gray-900 text-base flex items-center justify-center">
                  Prix par jour : {formatPriceFromCentToEuros(car.pricePerDay)} € <br />
                  Prix par km : {formatPriceFromCentToEuros(car.pricePerKm)} € <br />
                  Prix total : {displayTotalPriceAndPromo(
                    car.pricePerDay,
                    duration,
                    car.pricePerKm,
                    distance
                  )}
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
