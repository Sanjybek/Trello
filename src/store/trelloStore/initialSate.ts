export type CollaboratorToAdd = {
  id: string;
  name: string;
  gmail: string;
};
export type ImagesTyp = {
  id: string;
  image: string;
};

export type TodoList = {
  title: string;
  id: string;
  text: string;
  images?: ImagesTyp[];
  collaborators?: CollaboratorToAdd[];
};

export type List = {
  id: string;
  name: string;
  todoList: TodoList[];
};

export const mockList: List[] = [
  {
    id: '1',
    name: 'TodoList',
    todoList: [],
  },
  {
    id: '2',
    name: 'Done',
    todoList: [],
  },
  {
    id: '3',
    name: 'Testing',
    todoList: [],
  },
  {
    id: '4',
    name: 'In progress',
    todoList: [],
  },
];

type TypeArr = {
  data: List[];
};
export const initialState: TypeArr = {
  data: mockList,
};
