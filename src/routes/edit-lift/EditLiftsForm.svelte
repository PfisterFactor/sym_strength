<script lang="ts">
    import type { LiftEntry } from "$lib/data/LifterInformation";
    import {
        DatePicker,
        DatePickerInput,
        NumberInput,
        Select,
        SelectItem,
        TooltipIcon
    } from "carbon-components-svelte";
    import { Help } from "carbon-icons-svelte";
    import UpdateButtonCard from "$lib/utility/UpdateButtonCard.svelte";
    import { createEventDispatcher } from "svelte";

    export let entry: LiftEntry;
    let Weight: number | null = entry.Weight;
    let Reps: number | null = entry.Reps;
    let LiftDate: Date | null = entry.Date;
    let Bodyweight: number | null = entry.Bodyweight;

    let updateStatus: "NONE" | "UPDATING" = "NONE";
    const dispatch = createEventDispatcher();
    $: {
        updateStatus =
            Weight != entry.Weight || Reps != entry.Reps || Bodyweight != entry.Bodyweight || LiftDate?.toISOString() != entry.Date?.toISOString()
                ? "UPDATING"
                : "NONE";
    }

    function GoBackToLiftHistory(entry: LiftEntry) {
        dispatch("Navigate", {page: `/lifting-history?lift=${entry.Lift}`})
    }
    function UpdateLiftEntry(entry: LiftEntry) {
        if (Weight == null || Reps == null || LiftDate == null || Bodyweight == null) return false;
        entry.Weight = Weight;
        entry.Reps = Reps;
        entry.Date = LiftDate;
        entry.Bodyweight = Bodyweight;
        updateStatus = "NONE";
        return true;
    }
    function GetDateValue(date: Date): string {
        console.log(date);
        const year = date.getFullYear();
        let month = (date.getMonth()+1).toString().padStart(2,"0");
        let day = date.getDate().toString().padStart(2,"0");
        console.log(`${month}/${day}/${year}`);
        return `${month}/${day}/${year}`;
    }
</script>

<form>
    <div class="section-header">
        <h4>Update your recorded lift entry</h4>
        <TooltipIcon direction="left" icon={Help} type="button" class="tooltip-button">
            <span slot="tooltipText">
                For each lift you train, enter your most difficult set that you have completed
                recently. Each set should be 10 or fewer reps.
            </span>
        </TooltipIcon>
    </div>
    <!-- Maybe show best and most recent of lift here for comparison -->
    <div class="record-container">
        <Select selected={entry.Lift} disabled>
            <SelectItem text={entry.Lift} value={entry.Lift} />
        </Select>
        <DatePicker
            datePickerType="single"
            style = "width:100%;"
            value={GetDateValue(LiftDate)}
            on:change={(e) => {LiftDate = e.detail.selectedDates[0]}}
            
        >
            <DatePickerInput labelText="Date Performed" size="xl" style ="width:calc(100vw - 4rem)" type="date"  />
        </DatePicker>
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
        <NumberInput
        label="Bodyweight at the time"
        min={0}
        max={1000}
        bind:value={Bodyweight}
        invalidText="Invalid value"
        placeholder="XXX lbs"
        allowEmpty={true}
        />
    </div>
    <!-- Add calculated one rep max display -->
    <!-- Show lift history here -->
    <UpdateButtonCard
        text={["Update", "Close"]}
        status={updateStatus}
        on:click={(e) => {
            if (e.detail.button == "Update") UpdateLiftEntry(entry);
            GoBackToLiftHistory(entry);
        }
            }
    />
    <!-- <<ButtonMenu
        text="Update"
        enabled={Weight != null && Reps != null}
        status={saveStatus}
        on:click={() => UpdateLiftEntry(entry)}>
    /> -->
</form>

<style>
    .record-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
    }
</style>
