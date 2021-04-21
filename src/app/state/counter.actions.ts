import { createAction } from "@ngrx/store";

//Създаваме конкретните екшъни за конретните действия при кликъне на бутоните
export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');
