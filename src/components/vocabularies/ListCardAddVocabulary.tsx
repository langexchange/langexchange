import { Button, Card, Col, Input, Row, Space, Typography } from "antd";
import { List, arrayMove } from "react-movable";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import UploadImage from "../UploadImage";
import { useTranslation } from "react-i18next";

interface Vocabulary {
  term: string;
  define: string;
}

const initial = [
  {
    term: "",
    define: "",
  },
  {
    term: "",
    define: "",
  },
];
const ListCardAddVocabulary: React.FC = () => {
  const [items, setItems] = useState<Vocabulary[]>(initial);
  const [t] = useTranslation(["vocabulary", "commons"]);

  const updateTerm = (value: string, key: number) => {
    setItems((prev) => {
      prev[key].term = value;
      return [...prev];
    });
  };

  const updateDefine = (value: string, key: number) => {
    setItems((prev) => {
      prev[key].define = value;
      return [...prev];
    });
  };

  const addCard = () => {
    setItems((prev) => {
      return [...prev, { term: "", define: "" }];
    });
  };

  const removeCard = (key: number) => {
    setItems((prev) => {
      return prev.filter((_, index) => index !== key);
    });
  };

  return (
    <>
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props }) => (
          <div {...props} style={{ listStyleType: "none", padding: 0 }}>
            {children}
          </div>
        )}
        renderItem={({ value, props }) => (
          <div style={{ margin: "12px 0" }} key={props.key}>
            <Card
              hoverable
              size="small"
              title={
                <Typography.Text type="secondary">{props.key}</Typography.Text>
              }
              extra={
                <Button
                  onClick={() => removeCard(Number(props.key))}
                  type="text"
                  icon={<DeleteOutlined />}
                  danger
                />
              }
              {...props}
            >
              <Row gutter={8} align="middle">
                <Col flex={1}>
                  <Input
                    size="large"
                    placeholder={t("Term", { ns: "commons" }).toString()}
                    value={value.term}
                    onChange={(e) =>
                      updateTerm(e.target.value, Number(props.key))
                    }
                  />
                </Col>
                <Col flex={2}>
                  <Input.TextArea
                    size="large"
                    placeholder={t("Define", { ns: "commons" }).toString()}
                    rows={1}
                    value={value.define}
                    onChange={(e) =>
                      updateDefine(e.target.value, Number(props.key))
                    }
                    autoSize={true}
                  />
                </Col>
                <Col flex="none">
                  <UploadImage />
                </Col>
              </Row>
            </Card>
          </div>
        )}
      />
      <Card hoverable onClick={addCard} className="text-center">
        <Space>
          <Typography.Text strong type="success">
            <PlusOutlined style={{ fontSize: "24px" }} />
          </Typography.Text>
          <Typography.Text strong>{t("Add card")}</Typography.Text>
        </Space>
      </Card>
    </>
  );
};

export default ListCardAddVocabulary;
