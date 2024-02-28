import React from 'react';
import './style.scss';
import { Card } from 'antd';

export type titleType = {
  id: number;
  title: string;
};

export type dataType = {
  cards: titleType[];
  addCardTitle: () => React.ReactNode;
};
const Trello: React.FC<dataType> = ({ cards, addCardTitle }) => {
  return (
    <div className="main">
      <div className="container">
        <div className="main__grid">
          <Card className="main__card" title="Todo">
            {cards.map((elemen) => {
              return (
                <div draggable={true} className="card" key={elemen.id}>
                  <p className="card__title">{elemen.title}</p>
                </div>
              );
            })}
            <div className="main__add_card">{addCardTitle()}</div>
          </Card>
          <Card className="main__card_2" title="Todo"></Card>
          <Card className="main__card_3" title="Todo"></Card>
          <Card className="main__card_4" title="Todo"></Card>
        </div>
      </div>
    </div>
  );
};

export default Trello;
