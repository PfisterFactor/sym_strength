import { persisted } from "svelte-local-storage-store";
import { derived, type Readable, type Subscriber, type Unsubscriber, type Updater, type Writable } from "svelte/store";
import { type MeasurementSystem, type MeasurementSystemUnit, MeasurementSystemUnits, MeasurementSystems } from "./MeasurementSystem";
import sortBy from "just-sort-by";
import { OneRepMaxCalculator } from "./OneRepMaxCalculator";
import { type Lift, Lifts } from "./Lifts";

/**
 * Interface for a lift entry.
 */
export interface LiftEntry {
    /** The lift. */
    Lift: string,
    /** Unique ID for this lift entry */
    ID: string,
    /** The date of the lift. */
    Date: Date,
    /** The measurement system used for the lift. */
    MeasurementSystem: MeasurementSystem,
    /** The weight lifted. */
    Weight: number,
    /** The number of repetitions. */
    Reps: number,
    /** Bodyweight at time of recording */
    Bodyweight: number,
}

export type LiftHistory = Record<Lift, LiftEntry[]>;
/**
 * Interface for lifter information.
 */
export interface LifterInfo {
    /** The lifter's preferred units. */
    Units: MeasurementSystem,
    /** The rounding preference for the lifter's lifts. */
    RoundTo: 1 | 2.5 | 5 | 10,
    /** The lifter's sex. */
    Sex: "Male" | "Female",
    /**
     * The lifter's body weight with measurement system
     * or null if not provided.
     */
    BodyWeight: {
        Weight: number | null,
        MeasurementSystem: MeasurementSystem
    },
    /** The lifter's age or null if not provided. */
    Age: number | null,
    /** The lifter's selected lifts. */
    SelectedLifts: Record<Lift, boolean>,
    /** The lifter's lift history. */
    LiftHistory: LiftHistory
}

/** Svelte writable store containing the lifter's information. */
export const UserLifterInfo: Writable<LifterInfo> = persisted("LifterInformation", {
    Units: "Imperial",
    RoundTo: 1,
    Sex: "Male",
    BodyWeight: {
        Weight: null,
        MeasurementSystem: "Imperial",
    },
    Age: null,
    SelectedLifts: Lifts.reduce((acc, l) => ({ ...acc, [l]: false }), {}),
    LiftHistory: Lifts.reduce((acc, l) => ({ ...acc, [l]: [] }), {})
}, {
    serializer: {
        "stringify": JSON.stringify,
        "parse": (t) => JSON.parse(t, (name, value) => {
            if (typeof value === "string" && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value)) {
                return new Date(value);
            }
            return value;
        })
    }
})
/**
 * The user's selected unit suffix
 */
export const UnitSuffix: Readable<MeasurementSystemUnit> = derived(UserLifterInfo, (l) => MeasurementSystemUnits[MeasurementSystems.indexOf(l.Units)]);

export const SelectedLiftsArray: Readable<Lift[]> = derived(UserLifterInfo, (info) => Object.keys(info.SelectedLifts).filter((k: string) => info.SelectedLifts?.[k as Lift] == true) as Lift[]);

export function GetMostRecentLiftEntry(history: LiftHistory, lift: Lift): LiftEntry | null {
    if (history[lift].length == 0) return null;
    return sortBy(history[lift], (e) => e.Date)[history[lift].length - 1];
}

export function GetBestLiftEntry(history: LiftHistory, lift: Lift): LiftEntry | null {
    if (history[lift].length == 0) return null;
    return sortBy(history[lift], (e) => OneRepMaxCalculator.CalculateOneRepMax(e.Weight, e.Reps))[history[lift].length - 1];
}

export function GetMostRecentLifts(history: LiftHistory): Partial<Record<Lift, LiftEntry>> {
    return Lifts
    .reduce((acc,l) => ({...acc, [l]: GetMostRecentLiftEntry(history,l as Lift)}), {});
}

export function GetBestLifts(history: LiftHistory): Partial<Record<Lift, LiftEntry>> {
    return Lifts
    .reduce((acc,l) => ({...acc, [l]: GetBestLiftEntry(history,l as Lift)}), {});
}

export function GetLiftEntry(history: LiftHistory, liftID: string): LiftEntry | null {
    const allLifts: LiftEntry[] = Object.keys(history).flatMap(lift => {
        return history[lift as Lift];
    });
    return allLifts.find(entry => entry.ID === liftID) ?? null;
}

export function SetLiftEntry(history: LiftHistory, entry: LiftEntry): boolean {
    const idx = history[entry.Lift as Lift].findIndex(l => l.ID == entry.ID);
    if (idx == -1) return false;
    history[entry.Lift as Lift][idx] = entry;
    return true;
}