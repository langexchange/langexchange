import { memo } from "react";
import {
  Col,
  Form,
  FormInstance,
  Input,
  message,
  Row,
  Switch,
  Upload,
  UploadFile,
} from "antd";
import { useTranslation } from "react-i18next";
import SeclectLanguageInput from "../SeclectLanguageInput";
import UploadImage from "../UploadImage";

interface VocabularySetFormProps {
  form: FormInstance<any>;
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}

const VocabularySetForm: React.FC<VocabularySetFormProps> = memo(
  function VocabularySetForm({ form, fileList, setFileList }) {
    const [t] = useTranslation(["vocabulary", "commons"]);
    const termLocale = Form.useWatch("termLocale", form);
    const defineLocale = Form.useWatch("defineLocale", form);

    return (
      <Row gutter={24}>
        <Col flex="auto">
          <Form autoComplete="off" labelAlign="left" form={form}>
            <Form.Item
              name="title"
              label={t("Title", { ns: "commons" })}
              labelCol={{ span: 2 }}
              rules={[
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]}
            >
              <Input placeholder={t("title-input-placeholder").toString()} />
            </Form.Item>
            <Form.Item
              name="description"
              label={t("Description", { ns: "commons" })}
              labelCol={{ span: 2 }}
            >
              <Input.TextArea
                autoSize={true}
                placeholder={t("description-input-placeholder").toString()}
              />
            </Form.Item>

            <Row gutter={24}>
              <Col>
                <Form.Item
                  name="isPublic"
                  label={t("Public", { ns: "commons" })}
                  valuePropName="checked"
                >
                  <Switch defaultChecked={true} />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label={t("Term", { ns: "commons" })}
                  name="termLocale"
                  rules={[
                    {
                      required: true,
                      message: "Please select the term language!",
                    },
                  ]}
                >
                  <SeclectLanguageInput
                    allLanguages={false}
                    valueType="locale"
                    dropdownMatchSelectWidth={false}
                    placeholder={t("Term", { ns: "commons" })}
                    exceptLanguages={[defineLocale]}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label={t("Define", { ns: "commons" })}
                  name="defineLocale"
                  rules={[
                    {
                      required: true,
                      message: "Please select the defined language!",
                    },
                  ]}
                >
                  <SeclectLanguageInput
                    allLanguages={false}
                    valueType="locale"
                    dropdownMatchSelectWidth={false}
                    placeholder={t("Define", { ns: "commons" })}
                    exceptLanguages={[termLocale]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col flex="none">
          <UploadImage
            aspect={3 / 2}
            fileList={fileList}
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
            beforeUpload={(file) => {
              const isPNG = file.type.includes("image");
              if (!isPNG) {
                message.error(`${file.name} is not a image file`);
                return Upload.LIST_IGNORE;
              }
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                const newFile: UploadFile = file;
                newFile.url = reader.result?.toString() || undefined;
                setFileList((prev) => [...prev, newFile]);
              };
              return false;
            }}
            limit={1}
          >
            {fileList.length < 1 && "+ Upload"}
          </UploadImage>
        </Col>
      </Row>
    );
  }
);

export default VocabularySetForm;
