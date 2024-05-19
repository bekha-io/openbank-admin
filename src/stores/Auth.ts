import { writable } from "svelte/store";
import type { Employee } from "../interfaces/Employee";
import { persisted } from "svelte-persisted-store";

export let contextUser = persisted<Employee | null>('contextUser', null);