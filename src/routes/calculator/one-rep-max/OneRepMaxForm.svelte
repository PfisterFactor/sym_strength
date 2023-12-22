<script lang="ts">
    import Card from "$lib/utility/Card.svelte";
    import { Button, Form, FormGroup, NumberInput } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    export let Weight: number | null = null;
    export let Reps: number| null = null;
    const dispatch = createEventDispatcher();
</script>

<Form>
    <FormGroup>
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
    </FormGroup>
    <Card class="save-buttons-card">
        <Button disabled={Weight == null || Reps == null} on:click={() => dispatch("submit")}>Calculate</Button>
    </Card>
</Form>