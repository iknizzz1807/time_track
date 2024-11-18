{#key $page.url.pathname}
<script>
  import { page } from '$app/stores';
  import '../app.css';
</script>

<div class="app">
  <nav class="nav">
    <div class="nav-brand">TimeTrack</div>
    <button class="theme-toggle" on:click={() => document.body.classList.toggle('dark')}>
      <i class="fas fa-moon"></i>
    </button>
  </nav>

  <main class="main">
    <slot />
  </main>
</div>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</svelte:head>
{/key}