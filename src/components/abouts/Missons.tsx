import { Col, Row, Space, Typography } from "antd";
import LocationIcon from "../../assets/images/locations.png";
import BookIcon from "../../assets/images/books.png";
import NoteIcon from "../../assets/images/note.png";
import LanguageIcon from "../../assets/images/language.png";
import MissonItem from "../welcomes/FeatureItem";

const { Title } = Typography;

const missonItems = [
  {
    image: LocationIcon,
    title: "Build healthy communities",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. Morbi semper sed aliquet quis enim enim gravida tincidunt. Commodo turpis viverra cursus accumsan a ultrices. Diam nulla dolor.",
  },
  {
    image: BookIcon,
    title: "Create learning opportunities",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. Morbi semper sed aliquet quis enim enim gravida tincidunt. Commodo turpis viverra cursus accumsan a ultrices. Diam nulla dolor.",
  },
  {
    image: NoteIcon,
    title: "Provide interesting content",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. Morbi semper sed aliquet quis enim enim gravida tincidunt. Commodo turpis viverra cursus accumsan a ultrices. Diam nulla dolor.",
  },
  {
    image: LanguageIcon,
    title: "Support many features, tools",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. Morbi semper sed aliquet quis enim enim gravida tincidunt. Commodo turpis viverra cursus accumsan a ultrices. Diam nulla dolor.",
  },
];

const Missons = () => {
  return (
    <div className="has-background-color">
      <div className="container py-5">
        <Space direction="vertical" align="center" size={48}>
          <Title level={2} className="m-0">
            <span className="color-blue-logo">Lang</span>
            <span className="color-red-logo">Exchange</span> missons
          </Title>
          <div>
            <Row align="middle" gutter={[24, 48]}>
              {missonItems.map((item, index) => (
                <Col span={12} key={index}>
                  <MissonItem {...item} />
                </Col>
              ))}
            </Row>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default Missons;
