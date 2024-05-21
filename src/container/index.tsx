import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { CollaboratorToAdd, ImagesTyp, List, TodoList } from '../store/trelloStore/initialSate';
import '../components/Tello/style.scss';
import ModalBlock from '../components/Modal';
import {
  addTodoToList,
  deleteCard,
  dropHandlerBlockFunction,
  editCard,
  editImage,
  editText,
  moveTodoToList,
  moveTodoToList2,
} from '../store/trelloStore/slice';
import CardComponent from '../components/CardComponent';

const TrelloContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState<string | null | undefined>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [newText, setNewText] = useState('');
  const [newImage, setNewImage] = useState<ImagesTyp[] | undefined>([]);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [currentCard, setCurrentCard] = useState<TodoList | null>(null);
  const [addingCardListId, setAddingCardListId] = useState<string | null>(null);
  const [newCollaborator, setNewCollaborator] = useState<CollaboratorToAdd[] | undefined>([]);
  const [currentBlock, setCurrentBlock] = useState<List | null>(null);

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.shopReducer.data);
  const handleSubmitCard = (Id: string) => {
    if (newCardTitle.trim() !== '') {
      const todo = {
        title: newCardTitle.trim(),
        id: Date.now().toString(),
      };
      dispatch(addTodoToList({ Id, todo }));
      setIsAddingCard(false);
    }
  };

  const handleAddTodoToList = (Id: string) => {
    handleSubmitCard(Id);
  };

  const handleAddCard = (listId: string) => {
    setAddingCardListId(listId);
    setIsAddingCard(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsAddingCard(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = event.target.value;
    setModalTitle(newTitle);
    if (modalId !== null) {
      dispatch(editCard({ id: modalId, title: newTitle }));
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(event.target.value);
  };

  const edit = (elemen: TodoList) => {
    setModalId(elemen.id);
    setModalTitle(elemen.title);
    setNewText(elemen.text);
    setNewImage(elemen.images);
    setNewCollaborator(elemen?.collaborators);
    setIsModalOpen(true);
    setIsDescriptionVisible(false);
  };

  const descriptions = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  const saveChanges = () => {
    dispatch(editText({ id: modalId, text: newText }));
    setIsDescriptionVisible(false);
  };

  const hendleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newImageItem: ImagesTyp = { id: Date.now().toString(), image: imageUrl };
      setNewImage((prevImages = []) => [...prevImages, newImageItem]);
      if (modalId) {
        dispatch(editImage({ id: modalId, image: newImageItem }));
      }
    }
  };

  const deleteData = (id: string | null | undefined) => {
    if (id) {
      const confirmDelete = window.confirm('Вы уверены, что хотите удалить карточку?');
      if (confirmDelete) {
        dispatch(deleteCard(id));
        setIsModalOpen(false);
      }
    }
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, element: TodoList) => {
    setCurrentCard(element);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, element: TodoList) => {
    if (currentCard) {
      dispatch(moveTodoToList({ sourceId: currentCard.id, destinationId: element.id }));
    }
    e.preventDefault();
  };

  const dragStartHandlerBlock = (e: React.DragEvent<HTMLDivElement>, arr: List) => {
    setCurrentBlock(arr);
  };

  const dropCardHandler = (e: React.DragEvent<HTMLDivElement>, arr: List) => {
    if (currentCard !== null) {
      dispatch(moveTodoToList2({ sourceId: currentCard.id, destinationId: arr.id }));
      setCurrentCard(null);
    } else if (currentBlock !== null) {
      dispatch(dropHandlerBlockFunction({ arr, currentBlock }));
      setCurrentBlock(null);
    }
  };
  console.log(data);

  return (
    <div className="main">
      <div className="container">
        <div className="main__grid">
          {data.map((arr) => {
            return (
              <CardComponent
                arr={arr}
                dragStartHandlerBlock={dragStartHandlerBlock}
                dragOverHandler={dragOverHandler}
                dropCardHandler={dropCardHandler}
                dragStartHandler={dragStartHandler}
                dropHandler={dropHandler}
                edit={edit}
                isAddingCard={isAddingCard}
                addingCardListId={addingCardListId}
                setNewCardTitle={setNewCardTitle}
                handleAddTodoToList={handleAddTodoToList}
                handleCancel={handleCancel}
                handleAddCard={handleAddCard}
                key={arr.id}
              />
            );
          })}
          <ModalBlock
            setNewImage={setNewImage}
            newCollaborator={newCollaborator!}
            deleteData={deleteData}
            modalId={modalId}
            handleCancel={handleCancel}
            handleInputChange={handleInputChange}
            handleTextChange={handleTextChange}
            saveChanges={saveChanges}
            descriptions={descriptions}
            hendleImg={hendleImg}
            isModalOpen={isModalOpen}
            newImage={newImage}
            modalTitle={modalTitle}
            isDescriptionVisible={isDescriptionVisible}
            newText={newText}
            setNewCollaborator={setNewCollaborator!}
          />
        </div>
      </div>
    </div>
  );
};
export default TrelloContainer;
