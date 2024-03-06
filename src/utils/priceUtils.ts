const formatPrice = (price?: number) => (price ? price / 100 : 0);

const calculateTotalPrice = (
  pricePerDay?: number,
  duration?: number,
  pricePerKm?: number,
  distance?: number
) => {
  let pricePerDayFormated: number = formatPrice(pricePerDay);
  let pricePerKmFormated: number = formatPrice(pricePerKm);
  let totalPriceDays = pricePerDayFormated * duration;
  let totalPriceKms = pricePerKmFormated * distance;
  let totalPrice: number;
  if (!pricePerDay && pricePerKm) {
    totalPrice = totalPriceKms;
    return totalPrice;
  }
  if (!pricePerKm && pricePerDay) {
    totalPrice = totalPriceDays;
    return totalPrice;
  }
  if (!pricePerKm && !pricePerDay) {
    totalPrice = 0;
    return totalPrice;
  }

  totalPrice = totalPriceDays + totalPriceKms;
  return totalPrice;
};

export { formatPrice, calculateTotalPrice };
