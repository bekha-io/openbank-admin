import type { Money } from "./Money";

export interface LoanInstallment {
  repay_amount: Money;
  principal: number;
  interest: number;
  repay_amount_after: Money;
  repay_at: Date;
  is_repaid: boolean;
}
