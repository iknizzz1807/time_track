<script lang="ts">
  import { createTimer } from "$lib/stores/timerStore.svelte";

  const timer = createTimer();

  function formatTime(value: number): string {
    return value.toString().padStart(2, "0");
  }
</script>

{#if timer.checkIsMinimized()}
  <div class="container">
    {formatTime(timer.get().hours)}:{formatTime(
      timer.get().minutes
    )}:{formatTime(timer.get().seconds)}
    <button onclick={() => timer.maximize()}>[X]</button>
  </div>
{/if}

<style>
  .container {
    position: fixed;
    /* bottom: 10px;
    right: 10px; */
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    right: 50%;
    bottom: 10px;
  }
</style>
