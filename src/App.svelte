<script lang="ts">
  import "./app.css";
  import Router from "svelte-spa-router";
  import Navbar from "./components/Navbar.svelte";
  import Home from "./pages/Homepage.svelte";
  import Search from "./pages/Search.svelte";
  
  const routes = { "/": Home, "/search": Search };
</script>

<Navbar />

<main class="background">
  <Router {routes} useHash={true} />
</main>

<style>
  :global(html) {
    all: unset;
    border: 0;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: #08090a;
  }

  .background {
    background: #08090a;
  }
</style>
