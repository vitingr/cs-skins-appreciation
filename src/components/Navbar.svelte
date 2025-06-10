<script lang="ts"></script>

<nav class="navbar-container">
  <div class="navbar-items">
    <!-- Logo link para home -->
    <a class="logo" href="/">LOGO</a>

    <ul class="navbar-links">
      <li class="navbar-item"><a href="/product">Product</a></li>
      <li class="navbar-item"><a href="/resources">Resources</a></li>
      <li class="navbar-item"><a href="/pricing">Pricing</a></li>
      <li class="navbar-item"><a href="/customers">Customers</a></li>
      <li class="navbar-item"><a href="/blog">Blog</a></li>
      <li class="navbar-item"><a href="/contact">Contact</a></li>
    </ul>

    <div class="actions">
      <a href="/search" class="test-button">Teste agora</a>
    </div>
  </div>
</nav>

<style>
  .navbar-container {
    border-bottom: 1px solid #313233e5;
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    max-height: 44px;
    width: auto;
    background-color: hsla(0,0%,4%,.8);
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
    color: white;
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
    color: #08090a;
    background: #e6e6e6;
    cursor: pointer;
    text-decoration: none;
    transition-duration: 0.2s;
    transition-property: all;
  }

  .test-button:hover {
    filter: brightness(1.05);
  }

  .navbar-item {
    cursor: pointer;
    width: 100%;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 8px 12px;
    color: #a5a7ac;
    border-radius: 4px;
    font-weight: 410;
    transition-duration: 0.2s;
    transition-property: all;
    text-decoration: none;
  }

  .navbar-item:hover {
    background: hsla(0,0%,100%,.08);
    color: #f7f8f8;
  }

  .navbar-item:hover * {
    color: #f7f8f8;
  }

  .navbar-item a {
    transition-duration: 0.2s;
    transition-property: all;
    color: #a5a7ac;
    text-decoration: none;
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
