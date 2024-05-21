import React, { useState } from 'react';
import { ImagesTyp } from '../../store/trelloStore/initialSate';
import { DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

type ImagesType = {
  newImage: ImagesTyp[] | undefined;
  modalId: string | null | undefined;
  deleteImage: (modalId: string, id: string) => void;
};

const ImagesComponents: React.FC<ImagesType> = ({ newImage, modalId, deleteImage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="modal__div_images">
      {newImage?.map((image) => {
        return (
          <div key={image.id}>
            <div className="modal__div_image">
              <img className="image" src={image.image} onClick={() => showModal(image.image)} />
            </div>
            <button className="modal__delete_image" onClick={() => modalId && deleteImage(modalId, image.id)}>
              <DeleteOutlined />
            </button>
          </div>
        );
      })}
      <Modal open={isModalOpen} width={1000} onOk={handleOk} onCancel={handleCancel}>
        {selectedImage && <img className="image__block" src={selectedImage} alt="Selected" />}
      </Modal>
    </div>
  );
};

export default ImagesComponents;
