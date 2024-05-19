import type { AxiosError } from "axios";
import type { Employee } from "../interfaces/Employee";
import instance from "./api";
import { humanizeError } from "../locales/errors";

export async function searchEmployees(lookup: string) {
  try {
    let resp = await instance.get(
      "/employees/search?" + new URLSearchParams([["query", lookup]])
    );
    return resp.data as Employee[];
  } catch (error) {
    let apiResp = await (error as AxiosError<{ error: string }>).response;
    if (apiResp?.data.error) {
      alert(humanizeError(apiResp?.data.error));
    }
  }
}
