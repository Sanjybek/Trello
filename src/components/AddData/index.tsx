import { Button } from 'antd';

type AddDataTyp = {
  id: string;
  isAddingCard: boolean;
  addingCardListId: string | null;
  setNewCardTitle: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodoToList: (id: string) => void;
  handleCancel: () => void;
  handleAddCard: (id: string) => void;
};

const AddData: React.FC<AddDataTyp> = ({
  id,
  isAddingCard,
  addingCardListId,
  setNewCardTitle,
  handleAddTodoToList,
  handleCancel,
  handleAddCard,
}) => {
  return (
    <div>
      {isAddingCard && addingCardListId === id ? (
        <div>
          <textarea
            placeholder="Введите заголовок для этой карточки"
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="main__textarea"
          />
          <div className="main__save_add">
            <Button type="primary" onClick={() => handleAddTodoToList(id)}>
              Добавить карточку
            </Button>
            <Button onClick={handleCancel}>x</Button>
          </div>
        </div>
      ) : (
        <div className="main__click_add" onClick={() => handleAddCard(id)}>
          + Добавить карточку
        </div>
      )}
    </div>
  );
};

export default AddData;
