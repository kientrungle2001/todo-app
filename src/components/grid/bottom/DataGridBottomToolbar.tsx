import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

interface DataGridBottomToolbarProps {
    controller: string;
    addNewLabel?: string;
    deleteSelectedsLabel?: string;
}

export const DataGridBottomToolbar: React.FC<DataGridBottomToolbarProps> = ({ controller, addNewLabel, deleteSelectedsLabel }) => {
    const router = useRouter();
    // Function to handle navigation
    const handleNavigation = (path: string) => { window.location.href = (path); };
    const handleAddItem = () => { handleNavigation(`/Table/${controller}/add`); }
    return <div className="d-flex justify-content-end">
        <Button variant="primary" className="me-2" onClick={handleAddItem}>{addNewLabel ?? 'Add New'}</Button>
        <Button variant="danger" className="me-2 d-none">{deleteSelectedsLabel ?? 'Delete Selecteds'}</Button>
    </div>
}