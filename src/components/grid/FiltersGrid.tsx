import { Form } from "react-bootstrap";
import { DataGridFilterColumn, DataGridSortOption } from "./DataGrid"

interface FiltersGridProps {
    filters: DataGridFilterColumn[];
    sortOptions?: DataGridSortOption[];
}

export const FiltersGrid: React.FC<FiltersGridProps> = ({ filters, sortOptions }) => {
    return <Form>
        {filters.map(filter => (
            <Form.Group controlId={"formGroup" + filter.index} key={filter.index} className="mb-3">
                <Form.Label>{filter.label}</Form.Label>
                <Form.Control size="sm" type="text" placeholder={`Filter by ${filter.label}`} />
            </Form.Group>
        ))}
        <Form.Group controlId="formGroupSort" key="formGroupSort" className="mb-3">
            <Form.Label>Sort by</Form.Label>
            <Form.Select size="sm" onChange={(e) => console.log(e.target.value)}>
                {sortOptions?.map(option => (
                    <option key={option.index} value={option.index}>{option.label}</option>
                ))}
            </Form.Select>
        </Form.Group>
    </Form>
}