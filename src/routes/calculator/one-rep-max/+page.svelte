<script lang="ts">
	import { slide } from 'svelte/transition';
    import { PageName } from "../../+layout.svelte";
    import Card from "$lib/utility/Card.svelte";
    import OneRepMaxForm from "./OneRepMaxForm.svelte";
    import CalculationCard from "$lib/utility/CalculationCard.svelte";
    import { OneRepMaxCalculator } from "$lib/data/OneRepMaxCalculator";
    import { Calculator } from "carbon-icons-svelte";
    import { DataTable } from 'carbon-components-svelte';
    
    $PageName = "One Rep Max Calculator";

    let Weight: number | null = null;
    let Reps: number | null = null;
    let ResultVisible: boolean = false;
    const oneRepMaxFormatter = new Intl.NumberFormat("en-US",{
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    let OneRepMax: string | null = null;

    function CalculateOneRepMax() {
        const shouldScrollToTop = OneRepMax != null;
        OneRepMax = oneRepMaxFormatter.format(OneRepMaxCalculator.CalculateOneRepMax(Weight,Reps));
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
            <DataTable headers={[{key: "reps", value: "Reps"}, {key: "weight", value: "Weight"}]} rows={[{id: 1, reps: 1, weight: 2}]}>

            </DataTable>
        </Card>
    </div>

    {/if}
    <Card style="padding: 1rem;">
        <OneRepMaxForm bind:Weight bind:Reps on:submit={() => CalculateOneRepMax()}/>
    </Card>
</div>