import instance from "./api";
import { type IndividualCustomer } from "../interfaces/Customer";
import type { Account } from "../interfaces/Account";

export async function searchCustomers(lookup: string) {
  let resp = await instance.get(
    "/customers/search?" +
      new URLSearchParams([["phone_number", lookup]]).toString()
  );
  return resp.data as IndividualCustomer[];
}

export async function getCustomer(id: string) {
  try {
    let resp = await instance.get("/customers/" + id);

    if (resp.data.error) {
      throw new Error(resp.data.error);
    }
    return resp.data as IndividualCustomer;
  } catch (error) {
    alert(error);
    throw new Error(error as string);
  }
}

export async function getCustomerAccounts(id: string) {
  try {
    let resp = await instance.get("/customers/" + id + "/accounts");

    if (resp.data.error) {
      throw new Error(resp.data.error);
    }
    return resp.data as Account[];
  } catch (error) {
    alert(error);
    throw new Error(error as string);
  }
}
