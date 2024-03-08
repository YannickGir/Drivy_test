const formatPriceFromCentToEuros = (price?: number) => (price ? price / 100 : 0);
const formatToString = (price?:number) => (price.toFixed(2).endsWith('.00') ? price.toFixed(2).slice(0, -3) : price.toFixed(2))
const CalculPromotionOnPrice = (price: number, numberOfDays: number) => {
  let percentage: string;
  let discount: number;

  if (numberOfDays > 1 && numberOfDays < 5) {
    percentage = "10%";
    discount = 0.9;
  } else if (numberOfDays > 4 && numberOfDays < 11) {
    percentage = "30%";
    discount = 0.7;
  } else if (numberOfDays > 10) {
    percentage = "50%";
    discount = 0.5;
  } else {
    return { price };
  }

  let pricepromoted = price * discount
  return { pricepromoted, percentage };
};

const calculateTotalPrice = (
  pricePerDay?: number,
  duration?: number,
  pricePerKm?: number,
  distance?: number
) => {
  let pricePerDayFormated: number = formatPriceFromCentToEuros(pricePerDay);
  let pricePerKmFormated: number = formatPriceFromCentToEuros(pricePerKm);
  let totalPriceDays = pricePerDayFormated * duration;
  let totalPriceKms = pricePerKmFormated * distance;
  let totalPrice: number;

  if (!pricePerDay && pricePerKm) {
    totalPrice = totalPriceKms;
  } else if (!pricePerKm && pricePerDay) {
    totalPrice = totalPriceDays;
  } else if (!pricePerKm && !pricePerDay) {
    totalPrice = 0;
  } else {
    totalPrice = totalPriceDays + totalPriceKms;
  }
  return {
    currentPrice: totalPrice,
    pricePromoted: CalculPromotionOnPrice(totalPrice, duration),
  };
};

export {formatToString, formatPriceFromCentToEuros, calculateTotalPrice };
