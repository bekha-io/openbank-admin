<script lang="ts">
  import type { LoanInstallment } from "../../../interfaces/LoanInstallment";

  let amount: number;
  let currency: string;
  let duration: number;
  let interest_rate: number;
  let repay_starts_at: Date;

  let installments: LoanInstallment[];

  function calculateClicked(e: Event) {
    e.preventDefault();

    fetch(`http://127.0.0.1:8080/v1/loans/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repay_starts_at: new Date(repay_starts_at).toISOString(),
        amount,
        currency,
        duration,
        interest_rate,
      }),
    })
      .then((response) => response.json().then((data) => (installments = data)))
      .catch((err) => alert(err));
  }
</script>

<div>
  <h1>Кредитный калькулятор</h1>
  <div class="inputs">
    <input bind:value={amount} type="number" placeholder="Сумма кредита" />
    <input bind:value={currency} type="text" placeholder="Валюта" />
    <input
      bind:value={duration}
      type="number"
      placeholder="Срок кредита (в мес.)"
    />
    <input
      bind:value={interest_rate}
      max="1"
      step="0.05"
      type="number"
      placeholder="Процентная ставка (0.01 - 1)"
    />
    <input
      on:change
      bind:value={repay_starts_at}
      type="date"
      placeholder="Дата первого погашения"
    />
  </div>
  <input on:click={calculateClicked} type="submit" value="Рассчитать" />
  {#if installments}
    <table>
      <tr>
        <th>Дата</th>
        <th>Сумма к оплате</th>
        <th>Процент</th>
        <th>Тело кредита</th>
        <th>Остаток после</th>
      </tr>
      {#each installments as inst}
        <tr>
          <td>{new Date(inst.repay_at).toLocaleDateString()}</td>
          <td
            >{inst.repay_amount.amount.toFixed(2)}
            {inst.repay_amount.currency}</td
          >
          <td>{inst.interest.toFixed(2)} {inst.repay_amount.currency}</td>
          <td>{inst.principal.toFixed(2)} {inst.repay_amount.currency}</td>
          <td
            >{inst.repay_amount_after.amount}
            {inst.repay_amount_after.currency}</td
          >
        </tr>
      {/each}
    </table>
  {/if}
</div>

<style>
  .inputs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 8px;
  }
  table {
    width: 100%;
  }
</style>
