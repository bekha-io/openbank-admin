<script lang="ts">
  import { writable } from "svelte/store";
  import { type Account } from "../../../interfaces/Account";

  let options: Account[] = [];
  let flt: String;
  let lastFlt: String;

  let amount: number;
  let currency: String;
  let comment: String;
  let operation: String;

  function onFormSubmit(e: Event) {
    e.preventDefault();

    fetch("http://127.0.0.1:8080/v1/accounts/" + flt + "/" + operation, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: amount,
            currency: currency,
            comment: comment
        })
    }).then(response => response.json()).then(body => {
        if (body.error != null) {
            alert(body.error);
            return
        }

        alert("Транзакция успешно выполнена! ID: " + body.id);
    }).catch(error => {
        alert(error);
    })
  }

  setInterval(() => {
    if (lastFlt == flt || flt == null) {
      return;
    }

    fetch(
      "http://127.0.0.1:8080/v1/accounts/search?" +
        new URLSearchParams([["id", flt.toString()]]),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((items) => {
        if (items.length == 0) {
          return;
        }

        if (items.error != null) {
          return;
        }

        options = items;
        console.log(options);
      });
    lastFlt = flt;
  }, 1000);
</script>

<h1>Создать новую операцию по счету</h1>

<form on:submit={onFormSubmit}>
  <div class="search">
    <input
      required
      list="accounts"
      bind:value={flt}
      placeholder="Поиск по номеру счета..."
    />
    <div class="options">
      <datalist id="accounts">
        {#each options as account}
          <option value={account.id}>
            {" (" +
              account.balance.amount +
              " " +
              account.balance.currency +
              ")"}
          </option>{/each}
      </datalist>
    </div>
  </div>

  <input inputmode="decimal" bind:value={amount} placeholder="Сумма" required />
  <select bind:value={currency} name="currencies" id="currencies" required>
    <option value="TJS">TJS</option>
    <option value="USD">USD</option>
    <option value="RUB">RUB</option>
    <option value="AED">AED</option>
  </select>

  <select bind:value={operation} name="operation-types" id="operation-types" required>
    <option value="deposit">Пополнение</option>
    <option value="withdraw">Снятие</option>
  </select>

  <textarea bind:value={comment} rows="5" placeholder="Комментарий к транзакции"></textarea>

  <button type="submit">Отправить</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .search {
    display: flex;
    flex-direction: column;
  }

  .options > input {
    opacity: 70%;
    cursor: pointer;
  }
</style>
