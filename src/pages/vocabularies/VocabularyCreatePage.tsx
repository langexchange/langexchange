import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/hooks";
import useUploadFile from "../../hooks/upload/useUploadFile";
import { PlusOutlined } from "@ant-design/icons";
import { selectCredentials } from "../../features/auth/authSlice";
import { Button, Form, message, Space, Typography, UploadFile } from "antd";
import VocabularySetForm from "../../components/vocabularies/VocabularySetForm";
import ListCardAddVocabulary from "../../components/vocabularies/ListCardAddVocabulary";
import {
  CreateVocabularySetRequest,
  useCreateVocabularySetMutation,
  Vocabulary,
} from "../../services/vocabulary/vocabularyService";
import BackCircleButton from "../../components/BackCircleButton";

export interface VocabularyForm extends Vocabulary {
  fileList: UploadFile[];
  error?: boolean;
}

const initial = [
  {
    term: "",
    define: "",
    imageUrl: "",
    fileList: [],
    error: false,
  },
  {
    term: "",
    define: "",
    imageUrl: "",
    fileList: [],
    error: false,
  },
];
const VocabularyCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const [createVocabularySet, { isLoading: isCreating }] =
    useCreateVocabularySetMutation();
  const credentials = useAppSelector(selectCredentials);
  const [items, setItems] = useState<VocabularyForm[]>(initial);
  const [fileList, setFileList, uploadFiles, isUploading] = useUploadFile(
    [],
    credentials.incId,
    "image"
  );

  const validateVocabularies = () => {
    let flag = true;
    setItems((prev) => {
      prev.map((item) => {
        if (item.term && !item.define && !item.imageUrl) {
          item.error = true;
          flag = false;
        }
        if (!item.term && (item.define || item.imageUrl)) {
          item.error = true;
          flag = false;
        }

        return item;
      });
      return [...prev];
    });
    return flag;
  };

  const onCreate = async (values: any) => {
    try {
      const images = await uploadFiles();
      const vocabularies: Vocabulary[] = [];
      items.forEach((item) => {
        if (!item.term) return;

        vocabularies.push({
          term: item.term,
          define: item.define,
          imageUrl: item.imageUrl,
        });
      });
      const data: CreateVocabularySetRequest = {
        ...values,
        imageUrl: images[0]?.url,
        vocabularyPairs: vocabularies,
      };
      await createVocabularySet(data).unwrap();
      message.success("Create set successfully");
      form.resetFields();
      setFileList([]);
      setItems([...initial]);
    } catch (error) {
      message.error("Create set failed");
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      const valid = validateVocabularies();
      if (!valid) return;
      onCreate(values);
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  }, [items, form]);

  return (
    <div className="height-full" style={{ minHeight: "calc(100vh - 48px)" }}>
      <div className="m-auto py-4">
        <PageTitle
          handleSubmit={handleSubmit}
          isLoading={isUploading || isCreating}
        />
        <VocabularySetForm
          form={form}
          fileList={fileList}
          setFileList={setFileList}
        />
        <ListCardAddVocabulary items={items} setItems={setItems} />
      </div>
    </div>
  );
};

interface PageTitleProps {
  handleSubmit: () => Promise<void>;
  isLoading: boolean;
}

const PageTitle: React.FC<PageTitleProps> = memo(function PageTitle({
  handleSubmit,
  isLoading,
}) {
  const [t] = useTranslation(["vocabulary", "commons"]);
  return (
    <div className="d-flex align-items-center justify-space-between mb-4">
      <Space>
        <BackCircleButton />
        <Typography.Title className="m-0" level={3}>
          {t("create-set-page-title")}
        </Typography.Title>
      </Space>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleSubmit}
        loading={isLoading}
      >
        {t("Create", { ns: "commons" })}
      </Button>
    </div>
  );
});

export default VocabularyCreatePage;
