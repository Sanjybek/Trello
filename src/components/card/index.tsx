import { Card } from 'antd';
import { AlignLeftOutlined } from '@ant-design/icons';
import { EditFunction, dataType, titleType } from '../trello';
type CardTyp = {
  edit: EditFunction;
  cards: titleType[];
  addCardTitle: () => React.ReactNode;
};

const CardComponent: React.FC<CardTyp> = ({ edit, cards, addCardTitle }) => {
  return (
    <Card className="main__card" title="Todo">
      {cards.map((elemen) => (
        <div
          onClick={() => edit(elemen.id, elemen.title, elemen.text, elemen.image)}
          draggable={true}
          className="card"
          key={elemen.id}
        >
          <div className="card__images">{elemen.image && <img className="card__image" src={elemen.image} />}</div>
          <p className="card__title">{!!elemen.title.length ? elemen.title : <AlignLeftOutlined />}</p>
        </div>
      ))}
      <div className="main__add_card">{addCardTitle()}</div>
    </Card>
  );
};

export default CardComponent;
