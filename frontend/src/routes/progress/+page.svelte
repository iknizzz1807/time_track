<script>
  let currentStreak = 7;
  let codingLevel = "Intermediate";
  let progressPercentage = 60;
  let hoursCompleted = 600;
  let hoursRequired = 1000;
</script>

<section class="streaks-section">
  <h2>Your Progress</h2>
  <div class="streak-card">
    <div class="streak-header">
      <h3>Current Streak</h3>
      <span class="streak-count">{currentStreak} days</span>
    </div>
    <p class="motivation-message">Keep it up! You're on a {currentStreak}-day streak! 🔥</p>
  </div>
  <div class="level-card">
    <h3>Coding Level: {codingLevel}</h3>
    <div class="progress-bar">
      <div class="progress" style="width: {progressPercentage}%"></div>
    </div>
    <p class="hours-count">{hoursCompleted}/{hoursRequired} hours to Expert</p>
  </div>
</section>