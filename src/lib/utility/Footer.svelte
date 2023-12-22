<script lang="ts">

</script>

<footer class:bx--header={true}>
    <slot />
</footer>

<style>
    footer {
        bottom: 0;
        top: unset !important;
        padding-bottom: env(safe-area-inset-bottom);
        height: calc(3rem + env(safe-area-inset-bottom));
    }
</style>
