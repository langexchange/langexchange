import { Col, Row, Space, Typography } from "antd";
import LocationIcon from "../../assets/images/locations.svg";
import BookIcon from "../../assets/images/books.svg";
import NoteIcon from "../../assets/images/note.svg";
import LanguageIcon from "../../assets/images/language.svg";
import MissonItem from "../welcomes/FeatureItem";
import { blue, red } from "@ant-design/colors";

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
    <Space
      direction="vertical"
      style={{ padding: "48px 50px" }}
      align="center"
      size={48}
    >
      <Title level={2} style={{ margin: "0" }}>
        <span style={{ color: blue[4] }}>Lang</span>
        <span style={{ color: red[7] }}>Exchange</span> missons
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
  );
};

export default Missons;
