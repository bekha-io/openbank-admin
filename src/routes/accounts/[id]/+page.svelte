<script lang="ts">
  import { onMount } from "svelte";
  import type { Account } from "../../../interfaces/Account";
  import type { Transaction } from "../../../interfaces/Transaction";
  import Modal from "../../../modals/Modal.svelte";
  import {
    getAccount,
    getAccountTransactions,
    depositAccount,
  } from "../../../api/accounts";
  import { beautifyNumber } from "../../../utils/utils";
  export let data: { id: string };
  import { copy } from "svelte-copy";
  import { invalidateAll } from "$app/navigation";

  let account: Account | undefined;
  let transactions: Transaction[] | undefined;

  let showDepositModal = false;
  let showWithdrawalModal = false;

  let operationAmount: number;
  let operationComment: string;

  onMount(async function () {
    account = await getAccount(data.id);
    transactions = await getAccountTransactions(data.id);
  });

  async function onDepositSubmitted(e: Event) {
    e.preventDefault();
    if (!account) {
      return;
    }
    let transaction = await depositAccount({
      id: account.id.toString(),
      amount: operationAmount,
      currency: account.balance.currency.toString(),
      comment: operationComment,
    });
    if (!transaction) {
      return;
    }

    alert(`Пополнение прошло успешно! ID транзакции: ${transaction.id}`);
    showDepositModal = false;
    // Adding a new transaction and requesting an updated account info
    transactions = [...(transactions as Transaction[]), transaction];
    account = await getAccount(data.id);
  }
</script>

<div>
  {#if account}
    <div class="actions">
      <h1 class="clickable" use:copy={account.id.toString()}>
        {account.id} <i class="fa-regular fa-clipboard"></i>
      </h1>
      <p>
        Остаток на {new Date().toLocaleString()}:
        <b>{account.balance.amount} {account.balance.currency}</b>
      </p>
      <button on:click={(e) => (showDepositModal = !showDepositModal)}
        >Пополнение</button
      >
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
              >{trx.transaction_type == "deposit" ? "+" : "-"}{beautifyNumber(
                trx.amount.amount
              )}</b
            ></td
          >
          <td>{trx.amount.currency}</td>
          <td>{trx.comment || "-"}</td>
        </tr>
      {/each}
      <tr>
        <td></td>
        <td></td>
        <td class="last-row">= {beautifyNumber(account.balance.amount)}</td>
      </tr>
    </table>
  {/if}

  <Modal bind:showModal={showDepositModal}>
    <h3 slot="header">Пополнение счета</h3>
    <form class="modal-form" on:submit={onDepositSubmitted}>
      <input
        bind:value={operationAmount}
        required
        placeholder="Сумма"
        type="number"
        step="0.01"
      />
      <textarea
        bind:value={operationComment}
        placeholder="Комментарий"
        rows="4"
        cols="30"
      ></textarea>
      <button>Пополнить</button>
    </form>
  </Modal>
</div>

<style>
  .last-row {
    border-top: 2px solid;
    font-weight: bold;
  }

  .modal-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>
