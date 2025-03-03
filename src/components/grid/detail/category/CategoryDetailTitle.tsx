import { replaceMediaUrl } from "@/api/defaultSettings"
import { Col, Row } from "react-bootstrap"

interface CategoryDetailTitleProps {
    hostConfig?: any;
    item: any;
}

export const CategoryDetailTitle: React.FC<CategoryDetailTitleProps> = ({ hostConfig, item }): React.ReactElement => {
    return <Row>
        <Col sm={12}>
            Tên danh mục:{' '}
            <span className="text-justify" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name) }}>
            </span>{' '}
            {hostConfig && hostConfig.appName != 'pmtv' && <>
                /{' '}
                <em className="text-justify" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name_en) }}>
                </em>
            </>}

        </Col>
    </Row>
}