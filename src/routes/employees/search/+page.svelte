<script lang="ts">
  import type { Employee } from "../../../interfaces/Employee";
  import { searchEmployees } from "../../../api/employees";

  let lookup: string;
  let lastLookup: string;

  let employees: Employee[];

  setInterval(async () => {
    if (lastLookup == lookup || lookup == null) {
      return;
    }
    try {
      let items = await searchEmployees(lookup);

      if (items) {
        employees = items;
      }
    } finally {
      lastLookup = lookup;
    }
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
