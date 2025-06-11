<script lang="ts">
  import { NAVBAR_LINKS } from "./data";

</script>

<nav class="navbar-container shadow">
  <div class="navbar-items">
    <a class="logo" href="/">LOGO</a>

    <ul class="navbar-links">
      {#each NAVBAR_LINKS as link}
        <li
          class="cursor-pointer w-full text-sm text-neutral-600 px-4 py-3 rounded-sm items-center justify-center flex"
        >
          <a href={link.href}>{link.name}</a>
        </li>
      {/each}
    </ul>

    <div class="actions">
      <a href="/search" class="test-button">Teste agora</a>
    </div>
  </div>
</nav>

<style>
  .navbar-container {
    box-shadow: 1px;
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    max-height: 44px;
    width: auto;
    background-color: #fff;
    background-clip: padding-box;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    backdrop-filter: blur(4px);
  }

  .navbar-items {
    height: 100%;
    margin: auto;
    display: flex;
    width: 100%;
    max-width: 1152px;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  }

  .logo {
    font-weight: 600;
    text-decoration: none;
    color: #404040;
    width: 100%;
  }

  .navbar-links {
    width: 100%;
    justify-content: center;
    align-self: center;
    display: flex;
    gap: 12px;
  }

  .actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .test-button {
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 510;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 8px;
    color: #fff;
    background: #6366f1;
    cursor: pointer;
    text-decoration: none;
    transition-duration: 0.2s;
    transition-property: all;
  }

  .test-button:hover {
    filter: brightness(1.05);
  }

  /* @media (min-width: 1024px) {
    .navbar-container {
      display: flex;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  } */

  /* @media (min-width: 1280px) {
    .navbar-container {
      padding-left: 0;
      padding-right: 0;
    }
  } */
</style>
