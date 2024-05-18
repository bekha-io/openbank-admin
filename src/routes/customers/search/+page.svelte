<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import type { IndividualCustomer } from "../../../interfaces/Customer";

  let lookup: String;
  let lastLookup: String;

  let customers: IndividualCustomer[] = [];

  setInterval(() => {
    if (lastLookup == lookup || lookup == null) {
      return;
    }

    fetch(
      "http://127.0.0.1:8080/v1/customers/search?" +
        new URLSearchParams([["phone_number", lookup.toString()]]),
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

        customers = items;
      });
    lastLookup = lookup;
  }, 1000);
</script>

<div class="view">
  <h1>Поиск клиентов</h1>
  <input
    list="customers"
    bind:value={lookup}
    placeholder="Поиск по номеру телефона..."
  />

  <div class="customers-found">
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Номер телефона</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
        </tr>
        { #each customers as customer }
        <tr>
            <td><a href={"/customers/" + customer.id}>{customer?.id}</a></td>
            <td>{customer?.phone_number}</td>
            <td>{customer?.last_name}</td>
            <td>{customer?.first_name}</td>
            <td>{customer?.middle_name}</td>
        </tr>
        {/each}
    </table>
  </div>
</div>

<style>
  .view {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .customers-found {
    margin-top: 24px;
  }

  table {
    width: 100%;
  }

</style>
