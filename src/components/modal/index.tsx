import React from 'react';
import { Button, Card, Modal } from 'antd';
import { FileImageOutlined, PlusOutlined } from '@ant-design/icons';

type ModalTyp = {
  handleCancel: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  saveChanges: () => void;
  descriptions: () => void;
  hendleImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addImage: () => void;
  isModalOpen: boolean;
  newImage: string | null;
  modalTitle: string;
  isDescriptionVisible: boolean;
  newText: string;
  modalId: number | null | undefined;
  deleteData: (modalId: number | null | undefined) => void;
};

const ModalBlock: React.FC<ModalTyp> = ({
  deleteData,
  modalId,
  handleCancel,
  handleInputChange,
  handleTextChange,
  saveChanges,
  descriptions,
  hendleImg,
  addImage,
  isModalOpen,
  newImage,
  modalTitle,
  isDescriptionVisible,
  newText,
}) => {
  return (
    <Modal className="modal" open={isModalOpen} onCancel={handleCancel}>
      <div className="maodal__block">
        <div>
          <div className="modal__images">{newImage && <img className="modal__image" src={newImage} />}</div>
          <textarea className="modal__textarea" value={modalTitle} onChange={handleInputChange} />
        </div>
        <div className="modal__title">
          <h4 className="title">Описание</h4>
          <p className="modal__description" onClick={() => descriptions()}>
            Добавить более подробное описание…
          </p>
        </div>
        <div className="modal__icon">
          <label htmlFor="file__image">
            <FileImageOutlined className="icon" />
            <PlusOutlined className="icon" />
            <input type="file" value={''} onChange={hendleImg} id="file__image" hidden />
            <div className="modal__save_button">
              <Button onClick={handleCancel}>Отмена</Button>
              <Button onClick={() => addImage()}>Сохранить</Button>
            </div>
          </label>
        </div>
        {isDescriptionVisible && (
          <div className="description">
            <textarea
              typeof="file"
              className="modal__textarea_2"
              value={newText}
              onChange={handleTextChange}
            ></textarea>
            <div className="modal__save_button">
              <Button onClick={() => descriptions()}>Отмена</Button>
              <Button onClick={saveChanges}>Сохранить</Button>
            </div>
          </div>
        )}
        <Button onClick={() => deleteData(modalId)} className="modal__delete_button">
          Удалить
        </Button>
      </div>
    </Modal>
  );
};

export default ModalBlock;
