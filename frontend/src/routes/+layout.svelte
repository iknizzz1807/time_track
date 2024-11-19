<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  // import { page } from "$app/stores";
  import "../app.css";
  import NavBar from "$lib/components/NavBar.svelte";
  import MinimizedTimer from "$lib/components/MinimizedTimer.svelte";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<!-- svelte-ignore a11y_autofocus, a11y_consider_explicit_label -->

<div class="app">
  <nav class="nav">
    <div style="display: flex; gap: 40px; align-items:center">
      <div class="nav-brand">TimeTrack</div>
      <NavBar />
    </div>
    <button
      class="theme-toggle"
      onclick={() => document.body.classList.toggle("dark")}
    >
      <i class="fas fa-moon"></i>
    </button>
  </nav>

  <main class="main">
    {@render children()}
    <MinimizedTimer />
  </main>
</div>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />
</svelte:head>
