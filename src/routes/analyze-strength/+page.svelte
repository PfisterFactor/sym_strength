<script lang="ts">
    import {
        GetBestLifts,
        GetMostRecentLifts,
        UserLifterInfo
    } from "$lib/data/LifterInformation";
    import { Tab, TabContent, Tabs } from "carbon-components-svelte";
    import { PageName } from "../+layout.svelte";
    import AnalyzeStrengthDisplay from "./AnalyzeStrengthDisplay.svelte";
    $PageName = "Analyze Strength";
    let selectedTabIndex: number = 0;
</script>

<Tabs bind:selected={selectedTabIndex}>
    <Tab label="Recent" />
    <Tab label="Best" />
    <svelte:fragment slot="content">
        <TabContent>
            {#key selectedTabIndex}
                <AnalyzeStrengthDisplay
                    LiftData={GetMostRecentLifts($UserLifterInfo.LiftHistory)}
                />
            {/key}
        </TabContent>
        <TabContent>
            {#key selectedTabIndex}
                <AnalyzeStrengthDisplay LiftData={GetBestLifts($UserLifterInfo.LiftHistory)} />
            {/key}
        </TabContent>
    </svelte:fragment>
</Tabs>
