import { Avatar, Button, Modal, Popconfirm } from 'antd';
import { FileImageOutlined, PlusOutlined, UserAddOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ModalCollaborator from '../ModalCollaborator/index';
import { useAppDispatch } from '../../hook';
import { removeCollaboratorFromCard, removeImageById } from '../../store/trelloStore/slice';
import { CollaboratorToAdd, ImagesTyp } from '../../store/trelloStore/initialSate';
import TextComponent from '../Text';
import ImagesComponents from '../ImagesComponent';

type ModalTyp = {
  handleCancel: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  saveChanges: () => void;
  descriptions: () => void;
  hendleImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isModalOpen: boolean;
  newImage: ImagesTyp[] | undefined;
  modalTitle: string;
  isDescriptionVisible: boolean;
  newText: string;
  modalId: string | null | undefined;
  deleteData: (modalId: string | null | undefined) => void;
  newCollaborator: CollaboratorToAdd[];
  setNewCollaborator: Dispatch<SetStateAction<CollaboratorToAdd[] | undefined>>;
  setNewImage: Dispatch<SetStateAction<ImagesTyp[] | undefined>>;
};

const ModalBlock: React.FC<ModalTyp> = ({
  setNewImage,
  setNewCollaborator,
  newCollaborator,
  deleteData,
  modalId,
  handleCancel,
  handleInputChange,
  handleTextChange,
  saveChanges,
  descriptions,
  hendleImg,
  isModalOpen,
  newImage,
  modalTitle,
  isDescriptionVisible,
  newText,
}) => {
  const [isModalOpenCollaborator, setIsModalOpenCollaborator] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [coll, setColl] = useState<CollaboratorToAdd | null>(null);
  const dispatch = useAppDispatch();

  const deleteImage = (cardId: string, imageId: string) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить картинку?');
    if (confirmDelete) {
      dispatch(removeImageById({ cardId, imageId }));
      const updatedImages = newImage?.filter((image) => image.id !== imageId);
      setNewImage(updatedImages);
    }
  };

  const handleRemoveCollaborator = (collaboratorId: CollaboratorToAdd) => {
    if (collaboratorId !== null) {
      setIsRemoveModalOpen(true);
      setColl(collaboratorId);
    }
  };

  const handleDelete = (collaboratorId: string | undefined) => {
    dispatch(removeCollaboratorFromCard({ cardId: modalId, collaboratorId }));
    setIsRemoveModalOpen(false);
    setNewCollaborator((prevCollaborators) =>
      prevCollaborators?.filter((collaborator) => collaborator.id !== collaboratorId),
    );
  };

  return (
    <Modal className="modal" open={isModalOpen} onCancel={handleCancel} width={800}>
      <div className="maodal__block">
        <div>
          <div className="modal__images">
            {newImage && newImage.length > 0 && (
              <div key={newImage[0].id}>
                <img className="modal__image" src={newImage[0].image} />
              </div>
            )}
          </div>
          <textarea className="modal__textarea" value={modalTitle} onChange={handleInputChange} />
        </div>
        <div className="modal__title">
          <div className="modal__editing">
            <h4 className="title">Описание</h4>
            {newText && !isDescriptionVisible && <Button onClick={descriptions}>Изменить</Button>}
          </div>
          <TextComponent
            isDescriptionVisible={isDescriptionVisible}
            newText={newText}
            handleTextChange={handleTextChange}
            descriptions={descriptions}
            saveChanges={saveChanges}
          />
        </div>
        <div className="modal__block">
          <div className="modal__icon">
            <label htmlFor="file__image">
              <FileImageOutlined className="icon" />
              <PlusOutlined className="icon" />
              <input type="file" value={''} onChange={hendleImg} id="file__image" hidden />
            </label>
          </div>
          <div className="modal__user_name">
            {newCollaborator?.map((collaborator) => {
              return (
                <div key={collaborator.id}>
                  <Avatar
                    className="modal__avatar"
                    onClick={() => handleRemoveCollaborator(collaborator)}
                    icon={<UserOutlined />}
                  >
                    {collaborator.name}
                  </Avatar>
                  <Modal
                    open={isRemoveModalOpen}
                    onCancel={() => setIsRemoveModalOpen(false)}
                    width={300}
                    onOk={() => {
                      setIsRemoveModalOpen(false);
                    }}
                  >
                    <div className="modal__delete_collabarator" key={coll?.id}>
                      <h3>{coll?.name}</h3>
                      <p>{coll?.gmail}</p>
                      <button onClick={() => handleDelete(coll?.id)}>Удалить из карточки</button>
                    </div>
                  </Modal>
                </div>
              );
            })}
          </div>
        </div>
        <ModalCollaborator
          setNewCollaborator={setNewCollaborator}
          newCollaborator={newCollaborator}
          modalId={modalId}
          isModalOpenCollaborator={isModalOpenCollaborator}
          handleOk={() => setIsModalOpenCollaborator(false)}
          handleCancelCollaborator={() => setIsModalOpenCollaborator(false)}
        />
        <ImagesComponents newImage={newImage} modalId={modalId} deleteImage={deleteImage} />
        <div className="modal__block">
          <Button type="primary" danger onClick={() => deleteData(modalId)}>
            Удалить
          </Button>
          <div className="modal__collaborator" onClick={() => setIsModalOpenCollaborator(true)}>
            <UserAddOutlined />
            Участники
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalBlock;
