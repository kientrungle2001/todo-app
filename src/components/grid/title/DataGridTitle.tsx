import { useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";
import { TableGridSettings } from "@/types/TableGridSettings";

interface DataGridTitleProps {
    title: string;
    controller: string;
    addNewLabel?: string;
    deleteSelectedsLabel?: string;
    parentController?: string;
    parentSettings?: TableGridSettings;
    parentItem?: any;
    defaultFilters?: any;
}

export const DataGridTitle: React.FC<DataGridTitleProps> = ({ title, controller, addNewLabel, deleteSelectedsLabel, parentController, parentSettings, parentItem, defaultFilters }) => {
    const router = useRouter();
    // Function to handle navigation
    const handleNavigation = (path: string) => {
        if (parentController) {
            if (path.includes('?')) {
                path += `&backHref=/Table/${parentController}/${parentItem.id}/detail`;
            } else {
                path += `?backHref=/Table/${parentController}/${parentItem.id}/detail`;
            }
            if (defaultFilters) {
                for (var key in defaultFilters) {
                    path += '&field_' + key + '=' + defaultFilters[key];       
                }
            }
        }
        router.push(path);
    };
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