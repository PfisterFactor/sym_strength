<script lang="ts">
    import type { Lift } from "$lib/data/Lifts";
    export let Lift: Lift;
</script>

<button class="container" on:click>
    <legend class="lift-text">
        {Lift}
    </legend>
</button>

<style>
    .lift-text {
        font-size: 16px;
    }
    .container {
        position: relative;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border: 1px gray solid;
        background-color: white;
        aspect-ratio: 1/1;
        width: 96px;
        height: 96px;
    }
    .container:hover {
        background-color: #dfdfdf;
    }
    .container:active {
        background-color: #dfdfdf;
        top: 2px;
    }
</style>
