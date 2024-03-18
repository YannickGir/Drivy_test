const formatPriceFromCents = (price?: number) => {
  const numeral = require("numeral");
  function formatAmount(price: number) {
    const formattedAmount = price % 100 === 0 ? "0" : "0,0.00";
    return numeral(price / 100).format(formattedAmount);
  }
  return formatAmount(price || 0);
};

const roundedNumber = (n: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
};

const formatPriceWithZero = (price?: number) => {
  const numeral = require("numeral");
  function formatAmount(price: number) {
    const formattedAmount =
      price % 100 === 0 ? "0" : price % 1 === 0 ? "0" : "0,0.00";
    return numeral(price).format(formattedAmount);
  }
  return formatAmount(price || 0);
};

const generatePromotions = (numberOfDays: number) => {
  const safeNumberOfDays = numberOfDays ?? 0;
  return Array.from({ length: numberOfDays }, (_, index) => {
    const day = index + 1;
    if (day >= 2 && day <= 4) {
      return 0.9;
    } else if (day >= 5 && day <= 10) {
      return 0.7;
    } else if (day >= 11) {
      return 0.5;
    } else {
      return 1;
    }
  });
};

const toRound = (numberToRound: number) =>
  Math.round(numberToRound * 100) / 100;

const calculateTotalPriceDuration = (
  duration?: number,
  pricePerDay?: number
) => {
  const safeDuration = duration ?? 0;
  const safePricePerDay = pricePerDay ?? 0;
  let totalRowPriceDuration = safePricePerDay * safeDuration;
  const tabOfPromotions = generatePromotions(safeDuration);
  const totalPromotedPriceDuration = tabOfPromotions.reduce(
    (total?: number, promotion?: number) => {
      const discountedPrice = safePricePerDay * promotion;
      return toRound(total + discountedPrice);
    },
    0
  );
  return {
    totalRowPriceDuration,
    totalPromotedPriceDuration,
  };
};

const calculateTotalPriceDistance = (
  promotion?: number,
  pricePerKm?: number,
  distance?: number
) => {
  const safePromotion = promotion ?? 1;
  const safePricePerKm = pricePerKm ?? 0;
  const safeDistance = distance ?? 0;
  const totalRowPriceDistance = safePricePerKm * safeDistance;
  const totalPromotedPriceDistance = totalRowPriceDistance * safePromotion;
  return {
    totalRowPriceDistance,
    totalPromotedPriceDistance,
  };
};

const calculatePercentagePromotion = (
  totalPricePromoted?: number,
  totalRowPrice?: number
) => {
  const safeTotalPricePromoted = totalPricePromoted ?? 0;
  const safeTotalRowPrice = totalRowPrice ?? safeTotalPricePromoted;
  const percentage = (safeTotalPricePromoted / safeTotalRowPrice) * 100;
  return percentage;
};

export {
  calculateTotalPriceDuration,
  calculateTotalPriceDistance,
  formatPriceFromCents,
  calculatePercentagePromotion,
  roundedNumber,
  formatPriceWithZero,
};
