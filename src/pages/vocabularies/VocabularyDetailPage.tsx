import { Button, Card, Divider, message, Space, Typography } from "antd";
import { PlusOutlined, UserAddOutlined, MoreOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import FlashCardList from "../../components/vocabularies/FlashCardList";
import UserItem from "../../components/UserItem";
import VocabularyList from "../../components/VocabularyList";
import BackCircleButton from "../../components/BackCircleButton";

const VocabularyDetailPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCollect = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  return (
    <>
      {contextHolder}
      <div
        style={{
          margin: "auto",
          padding: "24px 0",
        }}
      >
        <div className="d-flex align-items-center justify-space-between mb-3">
          <Space align="center">
            <BackCircleButton />
            <Typography.Title className="m-0" level={3}>
              {faker.random.words(3)}
            </Typography.Title>
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCollect}
          >
            Collect this!
          </Button>
        </div>
        <div className="ma mb-3" style={{ width: "fit-content" }}>
          <FlashCardList type="view" />
          <br />
          <Card size="small">
            <div className="d-flex align-items-center justify-space-between">
              <UserItem
                fullname={faker.name.fullName()}
                image={faker.image.abstract()}
                description={faker.date.recent().toLocaleString()}
                isStrong={true}
              />
              <Space>
                <Button
                  shape="circle"
                  type="primary"
                  className="btn-success"
                  icon={<UserAddOutlined />}
                />
                <Button
                  shape="circle"
                  type="primary"
                  className="btn-warning"
                  icon={<MoreOutlined rotate={90} />}
                />
              </Space>
            </div>
          </Card>
        </div>
        <Divider />

        <div>
          <Typography.Title level={4}>
            Terminology in this module
          </Typography.Title>
          <VocabularyList />
        </div>
      </div>
    </>
  );
};

export default VocabularyDetailPage;
