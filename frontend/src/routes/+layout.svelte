<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  import { page } from "$app/stores";
  import "../app.css";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="app">
  <nav class="nav">
    <div class="nav-brand">TimeTrack</div>
    <button
      class="theme-toggle"
      onclick={() => document.body.classList.toggle("dark")}
    >
      <i class="fas fa-moon"></i>
    </button>
  </nav>

  <main class="main">
    {@render children()}
  </main>
</div>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />
</svelte:head>
