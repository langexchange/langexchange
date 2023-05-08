import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/hooks";
import useUploadFile from "../../hooks/upload/useUploadFile";
import { PlusOutlined } from "@ant-design/icons";
import { selectCredentials } from "../../features/auth/authSlice";
import {
  Button,
  Form,
  message,
  Skeleton,
  Space,
  Typography,
  UploadFile,
} from "antd";
import VocabularySetForm from "../../components/vocabularies/VocabularySetForm";
import ListCardAddVocabulary from "../../components/vocabularies/ListCardAddVocabulary";
import {
  CreateVocabularySetRequest,
  useGetVocabularySetQuery,
  useUpdateVocabularySetMutation,
  Vocabulary,
} from "../../services/vocabulary/vocabularyService";
import BackCircleButton from "../../components/BackCircleButton";
import { useNavigate, useParams } from "react-router-dom";
import { imageUrlToUploadFileAntd } from "../../utils/uploadFiles/convertToUploadFileAntd";

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

export interface VocabularyForm extends Vocabulary {
  fileList: UploadFile[];
  error?: boolean;
}

const VocabularyEditPage: React.FC = () => {
  const [form] = Form.useForm();
  const [updateVocabularySet, { isLoading: isUpdating }] =
    useUpdateVocabularySetMutation();
  const credentials = useAppSelector(selectCredentials);
  const [items, setItems] = useState<VocabularyForm[]>(initial);
  const [fileList, setFileList, uploadFiles, isUploading] = useUploadFile(
    [],
    credentials.incId,
    "image"
  );

  const { vocabularySetId } = useParams<{ vocabularySetId: string }>();
  const { data, isLoading } = useGetVocabularySetQuery(vocabularySetId || "", {
    skip: !vocabularySetId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!data) return;
    form.setFieldsValue({
      title: data.vocabularyPackageDtos[0].title,
      description: data.vocabularyPackageDtos[0].description,
      isPublic: data.vocabularyPackageDtos[0].isPublic,
      termLocale: data.vocabularyPackageDtos[0].termLocale,
      defineLocale: data.vocabularyPackageDtos[0].defineLocale,
    });
    if (data.vocabularyPackageDtos[0].imageUrl) {
      setFileList([
        imageUrlToUploadFileAntd(data.vocabularyPackageDtos[0].imageUrl),
      ]);
    }
    const oldItems = data.vocabularyPackageDtos[0].vocabularyDtos.map(
      (item) => {
        return {
          term: item.term,
          define: item.define,
          imageUrl: item.imageUrl,
          fileList: item.imageUrl
            ? [imageUrlToUploadFileAntd(item.imageUrl)]
            : [],
          error: false,
        };
      }
    );
    setItems(oldItems);
  }, [data]);
  const navigate = useNavigate();

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

  const onUpdate = async (values: any) => {
    try {
      const images = await uploadFiles();
      const vocabularies = items.map((item) => {
        return {
          term: item.term,
          define: item.define,
          imageUrl: item.imageUrl,
        };
      });
      const data: CreateVocabularySetRequest = {
        ...values,
        imageUrl: images[0]?.url,
        vocabularyPairs: vocabularies,
      };
      await updateVocabularySet({
        id: vocabularySetId || "",
        body: data,
      }).unwrap();
      message.success("Update successfully");
      form.resetFields();
      setFileList([]);
      setItems(initial);
      navigate(`/vocabularies/${vocabularySetId}`, { replace: true });
    } catch (error) {
      message.error("Update failed");
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      const valid = validateVocabularies();
      if (!valid) return;
      onUpdate(values);
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  }, [items, form]);

  return (
    <div className="height-full" style={{ minHeight: "calc(100vh - 48px)" }}>
      <div className="m-auto py-4">
        <PageTitle
          handleSubmit={handleSubmit}
          isLoading={isUploading || isUpdating}
          title={data?.vocabularyPackageDtos[0].title || ""}
        />
        {isLoading ? (
          <Skeleton active />
        ) : (
          <>
            <VocabularySetForm
              form={form}
              fileList={fileList}
              setFileList={setFileList}
            />
            <ListCardAddVocabulary items={items} setItems={setItems} />
          </>
        )}
      </div>
    </div>
  );
};

interface PageTitleProps {
  handleSubmit: () => Promise<void>;
  isLoading: boolean;
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = memo(function PageTitle({
  handleSubmit,
  isLoading,
  title,
}) {
  const [t] = useTranslation(["vocabulary", "commons"]);
  return (
    <div className="d-flex align-items-center justify-space-between mb-4">
      <Space>
        <BackCircleButton />
        <Typography.Title className="m-0" level={3}>
          {title}
        </Typography.Title>
      </Space>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleSubmit}
        loading={isLoading}
      >
        {t("Update", { ns: "commons" })}
      </Button>
    </div>
  );
});

export default VocabularyEditPage;
