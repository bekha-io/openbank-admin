<script lang="ts">
  import { authenticate } from "../../api/auth";
  import { goto } from "$app/navigation";
  import { contextUser } from "../../stores/Auth";

  let email: string;
  let password: string;

  async function onFormSubmit(e: Event) {
    e.preventDefault();
    let resp = await authenticate(email, password);
    if (resp?.employee && resp?.token) {
      contextUser.set(resp.employee);
      localStorage.setItem('token', resp.token);
      goto("/customers/search");
    }
  }
</script>

<div>
  <h1>Вход</h1>
  <p>
    Для работы с системой, пожалуйста, введите электронную почту и пароль. Для
    получения доступа обратитесь к администратору систему
  </p>
  <form method="post" on:submit={onFormSubmit}>
    <div class="input-group">
      <label for="email">Электронная почта</label>
      <input type="email" name="email" id="email" bind:value={email} />
    </div>
    <div class="input-group">
      <label for="password">Пароль</label>
      <input
        type="password"
        name="password"
        id="password"
        bind:value={password}
      />
    </div>
    <button type="submit">Войти</button>
  </form>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }

  form > * {
    width: 300px;
  }

  .input-group {
    min-width: 200px;
    max-width: 400px;
    display: flex;
    gap: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .input-group > * {
    left: 0;
    width: 100%;
  }
</style>
