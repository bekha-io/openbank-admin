<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import Navigation from "./Navigation.svelte";
  import "./styles.css";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { contextUser } from "../stores/Auth";
</script>

<div class="app">
  <div class="overlay hidden"></div>
  {#if $contextUser}
    <Navigation />
  {/if}
  <main>
    <slot />
  </main>

  <footer>
    <p>OpenBank Admin v1.0</p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: row;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    position: absolute;
    bottom: 0;
    right: 24px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
