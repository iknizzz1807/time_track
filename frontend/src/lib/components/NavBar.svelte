<script lang="ts">
  import { page } from "$app/stores";
</script>

<main>
  <div class="nav-links">
    <a href="/" class:active={$page.url.pathname === "/"}>
      <i class="fas fa-clock"></i> Timer
    </a>
    <a href="/history" class:active={$page.url.pathname === "/history"}>
      <i class="fas fa-history"></i> History
    </a>
    <a href="/progress" class:active={$page.url.pathname === "/progress"}>
      <i class="fas fa-chart-line"></i> Progress
    </a>
    <a href="/analytics" class:active={$page.url.pathname === "/analytics"}>
      <i class="fas fa-chart-bar"></i> Analytics
    </a>
  </div>
</main>

<style>
  .active {
    background-color: aqua !important;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
    flex-grow: 1;
  }

  .nav-links a {
    text-decoration: none;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .nav-links a:hover {
    background: var(--bg-hover);
  }

  .nav-links a.active {
    color: var(--primary);
    background: var(--bg-hover);
  }
</style>
