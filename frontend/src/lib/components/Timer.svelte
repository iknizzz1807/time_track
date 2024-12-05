<script lang="ts">
  import { createTimer } from "$lib/stores/timerStore.svelte";

  const timer = createTimer();

  let targetActivity: string = $state("");

  let trackableActivities: string[] = $state(["Coding", "Reading", "Exercise"]);

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
    <select
      class="activity-select"
      bind:value={targetActivity}
      onchange={() => timer.setTrackingActivity(targetActivity)}
      disabled={timer.isRunning() || timer.isPausing()}
    >
      <option value="">Select Activity</option>
      <!-- <option value="coding">Coding</option>
      <option value="reading">Reading</option>
      <option value="exercise">Exercise</option> -->
      {#each trackableActivities as activity}
        <option value={activity}>{activity}</option>
      {/each}
    </select>
  </div>
</section>
