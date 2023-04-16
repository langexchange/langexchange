import { Select, SelectProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { selectCredentials } from "../features/auth/authSlice";
import { selectLanguages } from "../features/languages/languageSlice";
import { useAppSelector } from "../hooks/hooks";
import { useGetLanguageByUserQuery } from "../services/languages/languageService";

interface SeclectLanguageInputProps extends SelectProps {
  width?: string | number;
  color?: string;
  useCustomTagRender?: boolean;
  allLanguages?: boolean;
  exceptLanguages?: string[];
  setExceptLanguages?: React.Dispatch<React.SetStateAction<string[]>>;
  valueType?: "locale" | "id";
}

const tagRender = (props: any) => {
  const { label, value, color, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={color || "blue"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const SeclectLanguageInput: React.FC<SeclectLanguageInputProps> = ({
  allLanguages = true,
  width,
  exceptLanguages = [],
  setExceptLanguages,
  color = "blue",
  useCustomTagRender = true,
  valueType = "id",
  ...rest
}) => {
  const widthProperty = (typeof width === "number" && `${width}px`) || width;
  const [t] = useTranslation(["commons"]);
  const initialLanguageOptions = [
    {
      value: "en",
      label: t("English"),
      color: "blue",
    },
    {
      value: "vi",
      label: t("Vietnamese"),
      color: "blue",
    },
    {
      value: "vn",
      label: t("Chinese"),
      color: "blue",
    },
    {
      value: "japanese",
      label: t("Japanese"),
      color: "blue",
    },
    {
      value: "korean",
      label: t("Korean"),
      color: "blue",
    },
    {
      value: "laos",
      label: t("Laos"),
      color: "blue",
    },
  ];
  const listLanguages = useAppSelector(selectLanguages);
  const [languages, setLanguages] = useState(initialLanguageOptions);
  const credentials = useAppSelector(selectCredentials);
  const { data: userLanguages, isLoading } = useGetLanguageByUserQuery(
    credentials?.userId || "",
    { skip: !credentials?.userId || allLanguages }
  );

  useEffect(() => {
    if (!listLanguages) return;
    if (!allLanguages) return;

    const newLanguages = listLanguages?.map((language) => ({
      value: valueType === "id" ? language.id : language.localeCode,
      label: t(language.name),
      color: "blue",
    }));

    setLanguages(
      newLanguages.filter(
        (language) =>
          !exceptLanguages?.includes(language.value) ||
          language.value === rest.value
      )
    );
  }, [listLanguages, exceptLanguages]);

  useEffect(() => {
    if (!userLanguages) return;
    if (allLanguages) return;

    const newLanguages = userLanguages.map((language) => ({
      value: valueType === "id" ? language.id : language.localeCode,
      label: t(language.name),
      color: "blue",
    }));

    setLanguages(
      newLanguages.filter(
        (language) =>
          !exceptLanguages?.includes(language.value) ||
          language.value === rest.value
      )
    );
  }, [userLanguages, isLoading, exceptLanguages]);

  return (
    <Select
      {...rest}
      tagRender={
        useCustomTagRender
          ? (props) => tagRender({ ...props, color })
          : undefined
      }
      options={languages?.map((language) => ({ ...language, color }))}
      style={(width && { ...rest.style, width: widthProperty }) || rest.style}
      showSearch
      filterOption={(input, option) =>
        (option?.label?.toString() ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      onChange={(value, option) => {
        rest.onChange?.(value, option);
        setExceptLanguages?.((prev) => [
          ...prev.filter((item) => item !== rest.value),
          value,
        ]);
      }}
    />
  );
};

export default SeclectLanguageInput;
