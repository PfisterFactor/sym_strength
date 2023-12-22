<script lang="ts">
    import {
        SelectedLiftsArray,
        UserLifterInfo,
        type LiftEntry
    } from "$lib/data/LifterInformation";
    import type { Lift } from "$lib/data/Lifts";
    import { Convert } from "$lib/data/MeasurementSystem";
    import ButtonMenu from "$lib/utility/SaveButtonCard.svelte";
    import { NumberInput, Select, SelectItem, TooltipIcon } from "carbon-components-svelte";
    import { Help } from "carbon-icons-svelte";
    import { v4 as uuidv4 } from 'uuid';

    export let lift: Lift;
    let Weight: number | null = null;
    let Reps: number | null = null;
    let saveStatus: "NONE" | "SAVED" | "UPDATING" = "NONE";
    $: {
        saveStatus = Weight != null && Reps != null ? "UPDATING" : "NONE";
    }

    function RecordLiftEntry() {
        if (lift == null) return;
        const newLiftEntry: LiftEntry = {
            Lift: lift,
            ID: uuidv4(),
            Date: new Date(),
            MeasurementSystem: $UserLifterInfo.Units,
            Reps: Reps!,
            Weight: Weight!,
            Bodyweight: Convert(
                $UserLifterInfo.BodyWeight.MeasurementSystem,
                $UserLifterInfo.Units,
                $UserLifterInfo.BodyWeight.Weight!
            )
        };
        $UserLifterInfo.LiftHistory[lift] = [...$UserLifterInfo.LiftHistory[lift], newLiftEntry];
        Weight = null;
        Reps = null;
        saveStatus = "SAVED";
    }
</script>

<form>
    <div class="section-header">
        <h4>Enter your best recent set.</h4>
        <TooltipIcon direction="left" icon={Help} type="button" class="tooltip-button">
            <span slot="tooltipText">
                For each lift you train, enter your most difficult set that you have completed
                recently. Each set should be 10 or fewer reps.
            </span>
        </TooltipIcon>
    </div>
    <!-- Maybe show best and most recent of lift here for comparison -->
    <div class="record-container">
        <Select bind:selected={lift}>
            {#each $SelectedLiftsArray as lift}
                <SelectItem text={lift} value={lift} />
            {/each}
        </Select>

        <NumberInput
            label="Weight"
            min={0}
            max={999}
            bind:value={Weight}
            invalidText="Invalid value"
            placeholder="XXX lbs"
            allowEmpty={true}
        />
        <NumberInput
            label="Reps"
            min={0}
            max={99}
            bind:value={Reps}
            invalidText="Invalid value"
            placeholder="XXX reps"
            allowEmpty={true}
        />
    </div>
    <!-- Add calculated one rep max display -->
    <!-- Show lift history here -->
    <ButtonMenu
        text="Add"
        enabled={Weight != null && Reps != null}
        status={saveStatus}
        on:click={() => RecordLiftEntry()}
    />
</form>

<style>
    .record-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
    }
</style>
