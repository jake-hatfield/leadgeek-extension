<script lang='ts'>
    let count = 0;

    function sum() {
        count++;
    }
</script>

<p>Counter: {count}</p>
<button on:click={sum}> + </button>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
