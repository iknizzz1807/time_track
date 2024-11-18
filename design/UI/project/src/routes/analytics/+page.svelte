<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let barChart, pieChart, lineChart;

  onMount(() => {
    createBarChart();
    createPieChart();
    createLineChart();
  });

  function createBarChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Hours per Day',
          data: [4, 6, 3, 5, 2, 3, 4],
          backgroundColor: '#4a90e2'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Daily Activity'
          }
        }
      }
    });
  }

  // Similar implementations for createPieChart and createLineChart...
</script>

<section class="charts-section">
  <h2>Analytics</h2>
  <div class="charts-container">
    <canvas id="barChart"></canvas>
    <canvas id="pieChart"></canvas>
    <canvas id="lineChart"></canvas>
  </div>
</section>