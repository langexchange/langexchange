import { memo, useMemo } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Input,
  Row,
  Typography,
  UploadFile,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import UploadImage from "../UploadImage";
import { useTranslation } from "react-i18next";
import { VocabularyForm } from "../../pages/vocabularies/VocabularyCreatePage";

const isValid = (item: VocabularyForm) => {
  if (item.term && !item.define && !item.imageUrl) return false;
  if (!item.term && (item.define || item.imageUrl)) return false;
  return true;
};

const CardAddVocabulary: React.FC<any> = memo(function CardAddVocabulary({
  value,
  removeCard,
  setItems,
  props,
}) {
  const [t] = useTranslation(["vocabulary", "commons"]);

  const setFileList = (newFileList: UploadFile[]) => {
    updateFileList(newFileList, Number(props.key));
  };

  const updateFileList = (newFileList: UploadFile[], key: number) => {
    setItems((prev: any) => {
      prev[key].fileList = newFileList;
      if (newFileList[0]?.status === "done") {
        prev[key].imageUrl = newFileList[0].response[0].url;
      } else if (newFileList[0]?.status === "error") {
        prev[key].imageUrl = "";
      }
      prev[key].error = prev[key].error && !isValid(prev[key]);
      return [...prev];
    });
  };

  const updateTerm = (value: string, key: number) => {
    setItems((prev: any) => {
      prev[key] = {
        ...prev[key],
        term: value,
        error: prev[key].error && !isValid(prev[key]),
      };
      return [...prev];
    });
  };

  const updateDefine = (value: string, key: number) => {
    setItems((prev: any) => {
      prev[key].define = value;
      prev[key].error = prev[key].error && !isValid(prev[key]);
      return [...prev];
    });
  };

  const form = useMemo(() => {
    return (
      <Card
        hoverable
        size="small"
        title={<Typography.Text type="secondary">{props.key}</Typography.Text>}
        extra={
          <Button
            onClick={() => removeCard(Number(props.key))}
            type="text"
            icon={<DeleteOutlined />}
            danger
          />
        }
        style={{ border: value.error ? "1px solid #ff4d4f" : "" }}
      >
        {value.error && (
          <Alert
            message="Please fill in the term with definition or image."
            type="error"
            closable
            className="mb-2"
          />
        )}
        <Row gutter={[8, 8]} align="middle">
          <Col flex={1}>
            <Input
              size="large"
              placeholder={t("Term", { ns: "commons" }).toString()}
              value={value.term}
              onChange={(e) => updateTerm(e.target.value, Number(props.key))}
            />
          </Col>
          <Col flex={2}>
            <Input.TextArea
              size="large"
              placeholder={t("Define", { ns: "commons" }).toString()}
              rows={1}
              value={value.define}
              onChange={(e) => updateDefine(e.target.value, Number(props.key))}
              autoSize={true}
            />
          </Col>
          <Col flex="none">
            <UploadImage
              limit={1}
              aspect={1}
              customAspect={false}
              fileList={value.fileList}
              setFileList={setFileList}
            />
          </Col>
        </Row>
      </Card>
    );
  }, [value.error, value.term, value.define, value.fileList]);

  return <>{form}</>;
});

export default CardAddVocabulary;
