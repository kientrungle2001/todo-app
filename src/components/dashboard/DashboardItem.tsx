import { replaceMediaUrl } from "@/api/defaultSettings";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";

interface DashboardItemProps {
    item: any;
}
const DashboardItem: React.FC<DashboardItemProps> = ({ item }) => {
    return <Card>
        <Card.Body>
            <a href={"/Table/" + item.admin_controller}>
                <Card.Img variant="top" src={replaceMediaUrl(item.thumbnail ? item.thumbnail : 'https://placehold.co/600x400/EEE/31343C/png?font=montserrat&text=' + encodeURIComponent(item.name))} />
            </a>
        </Card.Body>
        <Card.Footer>
            <div className="d-grid">
                <Button variant="primary" href={"/Table/" + item.admin_controller}>
                    {item.name}
                </Button>
            </div>

        </Card.Footer>
    </Card>
}

export default DashboardItem;