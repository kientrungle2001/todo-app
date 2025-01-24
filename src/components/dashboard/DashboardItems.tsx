import { Col, Row } from "react-bootstrap";
import DashboardItem from "./DashboardItem";

interface DashboardItemsProps {
    items: any[];
}
const DashboardItems: React.FC<DashboardItemsProps> = ({ items }) => {
    return <Row>
        {items.map(item => <Col sm={12} md="3" xl="3" key={item.id} className="mb-3">
            <DashboardItem item={item} />
        </Col>)}
    </Row>
}

export default DashboardItems;