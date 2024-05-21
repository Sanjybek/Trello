import { AlignLeftOutlined } from '@ant-design/icons';
import { TodoList } from '../../store/trelloStore/initialSate';
import Collaborators from '../Collaborators';

const TrelloComponent: React.FC<Omit<TodoList, 'id' | 'text'>> = ({ title, images = [], collaborators }) => {
  return (
    <div className="card">
      {images.length > 0 && (
        <div className="card__images" key={images[0].id}>
          <img className="card__image" src={images[0].image} alt="" />
        </div>
      )}
      <p className="card__title">{!!title?.length ? title : <AlignLeftOutlined />}</p>
      <Collaborators collaborators={collaborators} />
    </div>
  );
};

export default TrelloComponent;
