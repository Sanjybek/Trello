import { Button } from 'antd';
type TextTyp = {
  isDescriptionVisible: boolean;
  newText: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  descriptions: () => void;
  saveChanges: () => void;
};
const TextComponent: React.FC<TextTyp> = ({
  isDescriptionVisible,
  newText,
  handleTextChange,
  descriptions,
  saveChanges,
}) => {
  return (
    <div>
      {isDescriptionVisible ? (
        <div>
          <textarea
            className="modal__textarea_2"
            value={newText}
            placeholder="Описание..."
            onChange={handleTextChange}
          ></textarea>
          <div className="modal__save_button">
            <Button type="primary" onClick={saveChanges}>
              Сохранить
            </Button>
          </div>
        </div>
      ) : (
        <p className="description" onClick={descriptions}>
          {newText ? newText : <span className="modal__description">Добавить более подробное описание...</span>}
        </p>
      )}
    </div>
  );
};

export default TextComponent;
