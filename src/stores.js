import { writable } from "svelte/store";
import { localStore } from "./localStore";

export const alert = writable("Welcom to the To-Do list app!");

const initailTodos = [
  { id: 1, name: "Visit MDN web docs", completed: true },
  { id: 2, name: "Complete the Svelte Tutorial", completed: false },
];

export const todos = localStore("mdn-svelte-todo", initailTodos);
