<script>
  let activities = [
    { name: 'Coding', duration: '2h 30m', progress: 75 },
    { name: 'Reading', duration: '1h 15m', progress: 45 }
  ];
</script>

<div class="today-activities">
  <h2>Today's Activities</h2>
  <div class="activity-cards">
    {#each activities as activity}
      <div class="activity-card">
        <div class="activity-header">
          <h3>{activity.name}</h3>
          <span>{activity.duration}</span>
        </div>
        <div class="progress-bar">
          <div class="progress" style="width: {activity.progress}%"></div>
        </div>
      </div>
    {/each}
  </div>
</div>