import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ImageDialog } from './ImageDialog';

interface ImageSelectorProps {
    selectedImage: string;
    setSelectedImage: (selectedImage: string) => void;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({selectedImage, setSelectedImage}) => {
  const [show, setShow] = useState(false);

  const handleOpenDialog = () => setShow(true);
  const handleCloseDialog = () => setShow(false);

  const handleImageSelect = (imagePath: string) => {
    setSelectedImage('/3rdparty' + imagePath);
    handleCloseDialog();
  };

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Select Image"
          value={selectedImage}
          onChange={(e) => setSelectedImage(e.target.value)}
        />
        <Button variant="primary" onClick={handleOpenDialog}>
          Select Image
        </Button>
      </div>
      <ImageDialog
        show={show}
        onClose={handleCloseDialog}
        selectedImage={selectedImage}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
};
