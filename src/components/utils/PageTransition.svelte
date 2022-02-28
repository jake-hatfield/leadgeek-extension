<script lang="ts">
    import {fly} from 'svelte/transition';

    //   props
    export let url = '';

    //   state
    const pageTransitionDuration = 200;
  </script>

  {#key url}
    <div
      in:fly={{
        x: -5,
        duration: pageTransitionDuration,
        delay: pageTransitionDuration,
      }}
      out:fly={{x: 5, duration: pageTransitionDuration}}
    >
      <slot />
    </div>
  {/key}
