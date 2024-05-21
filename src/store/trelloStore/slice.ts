import { initialState } from './initialSate';
import { createSlice } from '@reduxjs/toolkit';

export const cardsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addTodoToList: (state, action) => {
      const { Id, todo } = action.payload;
      const listIndex = state.data.findIndex((lis) => lis.id === Id);
      if (listIndex !== -1) {
        state.data[listIndex].todoList.push(todo);
      }
    },
    moveTodoToList: (state, action) => {
      const { sourceId, destinationId } = action.payload;
      const sourceListIndex = state.data.findIndex((list) => list.todoList.some((todo) => todo.id === sourceId));
      const destinationListIndex = state.data.findIndex((list) =>
        list.todoList.some((todo) => todo.id === destinationId),
      );
      if (sourceListIndex !== -1 && destinationListIndex !== -1) {
        const sourceList = state.data[sourceListIndex].todoList;
        const destinationList = state.data[destinationListIndex].todoList;
        const sourceTodoIndex = sourceList.findIndex((todo) => todo.id === sourceId);
        const destinationTodoIndex = destinationList.findIndex((todo) => todo.id === destinationId);
        const movedTodo = sourceList[sourceTodoIndex];
        sourceList.splice(sourceTodoIndex, 1);
        destinationList.splice(destinationTodoIndex, 0, movedTodo);
      }
    },
    moveTodoToList2: (state, action) => {
      const { sourceId, destinationId } = action.payload;
      const sourceList = state.data.find((list) => list.todoList.some((todo) => todo.id === sourceId));
      const destinationList = state.data.find((list) => list.id === destinationId);
      if (sourceList && destinationList && sourceList !== destinationList) {
        const sourceTodoIndex = sourceList.todoList.findIndex((todo) => todo.id === sourceId);
        if (sourceTodoIndex !== -1) {
          const movedTodo = sourceList.todoList.splice(sourceTodoIndex, 1)[0];
          destinationList.todoList.push(movedTodo);
        }
      }
    },
    editCard: (state, action) => {
      const { id, title } = action.payload;
      state.data.forEach((list) => {
        const card = list.todoList.find((e) => e.id === id);
        if (card) {
          card.title = title;
        }
      });
    },
    editText: (state, action) => {
      const { id, text } = action.payload;
      state.data.forEach((list) => {
        const card = list.todoList.find((e) => e.id === id);
        if (card) {
          card.text = text;
        }
      });
    },

    editImage: (state, action) => {
      const { id, image } = action.payload;
      console.log(id, image, 'ellllloooo');

      state.data.forEach((list) => {
        const card = list.todoList.find((e) => e.id === id);
        if (card) {
          if (card.images) {
            card.images = [...card.images, image];
          } else {
            card.images = [image];
          }
        }
      });
    },

    addCollaborator: (state, action) => {
      const { listId, collaborator } = action.payload;
      state.data.forEach((list) => {
        const todoIndex = list.todoList.findIndex((todo) => todo.id === listId);
        if (todoIndex !== -1) {
          const todo = list.todoList[todoIndex];
          if (todo.collaborators) {
            if (!todo.collaborators.some((c) => c.id === collaborator.id)) {
              todo.collaborators.push(collaborator);
            }
          } else {
            todo.collaborators = [collaborator];
          }
        }
      });
    },
    removeCollaborator: (state, action) => {
      const { listId, collaboratorId } = action.payload;
      state.data.forEach((list) => {
        const todoIndex = list.todoList.findIndex((todo) => todo.id === listId);
        if (todoIndex !== -1) {
          const todo = list.todoList[todoIndex];
          if (todo.collaborators) {
            todo.collaborators = todo.collaborators.filter((c) => c.id !== collaboratorId);
          }
        }
      });
    },
    removeCollaboratorFromCard: (state, action) => {
      const { cardId, collaboratorId } = action.payload;
      const card = state.data.flatMap((list) => list.todoList).find((todo) => todo.id === cardId);
      if (card && card.collaborators) {
        card.collaborators = card.collaborators.filter((collaborator) => collaborator.id !== collaboratorId);
      }
    },

    removeImageById: (state, action) => {
      const { cardId, imageId } = action.payload;
      const card = state.data.flatMap((list) => list.todoList).find((todo) => todo.id === cardId);
      if (card && card.images) {
        card.images = card.images.filter((image) => image.id !== imageId);
      }
    },

    deleteCard: (state, action) => {
      const id = action.payload;
      state.data.forEach((list) => {
        list.todoList = list.todoList.filter((e) => e.id !== id);
      });
    },
    dropHandlerBlockFunction: (state, action) => {
      const { arr, currentBlock } = action.payload;
      state.data = state.data.map((c) => {
        if (c.id === arr.id) {
          return { ...c, id: currentBlock?.id, name: currentBlock?.name, todoList: currentBlock?.todoList };
        }
        if (c.id === currentBlock?.id) {
          return { ...c, id: arr.id, name: arr.name, todoList: arr.todoList };
        }
        return c;
      });
    },
  },
});
export const {
  editCard,
  editText,
  editImage,
  deleteCard,
  addTodoToList,
  moveTodoToList,
  moveTodoToList2,
  removeImageById,
  removeCollaborator,
  addCollaborator,
  dropHandlerBlockFunction,
  removeCollaboratorFromCard,
} = cardsSlice.actions;
