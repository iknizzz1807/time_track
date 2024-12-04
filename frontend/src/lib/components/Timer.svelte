<script lang="ts">
  import { createTimer } from "$lib/stores/timerStore.svelte";

  let isRunning: boolean = $state(false);
  const timer = createTimer();

  function formatTime(value: number): string {
    return value.toString().padStart(2, "0");
  }
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->

<section class="timer-section">
  <div class="timer-container">
    <div style="display: flex; justify-content: end">
      <button
        onclick={() => {
          if (!timer.checkIsMinimized()) {
            timer.minimize();
          } else timer.maximize();
        }}
        class="btn"
        style="border: none; background-color: transparent; color: var(--text-color)"
        ><i
          class={timer.checkIsMinimized()
            ? "fa-solid fa-expand"
            : "fa-solid fa-compress"}
        ></i></button
      >
    </div>
    <div class="timer-display">
      {formatTime(timer.get().hours)}:{formatTime(
        timer.get().minutes
      )}:{formatTime(timer.get().seconds)}
    </div>
    <div class="timer-controls">
      <button
        class="btn btn-primary"
        onclick={() => {
          if (!isRunning) {
            timer.start();
            isRunning = true;
          } else {
            timer.pause();
            isRunning = false;
          }
        }}
      >
        <i class="fas {isRunning ? 'fa-pause' : 'fa-play'}"></i>
      </button>
      <button
        class="btn btn-danger"
        onclick={() => {
          timer.stop();
          isRunning = false;
        }}
      >
        <i class="fas fa-stop"></i>
      </button>
      <button
        class="btn btn-danger"
        onclick={() => {
          timer.reset();
          isRunning = false;
        }}
      >
        <i class="fas fa-redo"></i>
      </button>
    </div>
    <select class="activity-select">
      <option value="">Select Activity</option>
      <option value="coding">Coding</option>
      <option value="reading">Reading</option>
      <option value="exercise">Exercise</option>
    </select>
  </div>
</section>
