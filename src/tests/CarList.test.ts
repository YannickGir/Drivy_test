import { formatPriceFromCentToEuros, calculateTotalPrice } from "../utils/priceUtils";

describe("CarList functions", () => {
  describe("formatPrice", () => {
    it("should format price when defined", () => {
      expect(formatPriceFromCentToEuros(500)).toBe(5);
    });

    it("should handle undefined price", () => {
      expect(formatPriceFromCentToEuros(undefined)).toBe(0);
    });
  });

  describe("calculateTotalPrice", () => {
    it("should calculate total price when all prices are defined", () => {
      expect(calculateTotalPrice(200, 1, 100, 300)).toStrictEqual({"currentPrice": 302, "pricePromoted": {"price": 302}});
    });

    it("should calculate total price when all prices are defined and apply 10% promotion", () => {
      expect(calculateTotalPrice(200, 2, 100, 300)).toStrictEqual({"currentPrice": 304, "pricePromoted": {"percentage": "10%", "pricepromoted": 273.6}});
    });

    it("should calculate total price when all prices are defined and apply 30% promotion", () => {
      expect(calculateTotalPrice(200, 5, 100, 300)).toStrictEqual({"currentPrice": 310, "pricePromoted": {"percentage": "30%", "pricepromoted": 217}});
    });

    it("should calculate total price when all prices are defined and apply 50% promotion", () => {
      expect(calculateTotalPrice(200, 11, 100, 300)).toStrictEqual({"currentPrice": 322, "pricePromoted": {"percentage": "50%", "pricepromoted": 161}});
    });

    it("should handle undefined pricePerDay", () => {
      expect(calculateTotalPrice(undefined, 2, 100, 300)).toStrictEqual({"currentPrice": 300, "pricePromoted": {"percentage": "10%", "pricepromoted": 270}});
    });

    it("should handle undefined pricePerKm and apply 50% promotion", () => {
      expect(calculateTotalPrice(200, 11, undefined, 300)).toStrictEqual({"currentPrice": 22, "pricePromoted": {"percentage": "50%", "pricepromoted": 11}});
    });

    it("should handle all prices being undefined", () => {
      expect(calculateTotalPrice(undefined, 10, undefined, 300)).toStrictEqual({"currentPrice": 0, "pricePromoted": {"percentage": "30%", "pricepromoted": 0}});
    });
  });
});
