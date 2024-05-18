<script lang="ts">
  import { onMount } from "svelte";
  import type { IndividualCustomer } from "../../../interfaces/Customer";
  import type { Account } from "../../../interfaces/Account";
  export let data: { id: string };

  let customer: IndividualCustomer;
  let accounts: Account[];
  onMount(function () {
    fetch(`http://127.0.0.1:8080/v1/customers/${data.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => (customer = res))
      .catch((err) => console.error(err));

    fetch(`http://127.0.0.1:8080/v1/customers/${data.id}/accounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => (accounts = res))
      .catch((err) => console.error(err));
  });
</script>

<div>
  {#if customer}
    <h1>{customer.last_name} {customer.first_name} {customer.middle_name}</h1>
    <p>ID: {data.id}</p>
  {/if}

  {#if accounts}
    <table>
        <tr>
            <th>Номер счета</th>
            <th>Баланс</th>
            <th>Валюта</th>
            <th>Дата создания</th>
        </tr>
        {#each accounts as account }
        <tr>
            <td><a href='/accounts/{account.id}'>{account.id}</a></td>
            <td>{account.balance.amount.toFixed(2)}</td>
            <td>{account.balance.currency}</td>
            <td>{new Date(account.created_at).toLocaleString()}</td>
        </tr>
        {/each}
    </table>
  {/if}
</div>


<style>
    table {
        width: 100%;
    }
</style>
