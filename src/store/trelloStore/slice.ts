import { initialState } from './initialSate';
import { createSlice } from '@reduxjs/toolkit';

export const cardsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.todo.push(action.payload);
    },
    editCard: (state, action) => {
      const { id, title } = action.payload;
      const cardIndex = state.todo.findIndex((card) => card.id === id);
      if (cardIndex !== -1) {
        state.todo[cardIndex].title = title;
      }
    },
    editText: (state, action) => {
      const { id, text } = action.payload;
      const cardIndex = state.todo.findIndex((card) => card.id === id);
      if (cardIndex !== -1) {
        state.todo[cardIndex].text = text;
      }
    },
    editImage: (state, action) => {
      const { id, image } = action.payload;
      const cardIndex = state.todo.findIndex((card) => card.id === id);
      if (cardIndex !== -1) {
        state.todo[cardIndex].image = image;
      }
    },
    deleteCard: (state, action) => {
      const id = action.payload;
      state.todo = state.todo.filter((card) => card.id !== id);
    },
  },
});
export const { addCard, editCard, editText, editImage, deleteCard } = cardsSlice.actions;
