import { Button, Card, Col, Input, Row, Space, Typography } from "antd";
import { List, arrayMove } from "react-movable";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

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
const ListCardAddVocabulary = () => {
  const [items, setItems] = useState<Vocabulary[]>(initial);
  console.log(items);

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
              <Row gutter={8} className="py-2">
                <Col span={12}>
                  <Input
                    placeholder="Term"
                    value={value.term}
                    onChange={(e) =>
                      updateTerm(e.target.value, Number(props.key))
                    }
                  />
                </Col>
                <Col span={12}>
                  <Input.TextArea
                    placeholder="Define"
                    rows={1}
                    value={value.define}
                    onChange={(e) =>
                      updateDefine(e.target.value, Number(props.key))
                    }
                    autoSize={true}
                  />
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
          <Typography.Text strong>Add card</Typography.Text>
        </Space>
      </Card>
    </>
  );
};

export default ListCardAddVocabulary;
