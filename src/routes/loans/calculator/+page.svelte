<script lang="ts">
  import { calculateLoanSchedule } from "../../../api/loans";
  import type { LoanInstallment } from "../../../interfaces/LoanInstallment";

  let amount: number;
  let currency: string;
  let duration: number;
  let interest_rate: number;
  let repay_starts_at: string = new Date().toJSON().slice(0, 10);

  let installments: LoanInstallment[];

  async function calculateClicked(e: Event) {
    e.preventDefault();

    let schedule = await calculateLoanSchedule({
      repay_starts_at: new Date(repay_starts_at).toISOString(),
      amount: amount,
      currency: currency,
      duration: duration,
      interest_rate: interest_rate,
    });

    if (schedule) {
      installments = schedule;
    }
  }
</script>

<div>
  <h1>Кредитный калькулятор</h1>
  <form on:submit={calculateClicked} class="inputs">
    <input
      required
      bind:value={amount}
      type="number"
      placeholder="Сумма кредита"
    />
    <input required bind:value={currency} type="text" placeholder="Валюта" />
    <input
      required
      bind:value={duration}
      type="number"
      placeholder="Срок кредита (в мес.)"
    />
    <input
      required
      bind:value={interest_rate}
      max="1"
      step="0.05"
      type="number"
      placeholder="Процентная ставка (0.01 - 1)"
    />
    <input
      required
      on:change
      bind:value={repay_starts_at}
      type="date"
      placeholder="Дата первого погашения"
    />
    <button type="submit">Рассчитать</button>
  </form>
  {#if installments}
    <table id="installments-schedule">
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
