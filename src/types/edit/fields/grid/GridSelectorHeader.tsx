import { Button } from "react-bootstrap";

interface Props {
    label: string;
    handleOpen: () => void;
    handleClear: () => void;
    hideInput?: boolean;
}

export const GridSelectorHeader: React.FC<Props> = ({ label, handleOpen, handleClear, hideInput }) => (
    <div className="input-group mb-3">
        {!hideInput && (
            <input
                type="text"
                readOnly
                className="form-control"
                placeholder="Chọn bản ghi"
                value={label}
                onChange={() => { }}
            />
        )}
        <Button variant="info" onClick={handleOpen}>Chọn bản ghi</Button>
        <Button variant="danger" onClick={handleClear}>Làm trống</Button>
    </div>
);
