/** Measurement systems available. */
export const MeasurementSystems = ["Imperial", "Metric"] as const;
/** Type for a measurement system. */
export type MeasurementSystem = typeof MeasurementSystems[number];

/** Units used in the measurement systems. */
export const MeasurementSystemUnits = ["lb", "kg"];
/** Type for a measurement system unit. */
export type MeasurementSystemUnit = typeof MeasurementSystemUnits[number];

export function Convert(from: MeasurementSystem, to:MeasurementSystem, weight: number ) {
    if (from == "Metric" && to == "Imperial") return weight * 2.204622622;
    else if (from == "Imperial" && to == "Metric") return weight / 2.204622622;
    return weight;
}