<script lang="ts">
	import { onMount } from 'svelte';
    import mapObject, { mapObjectSkip } from "map-obj";
    import { UserLifterInfo, type LiftEntry } from "$lib/data/LifterInformation";
    import { type Lift, type LiftCategory, LiftCategoryMap, IsBodyweightLift } from "$lib/data/Lifts";
    import { OneRepMaxCalculator } from "$lib/data/OneRepMaxCalculator";
    import { StrengthScoreCalculator } from "$lib/data/StrengthScoreCalculator";
    import ScoreCard from "./ScoreCard.svelte";

    export let LiftData: Partial<Record<Lift, LiftEntry>>;

    let LiftScores: Partial<Record<Lift, number>> = mapObject(
        LiftData,
        (lift: Lift, data: LiftEntry | undefined) => {
            if (data == null) return mapObjectSkip;
            const oneRepMax = OneRepMaxCalculator.CalculateOneRepMax(data.Weight + (IsBodyweightLift(lift) ? data.Bodyweight : 0), data.Reps);
            const strengthScore = StrengthScoreCalculator.CalculateSingleLiftStrengthScore(
                data.MeasurementSystem,
                $UserLifterInfo.Sex,
                $UserLifterInfo.BodyWeight?.Weight!,
                lift as Lift,
                oneRepMax
            );
            return [lift, strengthScore];
        }
    );

    let LiftCategoryScores: Partial<Record<LiftCategory, number>> = mapObject(
        LiftCategoryMap,
        (liftCategory: LiftCategory, liftsInCategory: Lift[]) => {
            const max = Math.max(...liftsInCategory.map((lift) => LiftScores[lift] ?? -1));
            if (max == -1) return mapObjectSkip;
            return [liftCategory, max];
        }
    );
    onMount(() => {
        console.log(LiftScores);
        console.log(LiftCategoryScores);
    })
</script>

<div>
    <ScoreCard {LiftCategoryScores} />
</div>
