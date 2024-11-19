<script lang="ts">
  import { createTimer } from "$lib/stores/timerStore.svelte";
  // type Time = {
  //   hours: number;
  //   minutes: number;
  //   seconds: number;
  // };

  let isRunning: boolean = $state(false);
  const timer = createTimer();
  // let time: Time = $state({
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });

  // function startTimer() {
  //   isRunning = !isRunning;
  // }

  // function resetTimer() {
  //   time = { hours: 0, minutes: 0, seconds: 0 };
  //   isRunning = false;
  // }

  // let interval: any;

  // $effect(() => {
  //   if (isRunning) {
  //     interval = setInterval(() => {
  //       time.seconds += 1;
  //       if (time.seconds >= 60) {
  //         time.seconds = 0;
  //         time.minutes += 1;
  //       }
  //       if (time.minutes >= 60) {
  //         time.minutes = 0;
  //         time.hours += 1;
  //       }
  //     }, 1000);
  //   } else {
  //     clearInterval(interval);
  //   }
  // });

  function formatTime(value: number): string {
    return value.toString().padStart(2, "0");
  }
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->

<section class="timer-section">
  <div class="timer-container">
    <button onclick={() => timer.minimize()}>[ ]</button>
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
