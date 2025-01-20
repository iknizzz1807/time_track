<script lang="ts">
  import { createTimer } from "$lib/stores/timerStore.svelte";
  import { showOKToast, showWarningToast } from "$lib/utils/toast";
  import { GetActivities } from "$lib/wailsjs/go/main/App";
  import { CreateActivity } from "$lib/wailsjs/go/main/App";
  import type { main } from "$lib/wailsjs/go/models";
  import { onMount } from "svelte";

  type Activity = main.Activity;

  const timer = createTimer();

  let targetActivity: string = $state("");

  let trackableActivities: Activity[] = $state([]);
  let activityInput: string = $state("");

  function formatTime(value: number): string {
    return value.toString().padStart(2, "0");
  }

  onMount(() => {
    GetActivities().then((activities: Activity[]) => {
      trackableActivities = activities;
    });
  });

  const createActivity = async () => {
    if (activityInput.trim() === "") {
      showWarningToast("Please type the activity name");
    } else {
      const newActivity: Activity = {
        id: 0,
        name: activityInput,
        total_time: 0,
      };
      try {
        await CreateActivity(newActivity);
        const activities = await GetActivities();
        trackableActivities = activities;
        targetActivity = activityInput; // Update select to the newly created activity
        timer.setTrackingActivity(targetActivity);
        showOKToast("Activity created successfully");
        activityInput = "";
      } catch (error) {
        showWarningToast(
          `Activity with name '${activityInput}' already exists`
        );
      }
    }
  };
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
      <!-- Play button -->
      <button
        class="btn btn-primary"
        onclick={() => {
          if (!timer.getTrackingActivity()) {
            showWarningToast("Please choose an activity");
          } else {
            if (!timer.isRunning()) {
              timer.start();
            } else {
              timer.pause();
            }
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
          showOKToast("Successfully tracked");
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
    <div class="select-create-activity">
      <select
        class="activity-select"
        bind:value={targetActivity}
        onchange={() => timer.setTrackingActivity(targetActivity)}
        disabled={timer.isRunning() || timer.isPausing()}
      >
        <option value="">Select Activity</option>
        {#each trackableActivities as activity}
          <option value={activity.name}>{activity.name}</option>
        {/each}
      </select>

      <div class="create-activity">
        <input
          type="text"
          placeholder="Activity name"
          class="input-activity"
          bind:value={activityInput}
        />
        <button
          class="btn-primary btn"
          style="height: 44px"
          onclick={createActivity}>Create</button
        >
      </div>
    </div>
  </div>
</section>
