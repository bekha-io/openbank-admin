<script lang="ts">
  import { onMount } from "svelte";
  import type { Account } from "../../../interfaces/Account";
  import type { Transaction } from "../../../interfaces/Transaction";
  import Modal from "../../../modals/Modal.svelte";

  export let data: { id: string };

  let account: Account;
  let transactions: Transaction[];

  let showDepositModal = false;
  let showWithdrawalModal = false;

  onMount(function () {
    fetch(`http://127.0.0.1:8080/v1/accounts/${data.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => (account = json))
      .catch((err) => console.log(err));

    fetch(`http://127.0.0.1:8080/v1/accounts/${data.id}/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => (transactions = json))
      .catch((err) => alert(err));
  });
</script>

<div>
  {#if account}
    <div class="actions">
      <h1>{account.id}</h1>
      <p>Остаток на {new Date().toLocaleString()}: <b>{account.balance.amount} {account.balance.currency}</b></p>
      <button on:click={(e) => showDepositModal = !showDepositModal}>Пополнение</button>
      <button>Снятие</button>
    </div>
  {:else}
    <h1>Аккаунт не найден!</h1>
  {/if}

  {#if transactions}
    <table>
      <tr>
        <th>ID</th>
        <th>Дата операции</th>
        <th>Сумма</th>
        <th>Валюта</th>
        <th>Комментарий</th>
      </tr>
      {#each transactions as trx}
        <tr>
          <td>{trx.id}</td>
          <td>{new Date(trx.created_at).toLocaleString()}</td>
          <td
            ><b
              style="color: {trx.transaction_type == 'deposit'
                ? 'green'
                : 'red'}"
              >{trx.transaction_type == "deposit"
                ? "+"
                : "-"}{trx.amount.amount.toFixed(2)}</b
            ></td
          >
          <td>{trx.amount.currency}</td>
          <td>{trx.comment || "-"}</td>
        </tr>
      {/each}
      <tr>
        <td></td>
        <td></td>
        <td class="last-row">{account.balance.amount}</td>
      </tr>
    </table>
  {/if}

  <Modal bind:showModal={showDepositModal}>
    <h3 slot="header">Пополнение счета</h3>
    <form>
    <input placeholder="Сумма" />
    <input placeholder="Валюта" />
    <button>Пополнить</button>        
    </form>
  </Modal>
</div>


<style>
    .last-row {
        border-top: 2px solid;
        font-weight: bold;
    }
</style>