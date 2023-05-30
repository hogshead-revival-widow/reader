<nav
  class="navbar is-transparent is-fixed-top"
  aria-label="main navigation">
  <div class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item">
        <slot name="start" />
      </div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-item">
        <slot name="center" />
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <slot name="end" />
      </div>
    </div>
  </div>
</nav>

<style>
@media screen and (min-width: 300px) and (max-width: 1024px) {
  .navbar > .container {
    align-items: stretch;
    display: flex;
    min-height: 3.25rem;
    width: 100%;
  }
  .navbar-burger {
    display: none;
  }
  .navbar-menu {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
    justify-content: flex-end;
    flex-grow: 1;
    flex-shrink: 0;
  }
  .navbar,
  .navbar-end,
  .navbar-menu,
  .navbar-start {
    display: flex;
    align-items: stretch;
  }

  .navbar-end {
    justify-content: flex-end;
    margin-left: auto;
  }

  .navbar-item {
    display: flex;
    align-items: center;
  }
}
</style>
