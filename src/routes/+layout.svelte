<script context="module">
    export let PageName = writable("");
</script>

<script lang="ts">
    import { SelectedLiftsArray } from "$lib/data/LifterInformation";
    import { LiftCategories, LiftCategoryMap } from "$lib/data/Lifts";
    import {
        Content,
        Header,
        HeaderNav,
        HeaderNavItem,
        SideNav,
        SideNavDivider,
        SideNavItems,
        SideNavLink,
        SideNavMenu,
        SideNavMenuItem,
        SkipToContent
    } from "carbon-components-svelte";
    import "carbon-components-svelte/css/white.css";
    import {
        Activity,
        Calculator,
        ChartColumn,
        Help,
        RecentlyViewed,
        Report,
        UserAvatar
    } from "carbon-icons-svelte";
    import intersect from "just-intersect";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import "../app.css";
    let isSideNavOpen = false;
    onMount(() => {
        isSideNavOpen = false;
    })
</script>

<Header company="Symmetric Strength" platformName={$PageName} persistentHamburgerMenu={true} bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
        <SkipToContent />
    </svelte:fragment>
    <HeaderNav class="header-nav">
        <HeaderNavItem href="/" text="Link 1" />
        <HeaderNavItem href="/" text="Link 2" />
        <HeaderNavItem href="/" text="Link 3" />
    </HeaderNav>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        <SideNavLink
            icon={UserAvatar}
            href="/lifter-info"
            text="Edit Lifter Information"
            on:click={() => (isSideNavOpen = false)}
        />
        <SideNavDivider />
        <SideNavMenu icon={Report} text="Record a Lift">
            {#each LiftCategories as liftCategory}
                {#each intersect(LiftCategoryMap[liftCategory], $SelectedLiftsArray) as lift}
                <SideNavMenuItem text={lift} href="/record-lift?lift={lift}" on:click={() => (isSideNavOpen = false)}></SideNavMenuItem>
                {/each}
            {/each}
        </SideNavMenu>
        <SideNavLink icon={RecentlyViewed} text = "View Lifting History" href="/lifting-history" on:click={() => (isSideNavOpen = false)}></SideNavLink>
        <SideNavDivider />
        <SideNavLink
            icon={Activity}
            href="/analyze-strength"
            text="Analyze Strength"
            on:click={() => (isSideNavOpen = false)}
        />
        <SideNavLink
            icon={ChartColumn}
            href="/strength-standards"
            text="Strength Standards"
            on:click={() => (isSideNavOpen = false)}
        />
        <SideNavMenu icon={Calculator} expanded={true} text="Calculators">
            <SideNavMenuItem
                href="/calculator/one-rep-max"
                text="One Rep Max"
                on:click={() => (isSideNavOpen = false)}
            />
            <SideNavMenuItem
                href="/calculator/wilks"
                text="Wilks Score"
                on:click={() => (isSideNavOpen = false)}
            />
            <SideNavMenuItem
                href="/calculator/tdee"
                text="TDEE"
                on:click={() => (isSideNavOpen = false)}
            />
            <SideNavMenuItem
                href="/calculator/ideal-bodyweight"
                text="Ideal Bodyweight"
                on:click={() => (isSideNavOpen = false)}
            />
        </SideNavMenu>
        <SideNavDivider />
        <SideNavLink icon={Help} text="About" />
    </SideNavItems>
</SideNav>

<Content class="content">
    <slot class="mainContent" />
</Content>

<style>
    :global(.content) {
        margin-bottom: 3rem;
        padding: 1rem;
    }
    .mainContent {
        margin-left: -1rem;
        margin-right: -1rem;
    }
    :global(.header-nav) {
        display: none;
    }
    :global(.footer-nav) {
        display: block;
        width: 100%;
    }
    :global(.footer-nav::before) {
        display: none;
    }
    :global(.footer-nav ul) {
        justify-content: space-evenly;
        padding-left: 0;
    }
    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
        :global(.footer-nav) {
            display: none;
        }
        :global(.header-nav) {
            display: block;
        }
    }
    @media only screen and (min-width: 1200px) {
        .mainContent {
            width: 1200px;
        }
    }
</style>
