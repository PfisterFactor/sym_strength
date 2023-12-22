import { WilksScoreCalculator } from "../lib/data/WilksScoreCalculator"
describe("WilksScoreCalculator", () => {
    beforeAll(() => {
        WilksScoreCalculator.VERSION = "2020";
    });
    test("should calculate coefficient correctly", () => {
        let maleCoeff = WilksScoreCalculator.CalculateWilksCoefficient("Male", "Metric", 100);
        expect(maleCoeff).toBeCloseTo(0.73);
    });
    test("should calculate correct in imperial system", () => {
        let maleScore = WilksScoreCalculator.CalculateWilksScore("Male","Imperial",100,100);
        expect(maleScore).toBeCloseTo(56.61);
        let femaleScore = WilksScoreCalculator.CalculateWilksScore("Female","Imperial",100,100);
        expect(femaleScore).toBeCloseTo(74.41);
    });
    test("should calculate correct in metric system", () => {
        let maleScore = WilksScoreCalculator.CalculateWilksScore("Male","Metric",100,100);
        expect(maleScore).toBeCloseTo(72.94);
        let femaleScore = WilksScoreCalculator.CalculateWilksScore("Female","Metric",100,100);
        expect(femaleScore).toBeCloseTo(105.25)
    });
})
