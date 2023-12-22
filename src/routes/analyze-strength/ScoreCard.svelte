<script lang="ts">
    import { type LiftCategory, LiftCategories } from "$lib/data/Lifts";
    import { GetStrengthLevel, StrengthLevels } from "$lib/data/StrengthScoreCalculator";
    import CalculationCard from "$lib/utility/CalculationCard.svelte";
    import {
        SkillLevel,
        SkillLevelAdvanced,
        SkillLevelBasic,
        SkillLevelIntermediate
    } from "carbon-icons-svelte";

    export let OverallScore: number = 90;
    export let LiftCategoryScores: Partial<Record<LiftCategory, number>> = {};
    

    const scoreFormatter = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1
    });
    $: skillIcon = (() => {
        let skill: number = (StrengthLevels.indexOf(GetStrengthLevel(OverallScore)) + 1) / StrengthLevels.length;
        if (skill < 0.25) return SkillLevel;
        if (skill < 0.5) return SkillLevelBasic;
        if (skill < 0.75) return SkillLevelIntermediate;
        return SkillLevelAdvanced;
    })();

</script>
<CalculationCard HeaderLabel="Score" HeaderValue={scoreFormatter.format(OverallScore)} SubheaderText={GetStrengthLevel(OverallScore)}>
    <svelte:component this={skillIcon} size={96} slot="icon"/>
    <svelte:fragment slot="details">
        {#each LiftCategories as liftCat}
            <div class="liftcat">
                <span class="liftcat-text"
                    >{liftCat}:
                    <b
                        >{LiftCategoryScores[liftCat] == null
                            ? "N/A"
                            : scoreFormatter.format(LiftCategoryScores[liftCat])}</b
                    ></span
                >
                <span class="liftcat-rank">
                    
                    {#if LiftCategoryScores[liftCat] == null}
                        [Not Entered]
                    {:else}
                        [{GetStrengthLevel(LiftCategoryScores[liftCat])}]
                    {/if}
                    
                </span>
            </div>
        {/each}
    </svelte:fragment>
</CalculationCard>