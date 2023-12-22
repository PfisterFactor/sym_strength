<script lang="ts">
    import { GetLiftEntry, UserLifterInfo, type LiftEntry } from "$lib/data/LifterInformation";
    import { onMount } from "svelte";
    import { get_store_value } from "svelte/internal";
    import type { Writable } from "svelte/store";
    import { queryParam } from "sveltekit-search-params";
    import { PageName } from "../+layout.svelte";
    import Card from "$lib/utility/Card.svelte";
    import EditLiftsForm from "./EditLiftsForm.svelte";
    $PageName = "Edit Lift";

    const liftID: Writable<string | null> = queryParam<string>("liftID");
    let entry: LiftEntry | null = GetLiftEntry(
        $UserLifterInfo.LiftHistory,
        get_store_value(liftID) ?? ""
    );
    onMount(() => {
        // Redirect to the record-lift form if there is no lift present
        if (entry == null) {
            window.location.href = "/record-lift";
        }
    });
    function HandleNavigate(e: CustomEvent<any>) {
        $UserLifterInfo = $UserLifterInfo;
        window.location.href = e.detail.page;
    }
</script>

{#if entry != null}
    <div>
        <Card style="padding: 1rem;">
            <EditLiftsForm bind:entry={entry} on:Navigate={(e) => HandleNavigate(e)} />
        </Card>
    </div>
{/if}

<style>
</style>
