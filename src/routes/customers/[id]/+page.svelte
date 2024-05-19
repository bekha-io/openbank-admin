<script lang="ts">
  import { onMount } from "svelte";
  import type { IndividualCustomer } from "../../../interfaces/Customer";
  import type { Account } from "../../../interfaces/Account";
  import {getCustomer, getCustomerAccounts} from "../../../api/customers";
  export let data: { id: string };

  let customer: IndividualCustomer;
  let accounts: Account[];
  onMount(async function () {
    customer = await getCustomer(data.id);
    accounts = await getCustomerAccounts(data.id);
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
