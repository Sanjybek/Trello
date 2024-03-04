type TitleType = {
  title: string;
  id: number;
  text: string;
  image: string | null;
};
type TypeArr = {
  todo: TitleType[];
};
export const initialState: TypeArr = {
  todo: [],
};
