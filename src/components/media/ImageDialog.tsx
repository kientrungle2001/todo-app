import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Modal, ListGroup, Form, InputGroup, Breadcrumb } from 'react-bootstrap';
import axios from '@/api/axiosInstance';

interface ImageDialogProps {
    show: boolean;
    selectedImage: string;
    onClose: () => void;
    onImageSelect: (imagePath: string) => void;
}

export const ImageDialog: React.FC<ImageDialogProps> = ({ selectedImage, show, onClose, onImageSelect }) => {
    const [currentFolder, setCurrentFolder] = useState<string>('/');
    const [files, setFiles] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string | null>(selectedImage);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [newDirName, setNewDirName] = useState<string>('');
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

    useEffect(() => {
        // reset current folder to the folder of selectedImage
        if (selectedImage) {
            const path = selectedImage.split('/').slice(0, -1).join('/'); // Remove file name from path
            fetchDirectoryContents(path + '/');
        }
    }, [selectedImage]);

    // Function to fetch directory contents from the backend
    const fetchDirectoryContents = async (path: string) => {
        try {
            const response = await axios.get(`/media/list`, {
                params: { path },
            });
            const { files, folders } = response.data;
            setFiles([...folders, ...files]); // Assuming the response gives separate `files` and `folders`
            setCurrentFolder(path);
            // Update breadcrumbs based on current folder
            setBreadcrumbs(path.split('/').filter(Boolean)); // Filter to remove empty strings
        } catch (error) {
            console.error('Error fetching directory contents:', error);
        }
    };

    // Handle folder navigation and file selection
    const handleItemClick = (file: string) => {
        if (file.endsWith('/')) {
            fetchDirectoryContents(`${currentFolder}${file}`);
        } else {
            setSelectedFile(`${currentFolder}${file}`);
        }
    };

    // Handle breadcrumb click
    const handleBreadcrumbClick = (folder: string) => {
        if (folder === '') {
            fetchDirectoryContents('/');
        } else {
            const path = `/${folder}/`; // Start with root
            fetchDirectoryContents(path);
        }
        
    };

    // Handle image upload to the backend
    const handleImageUpload = async () => {
        if (newImage) {
            const formData = new FormData();
            formData.append('file', newImage);
            formData.append('folder', currentFolder); // Send the current folder to save the image in

            try {
                const response = await axios.post('/media/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Upload response:', response.data);
                fetchDirectoryContents(currentFolder); // Refresh the folder contents after upload
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    // Handle creating a new directory
    const handleCreateDirectory = async (directoryName: string) => {
        try {
            const response = await axios.post('/media/create_directory', {
                folder: currentFolder,
                name: directoryName,
            });
            console.log('Directory created:', response.data);
            fetchDirectoryContents(currentFolder); // Refresh the folder contents after creation
        } catch (error) {
            console.error('Error creating directory:', error);
        }
    };

    // Handle deleting an image or directory
    const handleDelete = async (fileName: string) => {
        try {
            const response = await axios.delete('/media/delete', {
                data: { path: `${currentFolder}/${fileName}` },
            });
            console.log('File/Directory deleted:', response.data);
            fetchDirectoryContents(currentFolder); // Refresh the folder contents after deletion
        } catch (error) {
            console.error('Error deleting file/directory:', error);
        }
    };

    // Handle renaming a file or directory
    const handleRename = async (oldName: string, newName: string) => {
        try {
            const response = await axios.post('/media/rename', {
                folder: currentFolder,
                oldName,
                newName,
            });
            console.log('File/Directory renamed:', response.data);
            fetchDirectoryContents(currentFolder); // Refresh the folder contents after renaming
        } catch (error) {
            console.error('Error renaming file/directory:', error);
        }
    };

    useEffect(() => {
        if (show) fetchDirectoryContents('/');
    }, [show]);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Select Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Current Folder: {currentFolder}</h5>
                {/* Breadcrumbs for folder navigation */}
                <Breadcrumb>
                    <Breadcrumb.Item
                        onClick={() => handleBreadcrumbClick('')}
                        style={{ cursor: 'pointer' }}
                    >
                        Root
                    </Breadcrumb.Item>
                    {breadcrumbs.map((folder, index) => {
                        const isLast = index === breadcrumbs.length - 1;
                        return (
                            <Breadcrumb.Item
                                key={index}
                                active={isLast}
                                onClick={() => !isLast && handleBreadcrumbClick(folder)}
                                style={{ cursor: !isLast ? 'pointer' : 'default' }}
                            >
                                {folder}
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
                <ListGroup>
                    {files.map((file, index) => (
                        <ListGroup.Item
                            key={index}
                            action
                            onClick={() => handleItemClick(file)}
                            active={selectedFile === `${currentFolder}${file}`}
                        >
                            {file}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Form.Group className="mt-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewImage(e.target.files ? e.target.files[0] : null)}
                    />
                    <Button className="mt-2" onClick={handleImageUpload}>
                        Upload
                    </Button>
                </Form.Group>
                {/* Create Directory Section */}
                <Form.Group className="mt-3">
                    <Form.Label>Create Directory</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="New directory name"
                            value={newDirName}
                            onChange={(e) => setNewDirName(e.target.value)}
                        />
                        <Button
                            variant="primary"
                            onClick={() => handleCreateDirectory(newDirName)}
                            disabled={!newDirName}
                        >
                            Create
                        </Button>
                    </InputGroup>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    disabled={!selectedFile}
                    onClick={() => selectedFile && onImageSelect(selectedFile)}
                >
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
