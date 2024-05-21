import { Modal, Input, Avatar } from 'antd';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { mockCollaborators } from '../../store/mockData/index';
import { useDispatch } from 'react-redux';
import { CollaboratorToAdd } from '../../store/trelloStore/initialSate';
import { addCollaborator, removeCollaborator } from '../../store/trelloStore/slice';

type ModalTyp = {
  isModalOpenCollaborator: boolean;
  handleOk: () => void;
  handleCancelCollaborator: () => void;
  modalId: string | null | undefined;
  newCollaborator: CollaboratorToAdd[];
  setNewCollaborator: Dispatch<SetStateAction<CollaboratorToAdd[] | undefined>>;
};

const ModalCollaborator: React.FC<ModalTyp> = ({
  setNewCollaborator,
  newCollaborator = [],
  isModalOpenCollaborator,
  handleOk,
  handleCancelCollaborator,
  modalId,
}) => {
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState('');

  const filterName = useMemo(() => {
    if (!inputValues) {
      return [];
    } else {
      return mockCollaborators
        .filter((collaborator: CollaboratorToAdd) =>
          collaborator.name.toLowerCase().startsWith(inputValues.toLowerCase()),
        )
        .filter((collaborator: CollaboratorToAdd) => !newCollaborator.find((c) => c.id === collaborator.id));
    }
  }, [mockCollaborators, newCollaborator, inputValues]);

  const handleSelectCollaborator = (collaborator: CollaboratorToAdd) => {
    if (modalId) {
      if (newCollaborator.length < 4) {
        dispatch(addCollaborator({ listId: modalId, collaborator }));
        setNewCollaborator((prevCollaborators = []) => [...prevCollaborators, collaborator]);
      } else {
        alert('Максимум 4 участника могут быть добавлены');
      }
    }
    setInputValues('');
  };

  const handleRemoveCollaborator = (collaboratorId: string) => {
    if (modalId) {
      dispatch(removeCollaborator({ listId: modalId, collaboratorId }));
      setNewCollaborator((prevCollaborators) => {
        prevCollaborators = prevCollaborators || [];
        return prevCollaborators.filter((collaborator) => collaborator.id !== collaboratorId);
      });
    }
  };

  return (
    <Modal
      open={isModalOpenCollaborator}
      onOk={handleOk}
      onCancel={handleCancelCollaborator}
      width={400}
      title="Участники"
    >
      <Input placeholder="Поиск участников" value={inputValues} onChange={(e) => setInputValues(e.target.value)} />
      {newCollaborator.map((collaborator) => {
        return (
          <div className="modal__user_name" key={collaborator.id}>
            <div className="modal__delete">
              <Avatar className="modal__avatar">{collaborator.name}</Avatar>
              <p>{collaborator.name}</p>
            </div>
            <div className="modal__delete" onClick={() => handleRemoveCollaborator(collaborator.id)}>
              x
            </div>
          </div>
        );
      })}
      {filterName.map((userName) => (
        <div className="modal__name_block" key={userName.id} onClick={() => handleSelectCollaborator(userName)}>
          <div className="modal__user_name">
            <Avatar className="modal__avatar">{userName.name}</Avatar>
            <p>{userName.name}</p>
          </div>
        </div>
      ))}
    </Modal>
  );
};
export default ModalCollaborator;
