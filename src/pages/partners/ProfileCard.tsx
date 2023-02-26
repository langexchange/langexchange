import { Avatar, Button, Card, Divider, Space, Tag, Typography } from "antd";
import {
  UserDeleteOutlined,
  MessageOutlined,
  HomeOutlined,
  FormOutlined,
  TeamOutlined,
  SketchOutlined,
  HeartOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { faker } from "@faker-js/faker";

const ProfileCard = () => {
  return (
    <Card
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
      }}
      className="height-full pos-relative card-custome-scroll"
      bodyStyle={{
        height: "100%",
        // overflow: "scroll",
      }}
    >
      <div className="avatar and basic info">
        <div className="d-flex align-items-center justify-space-between">
          <Space>
            <Avatar size={100} />
            <Space direction="vertical" size={0}>
              <Typography.Title level={3} className="m-0">
                Dinh Nhu Tan
              </Typography.Title>
              <Typography.Text type="secondary">
                <Space align="center">
                  <HomeOutlined />
                  Ho Chi Minh, Viet Nam
                </Space>
              </Typography.Text>
              <Typography.Text type="secondary">
                <Space align="center">
                  <FormOutlined />
                  100 posts
                </Space>
              </Typography.Text>
              <Typography.Text type="secondary">
                <Space align="center">
                  <TeamOutlined />
                  50 partners
                </Space>
              </Typography.Text>
            </Space>
          </Space>
          <Space direction="vertical">
            <Button
              type="primary"
              shape="round"
              icon={<UserDeleteOutlined />}
              danger
            />
            <Button
              type="primary"
              shape="round"
              icon={<MessageOutlined />}
              className="btn-success"
            />
          </Space>
        </div>
      </div>
      <br />
      <Space className="languages width-full" direction="vertical" size="large">
        <Space direction="vertical" className="width-full">
          <Typography.Text type="secondary">
            <Space align="center">
              <SketchOutlined />
              Native languages
            </Space>
          </Typography.Text>
          <Space
            direction="vertical"
            className="width-full"
            style={{ padding: "0 24px" }}
          >
            <div className="d-flex align-items-center justify-space-between">
              <Tag color="blue">Vietnamese</Tag>
              <Space>
                <StarFilled className="color-warning" />
                <StarFilled className="color-warning" />
                <StarFilled className="color-warning" />
                <StarFilled className="color-warning" />
                <StarOutlined className="color-warning" />
              </Space>
            </div>
            <div className="d-flex align-items-center justify-space-between">
              <Tag color="blue">English</Tag>
              <Space>
                <StarFilled className="color-warning" />
                <StarFilled className="color-warning" />
                <StarFilled className="color-warning" />
                <StarFilled className="color-warning" />
                <StarOutlined className="color-warning" />
              </Space>
            </div>
          </Space>
        </Space>
        <Space direction="vertical" className="width-full">
          <Typography.Text type="secondary">
            <Space align="center">
              <HeartOutlined />
              Target languages
            </Space>
          </Typography.Text>
          <Space
            direction="vertical"
            className="width-full"
            style={{ padding: "0 24px" }}
          >
            <div className="d-flex align-items-center justify-space-between">
              <Tag color="green">Chinese</Tag>
              <Space>
                <StarFilled className="color-warning" />
                <StarFilled className="color-warning" />
                <StarOutlined className="color-warning" />
                <StarOutlined className="color-warning" />
                <StarOutlined className="color-warning" />
              </Space>
            </div>
            <div className="d-flex align-items-center justify-space-between">
              <Tag color="green">Japanese</Tag>
              <Space>
                <StarFilled className="color-warning" />
                <StarFilled className="color-warning" />
                <StarFilled className="color-warning" />
                <StarOutlined className="color-warning" />
                <StarOutlined className="color-warning" />
              </Space>
            </div>
          </Space>
        </Space>
      </Space>
      <br />
      <br />
      <div className="bio">
        <Typography.Paragraph italic className="text-justify text-300">
          "{faker.random.words(50)}"
        </Typography.Paragraph>
      </div>
      <div className="interest">
        <Divider orientation="left" plain>
          Interests
        </Divider>
        <Space size={[0, 8]} wrap>
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="gold">gold</Tag>
          <Tag color="lime">lime</Tag>
          <Tag color="green">green</Tag>
          <Tag color="cyan">cyan</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="geekblue">geekblue</Tag>
          <Tag color="purple">purple</Tag>
          <Tag color="magenta">magenta</Tag>
        </Space>
      </div>
      <div className="topics"></div>
    </Card>
  );
};

export default ProfileCard;
