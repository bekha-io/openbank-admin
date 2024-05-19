import type { Account } from "../interfaces/Account";
import type { Transaction } from "../interfaces/Transaction";
import instance from "./api";



export interface ExecuteAccountOperation {
    id: string
    amount: number
    currency: string
    comment?: string
}


export async function getAccount(id: string) {
  try {
    let resp = await instance.get("/accounts/" + id);

    if (resp.data.error) {
      throw new Error(resp.data.error);
    }
    return resp.data as Account;
  } catch (error) {
    alert(error);
  }
}

export async function getAccountTransactions(id: string) {
  try {
    let resp = await instance.get("/accounts/" + id + "/transactions");

    if (resp.data.error) {
      throw new Error(resp.data.error);
    }
    return resp.data as Transaction[];
  } catch (error) {
    alert(error);
  }
}


export async function depositAccount(params: ExecuteAccountOperation) {
    try {
    let resp = await instance.post("/accounts/" + params.id + "/deposit", {
        amount: params.amount,
        currency: params.currency,
        comment: params.comment || null
    })

    if (resp.data.error) {
        throw new Error(resp.data.error);
    }

    return resp.data as Transaction;

    } catch (error) {
        alert(error);
    }
}


export async function withdrawAccount(params: ExecuteAccountOperation) {
    try {
    let resp = await instance.post("/accounts/" + params.id + "/withdraw", {
        amount: params.amount,
        currency: params.currency,
        comment: params.comment || null
    })

    if (resp.data.error) {
        throw new Error(resp.data.error);
    }

    return resp.data as Transaction;

    } catch (error) {
        alert(error);
    }
}