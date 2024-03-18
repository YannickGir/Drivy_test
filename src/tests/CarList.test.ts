import {
  formatPriceFromCents,
  calculateTotalPriceDuration,
  calculateTotalPriceDistance,
  calculatePercentagePromotion,
} from "../utils/priceUtils";

describe("CarList functions", () => {
  describe("calculatePercentagePromotion", () => {
    it("should calculation the percentage of promotion with (totalPricePromoted, totalRowPrice)", () => {
      expect(calculatePercentagePromotion(200, 400)).toBe(50);
    });
    it("should manage calculation of the percentage of promotion when totalPricePromoted is undefined", () => {
      expect(calculatePercentagePromotion(undefined, 400)).toBe(0);
    });
    it("should manage calculation of the percentage of promotion when totalRowPrice is undefined", () => {
      expect(calculatePercentagePromotion(200, undefined)).toBe(100);
    });
  });

  describe("formatPrice", () => {
    it("should format price when defined without cents in euros", () => {
      expect(formatPriceFromCents(500)).toBe("5");
    });

    it("should format price when defined with cents in euros", () => {
      expect(formatPriceFromCents(520)).toBe("5.20");
    });

    it("should handle undefined price", () => {
      expect(formatPriceFromCents(undefined)).toBe("0");
    });
  });

  describe("calculateTotalPriceDuration", () => {
    it("should calculate total price of duration without and with promotion when (duration, pricePerDay) are defined", () => {
      expect(calculateTotalPriceDuration(5, 3)).toStrictEqual({
        totalRowPriceDuration: 15,
        totalPromotedPriceDuration: 13.2,
      });
    });
  });

  it("should manage total price when only duration is defined", () => {
    expect(calculateTotalPriceDuration(undefined, 3)).toStrictEqual({
      totalRowPriceDuration: 0,
      totalPromotedPriceDuration: 0,
    });
  });

  it("should manage total price when only price is defined", () => {
    expect(calculateTotalPriceDuration(5, undefined)).toStrictEqual({
      totalRowPriceDuration: 0,
      totalPromotedPriceDuration: 0,
    });
  });

  describe("calculateTotalPriceDistance", () => {
    it("should calculate total price of distance without and with promotion when (promotion, pricePerKm, distance) are defined", () => {
      expect(calculateTotalPriceDistance(0.75, 0.3, 100)).toStrictEqual({
        totalRowPriceDistance: 30,
        totalPromotedPriceDistance: 22.5,
      });
    });
  });

  it("should manage calculation of total price of distance without and with promotion when promotion is undefined", () => {
    expect(calculateTotalPriceDistance(undefined, 0.3, 100)).toStrictEqual({
      totalRowPriceDistance: 30,
      totalPromotedPriceDistance: 30,
    });
});

it("should manage calculation of total price of distance without and with promotion when pricePerKm is undefined", () => {
    expect(calculateTotalPriceDistance(0.75, undefined, 100)).toStrictEqual({
      totalRowPriceDistance: 0,
      totalPromotedPriceDistance: 0,
    });
});

it("should manage calculation of total price of distance without and with promotion when distance is undefined", () => {
    expect(calculateTotalPriceDistance(0.75, 0.3, undefined)).toStrictEqual({
      totalRowPriceDistance: 0,
      totalPromotedPriceDistance: 0,
    });
});

});
