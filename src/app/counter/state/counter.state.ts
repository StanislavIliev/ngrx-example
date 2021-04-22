//Създаване на интерфейс описващ обекта
export interface CounterState {
    counter: number;
    channelName: string;
}

//Създаваме първоначалното състояния на брояча
export const initialState = {
    counter: 4,
    channelName: 'Leela Web Dev'
};
