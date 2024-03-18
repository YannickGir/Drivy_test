import { useEffect, useState } from "react";
import { Car, CarListProps } from "../types/car.interface";
import {
  formatPriceWithZero,
  roundedNumber,
  formatPriceFromCents,
  calculatePercentagePromotion,
  calculateTotalPriceDistance,
  calculateTotalPriceDuration,
} from "../utils/priceUtils";

const CarList: React.FC<CarListProps> = ({ distance, duration }) => {
  const [cars, setCars] = useState<Array<Car>>([]);

  const displayTotalPriceAndPromo = (
    pricePerDay: number,
    duration: number,
    pricePerKm: number,
    distance: number
  ) => {
    const pricePerDayFormated = formatPriceFromCents(pricePerDay);
    const pricePerKmFormated = formatPriceFromCents(pricePerKm);
    const totalPriceDuration = calculateTotalPriceDuration(
      duration,
      pricePerDayFormated
    );
    const percentage = roundedNumber(
      100 -
        calculatePercentagePromotion(
          totalPriceDuration.totalPromotedPriceDuration,
          totalPriceDuration.totalRowPriceDuration
        ),
      2
    );
    const totalPriceDistance = calculateTotalPriceDistance(
      percentage,
      pricePerKmFormated,
      distance
    );
    const totalPriceDistancePromoted =
      (totalPriceDistance.totalRowPriceDistance * percentage) / 100;
    const totalRowPrice =
      totalPriceDuration.totalRowPriceDuration +
      totalPriceDistance.totalRowPriceDistance;
    const totalPricePromoted =
      totalRowPrice - (totalRowPrice * percentage) / 100 ?? 1;

    if (percentage) {
      return (
        <>
          {formatPriceWithZero(totalRowPrice)} €
          <br />
          Avec promo de {percentage} % :{" "}
          {formatPriceWithZero(totalPricePromoted)} €
        </>
      );
    } else {
      return <>{formatPriceWithZero(totalRowPrice)} €</>;
    }
  };

  const PORT = process.env.PORT || 3000;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:${PORT}/cars?duration=${duration}&distance=${distance}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error when trying to fetch:", error.message);
      }
    };

    fetchData();
  }, [duration, distance]);

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
                  Prix par jour : {formatPriceFromCents(car.pricePerDay)} €{" "}
                  <br />
                  Prix par km : {formatPriceFromCents(car.pricePerKm)} € <br />
                  Prix total :{" "}
                  {displayTotalPriceAndPromo(
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
