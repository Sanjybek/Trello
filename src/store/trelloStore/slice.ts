import { initialState } from './initialSate';
import { createSlice } from '@reduxjs/toolkit';

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.todo.push(action.payload);
    },
  },
});
export const { addCard } = cardsSlice.actions;
