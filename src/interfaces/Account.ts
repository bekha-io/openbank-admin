export interface Account {
  id: String;
  balance: {
    amount: number;
    currency: String;
  }
  created_at: string;
}
