export interface Transaction {
    id: string;
    account_id: string;
    transaction_type: "deposit" | "withdraw";
    amount: {
        amount: number;
        currency: string;
    }
    created_at: string;
    comment: string;
}