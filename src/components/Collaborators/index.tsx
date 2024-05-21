import React from 'react';
import { TodoList } from '../../store/trelloStore/initialSate';
import { EyeOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const Collaborators: React.FC<Omit<TodoList, 'id' | 'text' | 'title' | 'image'>> = ({ collaborators }) => {
  return (
    <div>
      {!!collaborators?.length && (
        <div className="card__block">
          <EyeOutlined className="card__icon" />
          <div className="modal__user_name">
            {collaborators?.map((collaborator) => {
              return (
                <div key={collaborator.id}>
                  <Avatar className="card__avatar">{collaborator.name}</Avatar>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaborators;
