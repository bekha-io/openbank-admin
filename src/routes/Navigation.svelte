<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { get } from "svelte/store";
  import { contextUser } from "../stores/Auth";

  let user = get(contextUser);

  function onLogoutClicked(e: Event) {
    e.preventDefault();
    contextUser.set(null);
    localStorage.setItem("token", "");
    goto("/auth");
  }
</script>

<div class="navigation">
  <div class="profile-inline">
      <img class="avatar" src="https://static.thenounproject.com/png/4035892-200.png" width="32" />
    <div class="name">
      {user?.last_name + " " + user?.first_name || user?.email}
    </div>
  </div>
  <div class="section">
    <h3><i class="fa-solid fa-users"></i> Клиенты</h3>
    <a
      aria-current={$page.url.pathname === "/customers/search"
        ? "page"
        : undefined}
      href="/customers/search">Поиск клиентов</a
    >
    <a
      aria-current={$page.url.pathname === "/customers/create"
        ? "page"
        : undefined}
      href="/customers/create">Создание клиента</a
    >
  </div>
  <div class="section">
    <h3><i class="fa-solid fa-vault"></i> Счета</h3>
    <a
      aria-current={$page.url.pathname === "/accounts/create"
        ? "page"
        : undefined}
      href="/accounts/create">Создание счета</a
    >
  </div>

  <div class="section">
    <h3><i class="fa-solid fa-hand-holding-dollar"></i> Кредиты</h3>
    <a aria-current={$page.url.pathname === "/loans/calculator"
	? "page"
	: undefined} href="/loans/calculator">Кредитный калькулятор</a>
  </div>

  <div class="section">
    <h3><i class="fa-solid fa-circle-user"></i> Сотрудники</h3>
    <a href="/employees/search">Поиск сотрудников</a>
  </div>

  <a on:click={onLogoutClicked} class="logout" href="/logout">Выйти</a>
</div>

<style>
  .navigation {
    display: flex;
    flex-direction: column;
    background-color: rgb(240, 240, 240);
    padding: 18px 14px;
    min-width: 200px;
    gap: 12px;
  }

  .profile-inline {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .profile-inline > .name {
    font-weight: 600;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .section > h3 {
    line-height: 12px;
  }

  .section > a {
    text-decoration: none;
  }

  .section > a:hover {
    opacity: 0.6;
    transition: 0.5s;
  }

  .logout {
    position: fixed;
    bottom: 24px;
    font-weight: bold;
  }

  .avatar {
    /* This image is 687 wide by 1024 tall, similar to your aspect ratio */
    background-image: url("https://i.sstatic.net/Dj7eP.jpg");

    /* fill the container, preserving aspect ratio, and cropping to fit */
    background-size: cover;

    /* center the image vertically and horizontally */
    background-position: top center;

    /* round the edges to a circle with border radius 1/2 container size */
    border-radius: 50%;
  }
</style>
