export const LiftCategories = ["Squat", "Floor Pull", "Horizontal Press", "Vertical Press", "Pull-up / Row"] as const;
export type LiftCategory = typeof LiftCategories[number];

/** List of supported lifts. */
export const Lifts = ["Back Squat", "Front Squat", "Deadlift", "Sumo Deadlift", "Power Clean", "Bench Press", "Incline Bench Press", "Dip", "Overhead Press", "Push Press", "Snatch Press", "Chin-up", "Pull-up", "Pendlay Row"] as const;
/** Type for a lift. */
export type Lift = typeof Lifts[number];

export const LiftCategoryMap : Record<LiftCategory, Lift[]> = {
    "Squat": ["Back Squat", "Front Squat"],
    "Floor Pull": ["Deadlift","Sumo Deadlift","Power Clean"],
    "Horizontal Press": ["Bench Press","Incline Bench Press", "Dip"],
    "Vertical Press": ["Overhead Press", "Push Press", "Snatch Press"],
    "Pull-up / Row": ["Pull-up", "Chin-up", "Pendlay Row"]
};

export function IsBodyweightLift(lift:Lift) {
    return (<Lift[]>["Dip","Pull-up","Chin-up"]).includes(lift);
}