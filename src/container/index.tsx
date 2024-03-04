import { useState } from 'react';
import Trello from '../components/trello';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../hook';
import { addCard, deleteCard, editCard, editImage, editText } from '../store/trelloStore/slice';
const TrelloContainer = () => {
  const [showInput, setShowInput] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState<number | null | undefined>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [newText, setNewText] = useState('');
  const [newImage, setNewImage] = useState<string | null>('');

  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.shopReducer.todo);

  const saveTextareaValue = () => {
    if (textareaValue.trim() !== '') {
      const id = Date.now();
      dispatch(addCard({ id, title: textareaValue }));
      setTextareaValue('');
    }
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const addCardTitle = () => {
    if (showInput) {
      return (
        <div className="main__save">
          <textarea
            onChange={(e) => setTextareaValue(e.target.value)}
            className="main__textarea"
            placeholder="Введите заголовок для этой карточки"
          />
          <div className="main__save_gap" onClick={toggleInput}>
            <CloseOutlined className="main__button" />
            <Button onClick={() => saveTextareaValue()} type="primary">
              Добавить карточку
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="main__click_add">
          <PlusOutlined className="main__click_button" onClick={toggleInput} />
          <button className="main__click_button" onClick={toggleInput}>
            Добавить карточку
          </button>
        </div>
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  const edit = (id: number, title: string, text: string, image: string | null) => {
    setModalId(id);
    setModalTitle(title);
    setNewText(text);
    setNewImage(image);
    setIsModalOpen(true);
  };

  const saveChanges = () => {
    if (modalId) {
      dispatch(editText({ id: modalId, title: modalTitle, text: newText }));
    }
    setIsDescriptionVisible(false);
  };
  const descriptions = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };
  const hendleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImage(imageUrl);
    }
  };

  const addImage = () => {
    if (modalId) {
      dispatch(editImage({ id: modalId, image: newImage }));
    }
  };

  const deleteData = (id: number | null | undefined) => {
    if (id) {
      const confirmDelete = window.confirm('Вы уверены, что хотите удалить карточку?');
      if (confirmDelete) {
        dispatch(deleteCard(id));
        setIsModalOpen(false);
      }
    }
  };

  return (
    <Trello
      deleteData={deleteData}
      edit={edit}
      cards={cards}
      addCardTitle={addCardTitle}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
      handleTextChange={handleTextChange}
      saveChanges={saveChanges}
      descriptions={descriptions}
      hendleImg={hendleImg}
      addImage={addImage}
      isModalOpen={isModalOpen}
      newImage={newImage}
      modalTitle={modalTitle}
      isDescriptionVisible={isDescriptionVisible}
      newText={newText}
      modalId={modalId}
    />
  );
};
export default TrelloContainer;
