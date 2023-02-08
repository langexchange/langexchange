import { Col, Row, Tabs } from "antd";
import ProfileCard from "./ProfileCard";
import PostList from "../../components/community/PostList";

const onChange = (key: string) => {
  console.log(key);
};

const PartnerDetailPage = () => {
  return (
    <Col
      span={18}
      // style={{ paddingLeft: "12px" }}
      className="height-full pos-relative"
    >
      <Row className="height-full pos-relative" gutter={12}>
        <Col span={10} className="height-full pos-relative">
          <ProfileCard />
        </Col>
        <Col span={14} className="height-full pos-relative">
          <Tabs
            className="height-full pos-relative tab-bar-with-content-scroll"
            onChange={onChange}
            type="card"
            items={[
              {
                label: `Posts`,
                key: "posts",
                children: (
                  <div style={{ padding: "0 12px" }}>
                    <PostList />
                  </div>
                ),
              },
              {
                label: `Vocabularies`,
                key: "vocabularies",
                children: `Content of Tab Pane `,
              },
            ]}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default PartnerDetailPage;
