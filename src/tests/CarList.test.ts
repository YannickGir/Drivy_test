import { formatPrice, calculateTotalPrice } from "../utils/priceUtils";

describe('CarList functions', () => {
  describe('formatPrice', () => {
    it('should format price when defined', () => {
      expect(formatPrice(500)).toBe(5);
    });

    it('should handle undefined price', () => {
      expect(formatPrice(undefined)).toBe(0);
    });
  });

  describe('calculateTotalPrice', () => {
    it('should calculate total price when all prices are defined', () => {
      expect(calculateTotalPrice(200, 10, 100, 300)).toBe(320);
    });

    it('should handle undefined pricePerDay', () => {
      expect(calculateTotalPrice(undefined, 10, 100, 300)).toBe(300);
    });

    it('should handle undefined pricePerKm', () => {
      expect(calculateTotalPrice(200, 10, undefined, 300)).toBe(20);
    });

    it('should handle all prices being undefined', () => {
      expect(calculateTotalPrice(undefined, 10, undefined, 300)).toBe(0);
    });
  });
});
