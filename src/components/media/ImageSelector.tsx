import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ImageDialog } from './ImageDialog';

interface ImageSelectorProps {
  selectedImage: string;
  setSelectedImage: (selectedImage: string) => void;
  hideInput?: boolean;
  selectImageLabel?: string;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({ selectedImage, setSelectedImage, hideInput, selectImageLabel }) => {
  const [show, setShow] = useState(false);

  const handleOpenDialog = () => setShow(true);
  const handleCloseDialog = () => setShow(false);

  const handleImageSelect = (imagePath: string) => {
    setSelectedImage('/3rdparty/Filemanager/source' + imagePath);
    handleCloseDialog();
  };

  return (
    <div>
      <div className="input-group mb-3">
        {hideInput ? null : (<input
          type="text"
          className="form-control"
          placeholder="Select Image"
          value={selectedImage}
          onChange={(e) => setSelectedImage(e.target.value)}
        />)}

        <Button variant="info" onClick={handleOpenDialog}>
          {selectImageLabel ? selectImageLabel : 'Select Image'}
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
