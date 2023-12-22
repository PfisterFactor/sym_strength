<script lang="ts">
    import Card from "$lib/utility/Card.svelte";
    import { fade, scale } from "svelte/transition";

    export let HeaderLabel: string;
    export let HeaderValue: string;
    export let SubheaderText: string = "";
</script>

<div in:scale|global={{duration:100}}>
<Card class="scorecard-container" style="margin-bottom: 1rem;">
    <div class="icon">
        <slot name="icon"/>
    </div>
    <div class="score">
        <div>
            <h2 class="score-text" in:fade|global={{delay: 50}}>{HeaderLabel}: <b>{HeaderValue}</b></h2>
            {#if SubheaderText != null}
            <h4 class="score-subtext" in:fade|global={{delay: 250}}><em>{SubheaderText}</em></h4>
            {/if}
        </div>
    </div>
    <div class="stats" in:fade|global={{delay:500}}>
        <slot name="details"/>
    </div>
</Card>
</div>

<style>
    :global(.scorecard-container) {
        display: grid;
        height: fit-content;
        width: 100%;
        max-width: 340px;
        grid:
            "icon score" auto
            "stats stats" auto / auto 1fr;
    }
    .icon {
        grid-area: icon;
        display: flex;
        align-items: end;
        justify-content: left;
    }
    .score {
        grid-area: score;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-x: hidden;
    }
    .stats {
        border-top: 1px gray solid;
        margin-top: 0.5rem;
        grid-area: stats;
        padding: 0.5rem;
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    .score-subtext {
        text-align: right;
    }
</style>
