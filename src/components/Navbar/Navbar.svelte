<script lang="ts">
  import { NAVBAR_LINKS } from "./data";

</script>

<nav class="navbar-container border border-white/5 backdrop-blur-lg">
  <div class="navbar-items">
    <a class="logo" href="/">LOGO</a>

    <ul class="navbar-links">
      {#each NAVBAR_LINKS as link}
        <li
          class="cursor-pointer w-full text-[13px] text-neutral-600 font-medium px-3.5 py-1 rounded-sm items-center justify-center flex"
        >
          <a href={link.href}>{link.name}</a>
        </li>
      {/each}
    </ul>

    <div class="actions">
      <a href="/search" class="test-button">Ver Inventário</a>
    </div>
  </div>
</nav>

<style>
  .navbar-container {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    max-height: 42px;
    width: auto;
    background: linear-gradient(90deg,#a5aaae5d,#a5aaae1a 50%,#a5aaae14);
    --globalnav-backdrop-filter: saturate(180%) blur(20px);
    background-clip: padding-box;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 1.65rem;
    padding-bottom: 1.65rem;
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
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    position: relative;
    border: none;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    color: #fff;
    width: 8em;
    height: 1.75em;
    line-height: 2em;
    text-align: center;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 300%;
    border-radius: 30px;
    z-index: 1;
  }

  .test-button:hover {
    animation: ani 8s linear infinite;
    border: none;
  }

  @keyframes ani {
    0% {
      background-position: 0%;
    }

    100% {
      background-position: 400%;
    }
  }

  .test-button:before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    border-radius: 35px;
    transition: 1s;
  }

  .test-button:hover::before {
    filter: blur(20px);
  }

  .test-button:active {
    background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  }
</style>
