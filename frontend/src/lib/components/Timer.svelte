<script>
  let time = "00:00:00";
  let isRunning = false;

  function toggleTimer() {
    isRunning = !isRunning;
  }

  function resetTimer() {
    time = "00:00:00";
    isRunning = false;
  }
</script>

<section class="timer-section">
  <div class="timer-container">
    <div class="timer-display">{time}</div>
    <div class="timer-controls">
      <button class="btn btn-primary" on:click={toggleTimer}>
        <i class="fas {isRunning ? 'fa-pause' : 'fa-play'}"></i>
      </button>
      <button class="btn btn-danger" on:click={resetTimer}>
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