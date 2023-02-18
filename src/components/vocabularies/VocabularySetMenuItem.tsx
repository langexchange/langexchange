import { faker } from "@faker-js/faker";
import { Button, Progress, Space, Tag, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";

interface VocabularySet {
  owner?: {
    fullname: string;
    color?: string;
    image: string;
  };
  title: string;
  descriptions: string;
  termLanguage: string;
  defineLanguage: string;
}

interface Props extends VocabularySet {
  progressHidden?: boolean;
  moreHidden?: boolean;
}

const VocabularySetMenuItem = ({
  owner,
  title,
  descriptions,
  termLanguage,
  defineLanguage,
  progressHidden = false,
  moreHidden = false,
}: Props) => {
  return (
    <div className="d-flex align-items-center justify-space-between">
      <div className="d-flex flex-column" style={{ maxWidth: "230px" }}>
        <Typography.Text strong ellipsis={true}>
          {title}
        </Typography.Text>
        <div>
          <Tag color="magenta">{descriptions} words</Tag>
        </div>
      </div>
      <Space>
        {!progressHidden && (
          <Progress
            type="circle"
            percent={Number(faker.random.numeric(2))}
            width={40}
          />
        )}
        {!moreHidden && (
          <Button
            type="text"
            size="small"
            shape="circle"
            icon={<MoreOutlined rotate={90} />}
          />
        )}
      </Space>
    </div>
  );
};

export default VocabularySetMenuItem;
