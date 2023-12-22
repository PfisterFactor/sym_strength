import { WilksScoreCalculator } from "../lib/data/WilksScoreCalculator";
import { MeasurementSystems } from "../lib/data/MeasurementSystem";
import { StrengthScoreCalculator } from "../lib/data/StrengthScoreCalculator";
import { Lifts } from "../lib/data/Lifts";

describe("StrengthScoreCalculator", () => {
    beforeAll(() => {
        WilksScoreCalculator.VERSION = "Original";
    });
    test("PercentOfPLTotal is correct", () => {
        // Expected values for 100 lb/kg bodyweight and 100 lb/kg lifted
        const expected = {
            "Imperial": {
                "Male": {
                    "Back Squat": 0.34523775,
                    "Front Squat": 0.2761902,
                    "Deadlift": 0.396825,
                    "Sumo Deadlift": 0.396825,
                    "Power Clean": 0.222222,
                    "Bench Press": 0.25793625,
                    "Incline Bench Press": 0.21150772499999998,
                    "Dip": 0.566576,
                    "Overhead Press": 0.1676585625,
                    "Push Press": 0.222985888125,
                    "Snatch Press": 0.13412685,
                    "Chin-up": 0.459545,
                    "Pull-up": 0.43656775,
                    "Pendlay Row": 0.21031725
                },
                "Female": {
                    "Back Squat": 0.34854791999999996,
                    "Front Squat": 0.27883833599999996,
                    "Deadlift": 0.414938,
                    "Sumo Deadlift": 0.414938,
                    "Power Clean": 0.23236528,
                    "Bench Press": 0.23651465999999996,
                    "Incline Bench Press": 0.19394202119999995,
                    "Dip": 0.37562,
                    "Overhead Press": 0.15373452899999998,
                    "Push Press": 0.20446692357,
                    "Snatch Press": 0.12298762319999999,
                    "Chin-up": 0.302005,
                    "Pull-up": 0.28690475,
                    "Pendlay Row": 0.21991713999999998
                }
            },
            "Metric": {
                "Male": {
                    "Back Squat": 0.34523775,
                    "Front Squat": 0.2761902,
                    "Deadlift": 0.396825,
                    "Sumo Deadlift": 0.396825,
                    "Power Clean": 0.222222,
                    "Bench Press": 0.25793625,
                    "Incline Bench Press": 0.21150772499999998,
                    "Dip": 0.566576,
                    "Overhead Press": 0.1676585625,
                    "Push Press": 0.222985888125,
                    "Snatch Press": 0.13412685,
                    "Chin-up": 0.459545,
                    "Pull-up": 0.43656775,
                    "Pendlay Row": 0.21031725
                },
                "Female": {
                    "Back Squat": 0.34854791999999996,
                    "Front Squat": 0.27883833599999996,
                    "Deadlift": 0.414938,
                    "Sumo Deadlift": 0.414938,
                    "Power Clean": 0.23236528,
                    "Bench Press": 0.23651465999999996,
                    "Incline Bench Press": 0.19394202119999995,
                    "Dip": 0.37562,
                    "Overhead Press": 0.15373452899999998,
                    "Push Press": 0.20446692357,
                    "Snatch Press": 0.12298762319999999,
                    "Chin-up": 0.302005,
                    "Pull-up": 0.28690475,
                    "Pendlay Row": 0.21991713999999998
                }
            }
        } as const;
        for (let unit of MeasurementSystems) {
            for (let sex of ["Male", "Female"] as const) {
                for (let lift of Lifts) {
                    expect(StrengthScoreCalculator.CalculatePercentOfPowerLiftingTotal(unit,sex,100,lift,100)).toBeCloseTo(expected[unit][sex][lift]);
                }
            }
        }
    })
    test("Single lift strength score is correct", () => {
        const expected = {
            "Imperial": {
                "Male": {
                    "Back Squat": 37.521596606974775,
                    "Front Squat": 46.90199575871847,
                    "Deadlift": 32.64378904806806,
                    "Sumo Deadlift": 32.64378904806806,
                    "Power Clean": 58.292480442978665,
                    "Bench Press": 50.2212139201047,
                    "Incline Bench Press": 61.24538282939598,
                    "Dip": 22.863431541398874,
                    "Overhead Press": 77.26340603093033,
                    "Push Press": 58.09278648942128,
                    "Snatch Press": 96.57925753866289,
                    "Chin-up": 28.18847248691555,
                    "Pull-up": 29.672076302016368,
                    "Pendlay Row": 61.592054807675574
                },
                "Female": {
                    "Back Squat": 44.870884371541464,
                    "Front Squat": 56.088605464426834,
                    "Deadlift": 37.69154287209483,
                    "Sumo Deadlift": 37.69154287209483,
                    "Power Clean": 67.30632655731219,
                    "Bench Press": 66.1255138106927,
                    "Incline Bench Press": 80.64087050084474,
                    "Dip": 41.63690276412674,
                    "Overhead Press": 101.731559708758,
                    "Push Press": 76.48989451786314,
                    "Snatch Press": 127.16444963594746,
                    "Chin-up": 51.7860744565861,
                    "Pull-up": 54.511657322722215,
                    "Pendlay Row": 71.11611862659402
                }
            },
            "Metric": {
                "Male": {
                    "Back Squat": 44.07028720835504,
                    "Front Squat": 55.0878590104438,
                    "Deadlift": 38.34114987126888,
                    "Sumo Deadlift": 38.34114987126888,
                    "Power Clean": 68.4663390558373,
                    "Bench Press": 58.98638441733675,
                    "Incline Bench Press": 71.9346151430936,
                    "Dip": 26.853814488552775,
                    "Overhead Press": 90.74828371897962,
                    "Push Press": 68.23179226990948,
                    "Snatch Press": 113.43535464872453,
                    "Chin-up": 33.10824140762336,
                    "Pull-up": 34.85078042907722,
                    "Pendlay Row": 72.34179220994129
                },
                "Female": {
                    "Back Squat": 59.717994927126675,
                    "Front Squat": 74.64749365890835,
                    "Deadlift": 50.1631157387864,
                    "Sumo Deadlift": 50.1631157387864,
                    "Power Clean": 89.57699239069,
                    "Bench Press": 88.00546620839721,
                    "Incline Bench Press": 107.32373927853318,
                    "Dip": 55.41393674037738,
                    "Overhead Press": 135.3930249359957,
                    "Push Press": 101.7992668691697,
                    "Snatch Press": 169.2412811699946,
                    "Chin-up": 68.92131891333108,
                    "Pull-up": 72.54875675087483,
                    "Pendlay Row": 94.64738818638943
                }
            }
        } as const;
        for (let unit of MeasurementSystems) {
            for (let sex of ["Male", "Female"] as const) {
                for (let lift of Lifts) {
                    expect(StrengthScoreCalculator.CalculateSingleLiftStrengthScore(unit,sex,100,lift,100,23)).toBeCloseTo(expected[unit][sex][lift]);
                }
            }
        }
    });

    test("Pullup score is correct", () => {
        const percentActual = StrengthScoreCalculator.CalculatePercentOfPowerLiftingTotal("Imperial","Male",220,"Pull-up",295);
        const percentExpected = 0.2649154774023437;

        expect(percentActual).toBeCloseTo(percentExpected);
    })
})