<script lang="ts">
    export let DrawBorder: boolean = true;
    export let DrawShadow: boolean = true;
</script>

<div class:card-content={true} style:border={DrawBorder ? undefined : "unset"} style:box-shadow={DrawShadow ? undefined : "unset"} {...$$restProps}>
    <slot></slot>
</div>
<style>
    .card-content {
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border: 1px gray solid;
        background-color: white;
        margin-bottom: 2rem;
        padding: 1rem;
    }
</style>