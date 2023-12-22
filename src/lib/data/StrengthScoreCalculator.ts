import type { Lift } from "./Lifts";
import { Convert, type MeasurementSystem } from "./MeasurementSystem";
import { WilksScoreCalculator } from "./WilksScoreCalculator";

const StrengthLevelCutoffs: number[] = [30, 45, 60, 75, 87.5, 100, 112.5, 125];
export const StrengthLevels = ["Subpar", "Untrained", "Novice", "Intermediate", "Proficient", "Advanced", "Exceptional", "Elite", "World Class"] as const;
export type StrengthLevel = typeof StrengthLevels[number];


export function GetStrengthLevel(strengthScore: number): StrengthLevel {
    strengthScore = parseFloat(strengthScore.toFixed(1));
    return StrengthLevels.find((level, idx) => {
        let upperBin = StrengthLevelCutoffs[idx] ?? Number.MAX_SAFE_INTEGER;
        if (strengthScore < upperBin) return true;
    }) ?? StrengthLevels[StrengthLevels.length - 1];
}

export class StrengthScoreCalculator {
    public static CalculatePercentOfPowerLiftingTotal(units: MeasurementSystem, sex: "Male" | "Female", bodyweight: number, exercise: Lift, liftedWeight: number): number {
        if (sex === "Male" && exercise === "Deadlift")
            return 0.396825;
        if (sex === "Female" && exercise === "Deadlift")
            return 0.414938;
        if (sex === "Male" && exercise === "Back Squat")
            return 0.87 * this.CalculatePercentOfPowerLiftingTotal(units, "Male", bodyweight, "Deadlift", liftedWeight);
        if (sex === "Female" && exercise === "Back Squat")
            return 0.84 * this.CalculatePercentOfPowerLiftingTotal(units, "Female", bodyweight, "Deadlift", liftedWeight);
        if (sex === "Male" && exercise === "Bench Press")
            return 0.65 * this.CalculatePercentOfPowerLiftingTotal(units, "Male", bodyweight, "Deadlift", liftedWeight);
        if (sex === "Female" && exercise === "Bench Press")
            return 0.57 * this.CalculatePercentOfPowerLiftingTotal(units, "Female", bodyweight, "Deadlift", liftedWeight);
        if (exercise === "Sumo Deadlift")
            return this.CalculatePercentOfPowerLiftingTotal(units, sex, bodyweight, "Deadlift", liftedWeight);
        if (exercise === "Power Clean")
            return 0.56 * this.CalculatePercentOfPowerLiftingTotal(units, sex, bodyweight, "Deadlift", liftedWeight);
        if (exercise === "Front Squat")
            return 0.8 * this.CalculatePercentOfPowerLiftingTotal(units, sex, bodyweight, "Back Squat", liftedWeight);
        if (exercise === "Incline Bench Press")
            return 0.82 * this.CalculatePercentOfPowerLiftingTotal(units, sex, bodyweight, "Bench Press", liftedWeight);
        if (sex === "Male" && exercise === "Dip") {
            const weightDifference = Convert(units, "Imperial", liftedWeight - bodyweight);
            return 1.68064e-10 * Math.pow(weightDifference, 4) - 1.2946e-7 * Math.pow(weightDifference, 3) + 371905e-10 * Math.pow(weightDifference, 2) - 0.00499168 * weightDifference + 0.566576;
        }
        if (sex === "Female" && exercise === "Dip") {
            const weightDifference = Convert(units, "Imperial", liftedWeight - bodyweight);
            return 8.249e-10 * Math.pow(weightDifference, 4) - 4.01956e-7 * Math.pow(weightDifference, 3) + 622122e-10 * Math.pow(weightDifference, 2) - 0.00431442 * weightDifference + 0.37562;
        }
        if (exercise === "Overhead Press")
            return 0.65 * this.CalculatePercentOfPowerLiftingTotal(units, sex, bodyweight, "Bench Press", liftedWeight);
        if (exercise === "Push Press")
            return 1.33 * this.CalculatePercentOfPowerLiftingTotal(units, sex, bodyweight, "Overhead Press", liftedWeight);
        if (exercise === "Snatch Press")
            return 0.8 * this.CalculatePercentOfPowerLiftingTotal(units, sex, bodyweight, "Overhead Press", liftedWeight);
        if (sex === "Male" && exercise === "Chin-up") {
            let weightDifference = Convert(units, "Imperial", liftedWeight - bodyweight);
            return 4.01897e-10 * Math.pow(weightDifference, 4) - 2.34536e-7 * Math.pow(weightDifference, 3) + 502252e-10 * Math.pow(weightDifference, 2) - 0.00502633 * weightDifference + 0.459545;
        }
        if (sex === "Female" && exercise === "Chin-up") {
            let weightDifference = Convert(units, "Imperial", liftedWeight - bodyweight);
            return 1.66589e-9 * Math.pow(weightDifference, 4) - 5.1621e-7 * Math.pow(weightDifference, 3) + 54088e-9 * Math.pow(weightDifference, 2) - 0.00281674 * weightDifference + 0.302005;
        }
        if (exercise === "Pull-up")
            return 0.95 * this.CalculatePercentOfPowerLiftingTotal(units, sex, bodyweight, "Chin-up", liftedWeight);
        if (exercise === "Pendlay Row")
            return 0.53 * this.CalculatePercentOfPowerLiftingTotal(units, sex, bodyweight, "Deadlift", liftedWeight);
        return 1;
    }
    public static CalculateExpectedPowerliftingTotal(units: MeasurementSystem, sex: "Male" | "Female", bodyweight: number, exercise: Lift, liftedWeight: number): number {
        return liftedWeight / this.CalculatePercentOfPowerLiftingTotal(units, sex, bodyweight, exercise, liftedWeight);
    }
    public static CalculateExpectedWilks(units: MeasurementSystem, sex: "Male" | "Female", bodyweight: number, exercise: Lift, liftedWeight: number) {
        return WilksScoreCalculator.CalculateWilksScore(sex, units, bodyweight, this.CalculateExpectedPowerliftingTotal(units, sex, bodyweight, exercise, liftedWeight));
    }
    public static CalculateStrengthScoreFromWilks(wilks: number, age?: number) {
        // Set the default strength coefficient to 1
        var strengthCoefficient = 1;

        // Adjust the strength coefficient based on age if it is a valid number
        if (age != null) {
            if (age < 23) {
                strengthCoefficient = 0.0038961 * Math.pow(age, 2) - 0.166926 * age + 2.80303;
            } else if (age > 40) {
                strengthCoefficient = (467683e-9) * Math.pow(age, 2) - 0.0299717 * age + 1.45454;
            }
        }

        // Calculate and return the strength score
        return wilks * strengthCoefficient / 4;
    }
    public static CalculateSingleLiftStrengthScore(units: MeasurementSystem, sex: "Male" | "Female", bodyweight: number, exercise: Lift, liftedWeight: number, age?: number) {
        return this.CalculateStrengthScoreFromWilks(this.CalculateExpectedWilks(units, sex, bodyweight, exercise, liftedWeight), age);
    }
}

