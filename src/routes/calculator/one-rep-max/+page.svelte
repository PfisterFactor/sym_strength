<script lang="ts">
	import { slide } from 'svelte/transition';
    import { PageName } from "../../+layout.svelte";
    import Card from "$lib/utility/Card.svelte";
    import OneRepMaxForm from "./OneRepMaxForm.svelte";
    import CalculationCard from "$lib/utility/CalculationCard.svelte";
    import { OneRepMaxCalculator } from "$lib/data/OneRepMaxCalculator";
    import { Calculator } from "carbon-icons-svelte";
    import { DataTable, InlineNotification } from 'carbon-components-svelte';
    import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
    import { UserLifterInfo } from '$lib/data/LifterInformation';
        
    $PageName = "One Rep Max Calculator";
    
    let Weight: number | null = null;
    let Reps: number | null = null;
    const oneRepMaxFormatter = new Intl.NumberFormat("en-US",{
        style: "unit",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        unit: $UserLifterInfo.Units == "Imperial" ? "pound" : "kilogram",
        unitDisplay: "short"
    });
    let OneRepMax: string | null = null;
    let NRepMaxRows: DataTableRow[] | null = null;

    function CalculateOneRepMax() {
        const shouldScrollToTop = OneRepMax != null;
        OneRepMax = oneRepMaxFormatter.format(OneRepMaxCalculator.CalculateOneRepMax(Weight!,Reps!));
        NRepMaxRows = Array(10).fill(1).map((_,n) => ({id: n+1, reps: n+1, weight: oneRepMaxFormatter.format(OneRepMaxCalculator.CalculateNRepMax(n+1,Weight!,Reps!))}));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
</script>

<div>
    {#if OneRepMax != null}
    <div in:slide={{"axis": "y"}}>
        <Card>
            <CalculationCard HeaderLabel="1 RM" HeaderValue={OneRepMax.toString()} SubheaderText="One Rep Max" >
                <svelte:fragment slot="icon">
                    <Calculator size={96}/>
                </svelte:fragment>
            </CalculationCard>
            <Card DrawBorder={false}>
                <DataTable title="Estimated N Rep Maxes" size="short" headers={[{key: "reps", value: "Reps"}, {key: "weight", value: "Weight"}]} rows={NRepMaxRows}>

                </DataTable>
            </Card>
            <InlineNotification hideCloseButton={true} kind="info-square" title="How was this calculated?" subtitle={"Symmetric Strength uses Wathan's formula for all rep max calculations. A study on the accuracy of seven different rep max prediction formulas found Wathan's formula to be the most accurate. See the References section for more information."}></InlineNotification>
        </Card>
    </div>

    {/if}
    <Card style="padding: 1rem;">
        <OneRepMaxForm bind:Weight bind:Reps on:submit={() => CalculateOneRepMax()}/>
    </Card>
</div>