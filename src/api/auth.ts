import { AxiosError } from "axios";
import type { Employee } from "../interfaces/Employee";
import instance from "./api";
import { humanizeError } from "../locales/errors";

export async function authenticate(email: string, password: string) {
  try {
    let resp = await instance.post(
      "/employees/auth",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return resp.data as { employee: Employee; token: string };
  } catch (error) {
    let apiResp = (error as AxiosError<{ error: string }>).response;
    if (apiResp?.data.error) {
      alert(humanizeError(apiResp?.data.error));
    }
  }
}
