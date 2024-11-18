<script>
  import Calendar from '$lib/components/Calendar.svelte';
</script>

<section class="calendar-section">
  <h2>History</h2>
  <Calendar />
  <div class="filters">
    <select class="filter-select">
      <option value="all">All Activities</option>
      <option value="coding">Coding</option>
      <option value="reading">Reading</option>
    </select>
    <select class="filter-select">
      <option value="week">This Week</option>
      <option value="month">This Month</option>
      <option value="year">This Year</option>
    </select>
  </div>
</section>