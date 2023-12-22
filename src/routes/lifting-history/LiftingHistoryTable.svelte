<script lang="ts">
    import { SelectedLiftsArray, UserLifterInfo } from "$lib/data/LifterInformation";
    import { IsBodyweightLift, type Lift } from "$lib/data/Lifts";
    import Card from "$lib/utility/Card.svelte";
    import {
        Button,
        DataTable,
        Select,
        SelectItem,
        Toolbar,
        ToolbarBatchActions,
        ToolbarContent
    } from "carbon-components-svelte";
    import { Edit, TrashCan } from "carbon-icons-svelte";
    export let Lift: Lift;

    const headers = [
        { key: "Weight", value: "Weight" },
        { key: "Reps", value: "Reps" },
        { key: "Bodyweight", value: "Body Weight" },
        { key: "Date", value: "Date" }
    ];

    $: rows =
        $UserLifterInfo.LiftHistory[Lift]?.reduce((acc, e) => {
            const weight = IsBodyweightLift(Lift) ?  FormatBodyweightLiftWeight(e.Weight) : e.Weight.toFixed(0);
            return [
                ...acc,
                {
                    id: e.ID,
                    Lift: Lift,
                    Weight: weight,
                    Reps: e.Reps,
                    Bodyweight: e.Bodyweight,
                    Date: `${e.Date.getFullYear()}-${e.Date.getMonth()+1}-${e.Date.getDate()}`
                }
            ];
        }, [] as any[]) ?? [];
    
    let selectedRowIds: any[] = [];
    
    function FormatBodyweightLiftWeight(weight: number): string {
        
        if (weight < 0) {
            return `${weight.toFixed(0)}`;
        }
        if (weight > 0) {
            
            return `+${weight.toFixed(0)}`
        }
        return "0";
    }
    function DeleteLiftEntry(id: string) {
        $UserLifterInfo.LiftHistory[Lift] = $UserLifterInfo.LiftHistory[
            Lift
        ].filter((e) => e.ID !== id);
    }
</script>

<Card>
    <Select labelText="Selected Lift" bind:selected={Lift}>
        {#each $SelectedLiftsArray as lift}
            <SelectItem text={lift} value={lift} />
        {/each}
    </Select>
</Card>
<div>
    <div class="table-container">
        <DataTable
            title="Lifting History"
            description={Lift}
            selectable
            radio={true}
            bind:selectedRowIds
            {headers}
            {rows}
        >
            <Toolbar>
                <ToolbarBatchActions formatTotalSelected={() => ""}>
                    <Button icon={Edit} on:click={() => {
                        const row = rows.find((row) => selectedRowIds.includes(row.id));
                        if (row == null) return;
                        window.location.href = `/edit-lift?liftID=${row.id}`
                    }}>Edit</Button>
                    <Button
                        icon={TrashCan}
                        disabled={selectedRowIds.length === 0}
                        on:click={() => {
                            const row = rows.find((row) => selectedRowIds.includes(row.id));
                            if (row == null) return;
                            if (!confirm("Are you sure you want to delete this lift entry?"))
                                return;
                            DeleteLiftEntry(row.id);
                            selectedRowIds = [];
                        }}
                    >
                        Delete
                    </Button>
                </ToolbarBatchActions>
                <ToolbarContent>
                    <Button on:click={() => (selectedRowIds = rows.length == 0 ? [] : [rows[0].id])}
                        >Edit lifts</Button
                    >
                </ToolbarContent>
            </Toolbar>
        </DataTable>
    </div>
</div>

<style>
    .table-container {
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border: 1px gray solid;
        background-color: white;
    }
</style>