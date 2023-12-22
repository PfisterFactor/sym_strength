<script lang="ts">
	import { queryParam } from 'sveltekit-search-params';
    import { UserLifterInfo } from "$lib/data/LifterInformation";
    import type { Lift } from "$lib/data/Lifts";
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { PageName } from "../+layout.svelte";
    import LiftingHistoryTable from "./LiftingHistoryTable.svelte";
    $PageName = "Lifting History";

    const lift: Writable<Lift | null> = queryParam<Lift>("lift");
    onMount(() => {
        if ($lift == null) $lift = Object.keys($UserLifterInfo.SelectedLifts).find(k => (<any>$UserLifterInfo.SelectedLifts)[k]) as Lift;
    });
</script>

{#if lift != null}
<div class="container">
    <LiftingHistoryTable bind:Lift={$lift}></LiftingHistoryTable>
</div>
{/if}

<style>
    .editlifts {
        position: absolute;
        z-index: 99999;
        top:0;
        bottom: 0;
        left:0;
        right:0;
    }
</style>