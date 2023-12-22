import { Convert, type MeasurementSystem } from "./MeasurementSystem";

export class WilksScoreCalculator {
    public static VERSION: "Original" | "2020" = "Original";
    private static wilksCoefficients = {
        Original: {
            Male: {
                a: -216.0475144,
                b: 16.2606339,
                c: -0.002388645,
                d: -0.00113732,
                e: 7.01863e-6,
                f: -1.291e-8
            },
            Female: {
                a: 594.31747775582,
                b: -27.23842536447,
                c: 0.82112226871,
                d: -0.00930733913,
                e: 0.00004731582,
                f: -0.00000009054
            }
        },
        2020: {
            Male: {
                a: 47.4617885411949,
                b: 8.47206137941125,
                c: 0.073694103462609,
                d: -0.00139583381094385,
                e: 7.07665973070743E-06,
                f: -1.20804336482315E-08,
            },
            Female: {
                a: -125.425539779509,
                b: 13.7121941940668,
                c: -0.0330725063103405,
                d: -0.0010504000506583,
                e: 9.38773881462799E-06,
                f: -2.3334613884954E-08
            }
        }
    } as const;
    public static CalculateWilksCoefficient(
        sex: "Male" | "Female",
        units: MeasurementSystem,
        bodyWeight: number
    ): number {
        const { a, b, c, d, e, f } = this.wilksCoefficients[this.VERSION][sex];
        const numerator = this.VERSION == "2020" ? 600 : 500;
        const x = Convert(units, "Metric", bodyWeight);
        return numerator / (
            a +
            (b * x) +
            (c * x ** 2) +
            (d * x ** 3) +
            (e * x ** 4) +
            (f * x ** 5)
        );
    }
    public static CalculateWilksScore(
        sex: "Male" | "Female",
        units: MeasurementSystem,
        bodyWeight: number,
        totalWeight: number
    ): number {
        const coefficient = this.CalculateWilksCoefficient(sex, units, bodyWeight);
        const wilksScore = coefficient * Convert(units, "Metric", totalWeight);
        return wilksScore;
    }
}
