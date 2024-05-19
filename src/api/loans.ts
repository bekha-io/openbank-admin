import type { LoanInstallment } from "../interfaces/LoanInstallment";
import instance from "./api";

export async function calculateLoanSchedule(data: {
  repay_starts_at: string;
  amount: number;
  currency: string;
  duration: number;
  interest_rate: number;
}) {
    try {
        let resp = await instance.post("/loans/calculate", data);
        return resp.data as LoanInstallment[];
    } catch (error) {
        
    }
}
