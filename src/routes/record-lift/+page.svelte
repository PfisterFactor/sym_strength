<script lang="ts">
    import { UserLifterInfo } from "$lib/data/LifterInformation";
    import { queryParam } from "sveltekit-search-params";
    import Card from "$lib/utility/Card.svelte";
    import RecordLiftsForm from "./RecordLiftsForm.svelte";
    import { PageName } from "../+layout.svelte";
    import type { Writable } from "svelte/store";
    import type { Lift } from "$lib/data/Lifts";
    import { onMount } from "svelte";
    $PageName = "Record Lifts";

    const lift: Writable<Lift | null> = queryParam<Lift>("lift");
    onMount(() => {
        // If the lift is null, find the first lift that the user has history for
        if ($lift == null) {
            $lift = Object.keys($UserLifterInfo.SelectedLifts).find(
                (k) => (<any>$UserLifterInfo.SelectedLifts)[k]
            ) as Lift;
        }
    });
</script>

{#if lift != null}
    <div>
        <Card style="padding: 1rem;">
            <RecordLiftsForm bind:lift={$lift} />
        </Card>
    </div>
{/if}

<style>
</style>
