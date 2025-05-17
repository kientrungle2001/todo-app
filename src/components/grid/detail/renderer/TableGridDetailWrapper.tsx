import { Row } from "react-bootstrap";
import { TableGrid } from "../../TableGrid";

interface Props {
    detail: any;
    controller: string;
    settings: any;
    item: any;
    defaultFilters: any;
}

export const TableGridDetailWrapper: React.FC<Props> = ({ detail, controller, settings, item, defaultFilters }) => (
    <Row>
        <TableGrid
            controller={detail.controller}
            settings={detail.settings}
            defaultFilters={defaultFilters}
            parentController={controller}
            parentSettings={settings}
            parentItem={item}
        />
    </Row>
);
