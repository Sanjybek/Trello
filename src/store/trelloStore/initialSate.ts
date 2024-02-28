type titleType = {
  title: string;
  id: number;
};
type TypeArr = {
  todo: titleType[];
};
export const initialState: TypeArr = {
  todo: [],
};
