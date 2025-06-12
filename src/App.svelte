<script lang="ts">
  import "./app.css";
  import Router from "svelte-spa-router";
  import Navbar from "./components/Navbar/Navbar.svelte";
  import Home from "./pages/Homepage.svelte";
  import Search from "./pages/Search.svelte";
    import Footer from "./components/Footer/Footer.svelte";
  
  const routes = { "/": Home, "/search": Search };
</script>

<Navbar />

<main class="background">
  <Router {routes} useHash={true} />
</main>

<Footer />

<style>
  :global(html) {
    all: unset;
    border: 0;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: #f5f5f5;
  }

  .background {
    background: #f5f5f5;
  }
</style>
