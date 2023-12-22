import { Convert } from "../lib/data/MeasurementSystem";

describe("Convert", () => {
    it("should convert from Imperial to Metric", () => {
        expect(Convert("Imperial", "Metric", 10)).toBeCloseTo(4.54, 2);
    });

    it("should convert from Metric to Imperial", () => {
        expect(Convert("Metric", "Imperial", 10)).toBeCloseTo(22.05, 2);
    });

    it("should return the same weight if from and to systems are the same", () => {
        expect(Convert("Imperial", "Imperial", 10)).toBe(10);
        expect(Convert("Metric", "Metric", 10)).toBe(10);
    });
});
