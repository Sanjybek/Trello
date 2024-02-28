import React, { useState } from 'react';
import Trello from '../components/trello';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../hook';
import { addCard } from '../store/trelloStore/slice';
const TrelloContainer = () => {
  const [showInput, setShowInput] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.shopReducer.todo);

  const saveTextareaValue = () => {
    if (textareaValue.trim() !== '') {
      const id = Math.random();
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
          <PlusOutlined className="main__click_button" />
          <button className="main__click_button" onClick={toggleInput}>
            Добавить карточку
          </button>
        </div>
      );
    }
  };
  return <Trello cards={cards} addCardTitle={addCardTitle} />;
};
export default TrelloContainer;
