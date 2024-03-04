import React from 'react';
import './style.scss';
import { Card } from 'antd';

import ModalBlock from '../modal';
import CardComponent from '../card';
export type titleType = {
  id: number;
  title: string;
  text: string;
  image: string | null;
};
export type EditFunction = (id: number, title: string, text: string, image: string | null) => void;

export type dataType = {
  cards: titleType[];
  addCardTitle: () => React.ReactNode;
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
  edit: EditFunction;
  modalId: number | null | undefined;
  deleteData: (modalId: number | null | undefined) => void;
};

const Trello: React.FC<dataType> = ({
  deleteData,
  modalId,
  edit,
  cards,
  addCardTitle,
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
    <div className="main">
      <div className="container">
        <div className="main__grid">
          <CardComponent edit={edit} cards={cards} addCardTitle={addCardTitle} />
          <Card className="main__card_2" title="Done"></Card>
          <Card className="main__card_3" title="Testing"></Card>
          <Card className="main__card_4" title="In progress"></Card>
        </div>
        <ModalBlock
          deleteData={deleteData}
          modalId={modalId}
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
        />
      </div>
    </div>
  );
};

export default Trello;
