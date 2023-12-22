<script lang="ts">
    import { Button } from "carbon-components-svelte";
    import Card from "./Card.svelte";
    import sticky from "./Sticky";
    import { createEventDispatcher, onMount } from "svelte";
    
    export let text: [string,string];
    export let enabled: boolean = true;
    export let status: "NONE" | "UPDATING";

    let saveButtonRef: HTMLButtonElement;
    let areSaveButtonsStuck: boolean = true;
    let ignoreStickyEvent = true;
    const dispatch = createEventDispatcher();
    onMount(() => {
        saveButtonRef.style.transition = "unset";
        areSaveButtonsStuck =
            window.innerHeight + window.pageYOffset <
            document.body.offsetHeight;
    });

    $: areSaveButtonsStuck,
        () => {
            saveButtonRef.style.transition = undefined;
        };
</script>

<div
    class:save-buttons={true}
    class:save-buttons-expanded={areSaveButtonsStuck}
    class:save-buttons-expanded-animation={ignoreStickyEvent == false}
    use:sticky={{ stickToTop: false }}
    on:stuck={(e) => {
        areSaveButtonsStuck = ignoreStickyEvent
            ? areSaveButtonsStuck
            : e.detail.isStuck;
        ignoreStickyEvent = false;
    }}>
    <Card class="save-buttons-card">
        <Button
            bind:ref={saveButtonRef}
            disabled={!enabled || status === "NONE"}
            on:click={(e) => dispatch("click",{button: text[0], event: e})}
            >{text[0]}</Button>
        <Button kind="secondary" on:click={(e) => dispatch("click",{button: text[1], event: e})}>
            {text[1]}
        </Button>
    </Card>
</div>

<style>
    .save-buttons {
        position: sticky;
        bottom: 0;
        background-color: #f4f4f4;
    }
    .save-buttons-expanded-animation {
        transition-property: margin-left margin-right;
        transition-duration: 70ms;
    }
    :global(.save-buttons-card) {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .save-buttons-expanded {
        margin-left: -2.1rem;
        margin-right: -2.1rem;
    }
    :global(.save-buttons-expanded .save-buttons-card) {
        border-left: none;
        border-right: none;
        padding-bottom: calc(1rem + env(safe-area-inset-bottom));
    }

    .status-indicator {
        border: 1px black solid;
        display: flex;
        gap: 0.5rem;
        align-items: center;
        height: 3rem;
        background-color: #e0e0e0;
        padding-right: 0.5rem;
        padding-left: 0.5rem;
        width: 150px;
    }
</style>
