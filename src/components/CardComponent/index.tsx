import React from 'react';
import { List, TodoList } from '../../store/trelloStore/initialSate';
import { Card } from 'antd';
import AddData from '../AddData';
import TrelloComponent from '../Tello';
type CardComponentProps = {
  arr: List;
  dragStartHandlerBlock: (e: React.DragEvent<HTMLDivElement>, arr: List) => void;
  dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dropCardHandler: (e: React.DragEvent<HTMLDivElement>, arr: List) => void;
  dragStartHandler: (e: React.DragEvent<HTMLDivElement>, element: TodoList) => void;
  dropHandler: (e: React.DragEvent<HTMLDivElement>, element: TodoList) => void;
  edit: (element: TodoList) => void;
  isAddingCard: boolean;
  addingCardListId: string | null;
  setNewCardTitle: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodoToList: (Id: string) => void;
  handleCancel: () => void;
  handleAddCard: (listId: string) => void;
};
const CardComponent: React.FC<CardComponentProps> = ({
  arr,
  dragStartHandlerBlock,
  dropCardHandler,
  dragStartHandler,
  dragOverHandler,
  dropHandler,
  edit,
  isAddingCard,
  addingCardListId,
  setNewCardTitle,
  handleAddTodoToList,
  handleCancel,
  handleAddCard,
}) => {
  return (
    <div>
      <Card
        className="main__card"
        title={arr.name}
        draggable={true}
        onDragStart={(e) => dragStartHandlerBlock(e, arr)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropCardHandler(e, arr)}
      >
        {arr.todoList.map((element) => {
          return (
            <div
              onDragStart={(e) => dragStartHandler(e, element)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, element)}
              draggable={true}
              key={element.id}
              onClick={() => edit(element)}
            >
              <TrelloComponent images={element.images} title={element.title} collaborators={element?.collaborators} />
            </div>
          );
        })}
        <AddData
          id={arr.id}
          isAddingCard={isAddingCard}
          addingCardListId={addingCardListId}
          setNewCardTitle={setNewCardTitle}
          handleAddTodoToList={handleAddTodoToList}
          handleCancel={handleCancel}
          handleAddCard={handleAddCard}
        />
      </Card>
    </div>
  );
};

export default CardComponent;
