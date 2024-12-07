import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Modal, Form, InputGroup, Breadcrumb, Row, Col, Card } from 'react-bootstrap';
import { getAxios } from '@/api/mediaAxiosInstance';
import { storage } from '@/api/storage';
import { useRouter } from 'next/router';

interface ImageDialogProps {
    show: boolean;
    selectedImage: string;
    onClose: () => void;
    onImageSelect: (imagePath: string) => void;
}

export const ImageDialog: React.FC<ImageDialogProps> = ({ selectedImage, show, onClose, onImageSelect }) => {
    const [currentFolder, setCurrentFolder] = useState<string>('/');
    const [files, setFiles] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string | null>(selectedImage ? selectedImage.substring(9) : '');
    const [newImage, setNewImage] = useState<File | null>(null);
    const [newDirName, setNewDirName] = useState<string>('');
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
    const router = useRouter();

    // Function to fetch directory contents from the backend
    const fetchDirectoryContents = async (path: string) => {
        try {
            const response = await getAxios(window.location.hostname).get(`/media/list`, {
                params: { path },
                headers: {
                    'Authorization': `Bearer ${storage.get('token') || ''}`
                }
            }).catch((error: any) => {
                if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                    storage.clearTokenInfo();
                    router.push('/login');
                }
            });
            if (response && response.data) {
                const { files, folders } = response.data;
                setFiles([...folders, ...files]); // Assuming the response gives separate `files` and `folders`
                setCurrentFolder(path);
                // Update breadcrumbs based on current folder
                const updatedBreadcrumbs: string[] = [];
                let breadcrumbPath = '';
                path.split('/').filter(Boolean).forEach((folder) => {
                    breadcrumbPath += `/${folder}`;
                    updatedBreadcrumbs.push(breadcrumbPath);
                });
                setBreadcrumbs(updatedBreadcrumbs.filter(Boolean)); // Filter to remove empty strings
            }
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
                const response = await getAxios(window.location.hostname).post('/media/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${storage.get('token') || ''}`
                    },
                }).catch((error: any) => {
                    if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                        storage.clearTokenInfo();
                        router.push('/login');
                    }
                });
                fetchDirectoryContents(currentFolder); // Refresh the folder contents after upload
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    // Handle creating a new directory
    const handleCreateDirectory = async (directoryName: string) => {
        try {
            const response = await getAxios(window.location.hostname).post('/media/create_directory', {
                folder: currentFolder,
                name: directoryName,
            }, {
                headers: {
                    'Authorization': `Bearer ${storage.get('token') || ''}`
                }
            }).catch((error: any) => {
                if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                    storage.clearTokenInfo();
                    router.push('/login');
                }
            });
            fetchDirectoryContents(currentFolder); // Refresh the folder contents after creation
        } catch (error) {
            console.error('Error creating directory:', error);
        }
    };

    // Handle deleting an image or directory
    const handleDelete = async (fileName: string) => {
        try {
            const response = await getAxios(window.location.hostname).delete('/media/delete', {
                data: { path: `${currentFolder}/${fileName}` },
            }).catch((error: any) => {
                if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                    storage.clearTokenInfo();
                    router.push('/login');
                }
            });
            fetchDirectoryContents(currentFolder); // Refresh the folder contents after deletion
        } catch (error) {
            console.error('Error deleting file/directory:', error);
        }
    };



    // Handle renaming a file or directory
    const handleRename = async (oldName: string, newName: string) => {
        try {
            const response = await getAxios(window.location.hostname).post('/media/rename', {
                folder: currentFolder,
                oldName,
                newName,
            }, {
                headers: {
                    'Authorization': `Bearer ${storage.get('token') || ''}`
                }
            }).catch((error: any) => {
                if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                    storage.clearTokenInfo();
                    router.push('/login');
                }
            });
            fetchDirectoryContents(currentFolder); // Refresh the folder contents after renaming
        } catch (error) {
            console.error('Error renaming file/directory:', error);
        }
    };

    useEffect(() => {
        if (show) {
            if (selectedImage && selectedImage.startsWith('/3rdparty')) {
                // get folder name from selected image path (remove file name)
                let folderName = selectedImage.substring(0, selectedImage.lastIndexOf('/') + 1);
                // remove /3rdparty prefix
                folderName = folderName.substring(9);
                // fetch the directory contents of the selected folder
                fetchDirectoryContents(folderName);
            } else {
                fetchDirectoryContents('/');
            }

        }
    }, [show, selectedImage]);

    return (
        <Modal show={show} onHide={onClose} size="xl">
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
                                {folder.substring(folder.lastIndexOf('/') + 1)}
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
                <Row>
                    {files.map((file, index) => (
                        <Col md={2}
                            key={index}
                            onClick={() => handleItemClick(file)}
                            className="mt-2 equal-height-col"
                        >
                            {/** create card */}
                            <Card style={{ cursor: 'pointer', width: '100%', height: "100%", border: selectedFile === `${currentFolder}${file}` ? '2px solid blue' : '1px solid #ccc' }}>
                                {file.endsWith('/') ? '' : <Card.Img variant="top" src={`/3rdparty/Filemanager/thumbs${currentFolder}${file}`} />}
                                <Card.Body>
                                    <span>{file.replace('/', '')}</span>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
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
