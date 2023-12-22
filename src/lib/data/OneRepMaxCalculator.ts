
export class OneRepMaxCalculator {
    public static CalculateOneRepMax(weight: number, reps: number): number {
        if (weight <= 0) throw new Error("Weight cannot be less than or equal to 0");
        if (reps <= 0) throw new Error("Reps cannot be less than or equal to 0");
        let a = 0.4880;
        let b = 0.538;
        let c = -0.075;
        return weight * 1/(a + b*Math.exp(c*reps));
    }
    public static CalculateNRepMax(n: number, oneRepMaxWeight: number, oneRepMaxReps: number): number {
        const oneRepMax = this.CalculateOneRepMax(oneRepMaxWeight,oneRepMaxReps);
        if (n === 1) return oneRepMax;
        if (n < 1) throw new Error("n cannot be less than 1");
        if (n > 10) throw new Error("n cannot be greater than 10");
        return oneRepMax * (48.8 + 53.8 * Math.exp(-.075 * n)) / 100;
    }
}
