import { useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";

interface DataGridTitleProps {
    title: string;
    controller: string;
    addNewLabel?: string;
    deleteSelectedsLabel?: string;
}

export const DataGridTitle: React.FC<DataGridTitleProps> = ({ title, controller, addNewLabel, deleteSelectedsLabel }) => {
    const router = useRouter();
    // Function to handle navigation
    const handleNavigation = (path: string) => { router.push(path); };
    const handleAddItem = () => { handleNavigation(`/Table/${controller}/add`); }
    return <Card.Title className="d-flex justify-content-between align-items-center">
        {/* Title on the left */}
        <span>{title}</span>

        {/* Buttons on the right */}
        <div>
            {/* Button as a link */}
            <Button size="sm" variant="primary" className="me-2" onClick={handleAddItem}>{addNewLabel ?? 'Add New'}</Button>
            {/* Regular Button */}
            <Button size="sm" variant="danger">{deleteSelectedsLabel ?? 'Delete Selecteds'}</Button>
        </div>
    </Card.Title>
};