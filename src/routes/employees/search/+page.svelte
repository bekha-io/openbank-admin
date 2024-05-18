<script lang="ts">
  import type { Employee } from "../../../interfaces/Employee";

  let lookup: string;
  let lastLookup: string;

  let employees: Employee[];

  setInterval(() => {
    if (lastLookup == lookup || lookup == null) {
      return;
    }

    fetch(
      "http://127.0.0.1:8080/v1/employees/search?" +
        new URLSearchParams([["query", lookup.toString()]]),
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

        employees = items;
      });
    lastLookup = lookup;
  }, 1000);
</script>

<div>
  <h1>Поиск сотрудников</h1>
  <input bind:value={lookup} placeholder="Поиск сотрудников..." />
  <table>
    <tr>
      <th>ID</th>
      <th>ФИО</th>
      <th>Email</th>
    </tr>
    {#if employees}
      {#each employees as emp}
        <tr>
          <td>{emp.id}</td>
          <td>{emp.last_name} {emp.first_name} {emp.middle_name}</td>
          <td>{emp.email}</td>
        </tr>
      {/each}
    {/if}
  </table>
</div>


<style>
    table {
        width: 100%;
    }
</style>