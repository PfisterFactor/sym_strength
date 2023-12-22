<script lang="ts">
    import { UserLifterInfo, UnitSuffix } from "$lib/data/LifterInformation";
    import ButtonMenu from "$lib/utility/SaveButtonCard.svelte";
    import {
        Checkbox,
        Form,
        FormGroup,
        NumberInput,
        Select,
        SelectItem,
        TooltipIcon
    } from "carbon-components-svelte";
    import { Help } from "carbon-icons-svelte";
    import { onMount } from "svelte/internal";
    import { writable } from "svelte/store";
    import {PageName} from "../+layout.svelte";
    import { LiftCategories, LiftCategoryMap } from "$lib/data/Lifts";

    /**
     * Copy of lifer info that we update in place
     */
    let updatedLifterInfo = writable(structuredClone($UserLifterInfo));

    let saveStatus: "NONE" | "SAVED" | "UPDATING" = "NONE";

    updatedLifterInfo.subscribe(() => {
        saveStatus = "UPDATING";
    });

    function OnSave() {
        $UserLifterInfo = structuredClone($updatedLifterInfo);
        saveStatus = "SAVED";
    }

    $PageName = "Lifter Info";
    onMount(() => {
        saveStatus = "NONE";
    });
</script>

<Form>
    <FormGroup>
        <div class="section-header">
            <h4>Enter your preferred units and rounding</h4>
            <TooltipIcon direction="left" icon={Help} type="button" class="tooltip-button">
                <span slot="tooltipText">
                    Already recorded lifts will use the measurement system at the time of recording.
                </span>
            </TooltipIcon>
        </div>
        <fieldset class="top-select">
            <Select labelText="Units" bind:selected={$updatedLifterInfo.Units}>
                <SelectItem text="Imperial" value="Imperial" />
                <SelectItem text="Metric" value="Metric" />
            </Select>
            <Select labelText="Round to Nearest" bind:selected={$updatedLifterInfo.RoundTo}>
                <SelectItem text={`1 ${$UnitSuffix}`} value={1} />
                <SelectItem text={`2.5 ${$UnitSuffix}`} value={2.5} />
                <SelectItem text={`5 ${$UnitSuffix}`} value={5} />
                <SelectItem text={`10 ${$UnitSuffix}`} value={10} />
            </Select>
        </fieldset>
    </FormGroup>
    <hr />
    <FormGroup>
        <div class="section-header">
            <h4>Select the lifts that you train</h4>
            <TooltipIcon direction="left" icon={Help} type="button" class="tooltip-button">
                <span slot="tooltipText">
                    These lifts will be used to determine your strength levels. For the most
                    complete results, choose at least one lift per category.
                </span>
            </TooltipIcon>
        </div>
        <div class="lift-selection">
            {#each LiftCategories as liftCategory}
            <fieldset class="lift-checkboxes" style="grid-area: {liftCategory.toLowerCase().replaceAll(" ","").replaceAll("/","")}">
                <legend>{liftCategory}</legend>
                {#each LiftCategoryMap[liftCategory] as lift }
                    <Checkbox labelText={lift} bind:checked={$updatedLifterInfo.SelectedLifts[lift]}/>
                {/each}
            </fieldset>
            {/each}
        </div>
    </FormGroup>
    <hr />
    <FormGroup>
        <div class="section-header">
            <h4>Enter your sex, bodyweight, & age</h4>
            <TooltipIcon direction="left" icon={Help} type="button" class="tooltip-button">
                <span slot="tooltipText">
                    Your strength score adjusts by sex, bodyweight, and age, allowing you to measure
                    yourself against any other lifter.
                </span>
            </TooltipIcon>
            <p />
        </div>
        <div class="person-info-input">
            <Select labelText="Sex" bind:selected={$updatedLifterInfo.Sex}>
                <SelectItem text="Male" value="Male" />
                <SelectItem text="Female" value="Female" />
            </Select>
            <NumberInput
                label="Body Weight"
                bind:value={$updatedLifterInfo.BodyWeight.Weight}
                min={0}
                max={999}
                invalidText="Invalid value"
                placeholder="XXX lbs"
                allowEmpty={true}
            />
            <NumberInput
                label="Age (optional)"
                bind:value={$updatedLifterInfo.Age}
                allowEmpty={true}
                placeholder="0"
            />
        </div>
    </FormGroup>
    <ButtonMenu text="Save" on:click={(e) => OnSave()} status={saveStatus} />
</Form>

<style>
    .top-select {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .lift-selection {
        display: grid;
        row-gap: 3rem;
        grid-template:
            "squat floorpull"
            "horizontalpress verticalpress"
            "pull-uprow empty";
    }
    .person-info-input {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
        gap: 1rem;
    }
    hr {
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
        .lift-selection {
            grid-template:
                "squat floorpull horizontalpress"
                "verticalpress pull-uprow empty";
        }
        .top-select {
            flex-direction: row;
        }
        .person-info-input {
            flex-direction: row;
        }
    }
</style>
