<script lang="ts">
  import { createTimer } from "$lib/stores/timerStore.svelte";

  const timer = createTimer();

  function formatTime(value: number): string {
    return value.toString().padStart(2, "0");
  }

  // let isRunning: boolean = $state(false);
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->

{#if timer.checkIsMinimized()}
  <div style="display: flex; justify-content: center">
    <div class="container">
      <div class="activity-name">
        <h3>{timer.getTrackingActivity()}</h3>
      </div>

      <div class="timer-controller">
        <div class="timer-display" style="font-size: 30px; margin: 0">
          {formatTime(timer.get().hours)}:{formatTime(
            timer.get().minutes
          )}:{formatTime(timer.get().seconds)}
        </div>

        <div class="timer-controls" style="margin: 0;">
          <button
            class="btn btn-primary"
            disabled={!timer.getTrackingActivity()}
            onclick={() => {
              if (!timer.isRunning()) {
                timer.start();
              } else {
                timer.pause();
              }
            }}
          >
            <i class="fas {timer.isRunning() ? 'fa-pause' : 'fa-play'}"></i>
          </button>
          <button
            class="btn btn-danger"
            disabled={!timer.getTrackingActivity()}
            onclick={() => {
              timer.stop();
            }}
          >
            <i class="fas fa-stop"></i>
          </button>
          <button
            class="btn btn-danger"
            disabled={!timer.getTrackingActivity()}
            onclick={() => {
              timer.reset();
            }}
          >
            <i class="fas fa-redo"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .container {
    position: fixed;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--card-background);
    color: var(--text-color);
    padding: 10px 20px;
    border-radius: 0.5rem;
    bottom: 12px;
    box-shadow: var(--shadow);
    z-index: 999;
    gap: 8px;
  }

  .timer-controller {
    display: flex;
    gap: 12px;
  }
</style>
