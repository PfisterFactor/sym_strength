import { OneRepMaxCalculator } from "../lib/data/OneRepMaxCalculator";

describe("OneRepMaxCalculator", () => {
    // Calculated for weight 100 and reps 8
    const nRepMaxes = [
        null,
        127,
        121,
        117,
        113,
        109,
        106,
        102,
        100,
        97,
        94
    ];
    test("should calculate one rep max correctly", () => {
        let oneRepMax = OneRepMaxCalculator.CalculateOneRepMax(100,8);
        expect(oneRepMax).toBeCloseTo(127.67);
    });
    for (let n = 1; n <= 10; n++ ) {
        test(`should calculate ${n} rep max correctly`, () => {
            let nRepMax = OneRepMaxCalculator.CalculateNRepMax(n,100,8);
            expect(Math.floor(nRepMax)).toBeCloseTo(nRepMaxes[n]!);
        });
    }
    test("NRepMax and OneRepMax should be the same for n=1", () => {
        const randomWeight = Math.random()*99 + 1;
        const randomReps = Math.random()*19 + 1;
        let oneRepMax = OneRepMaxCalculator.CalculateOneRepMax(randomWeight,randomReps);
        let nRepMax = OneRepMaxCalculator.CalculateNRepMax(1,randomWeight,randomReps);
        expect(nRepMax).toBeCloseTo(oneRepMax);
    })
    
})