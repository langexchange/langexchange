import { Select, SelectProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { selectLanguages } from "../features/languages/languageSlice";
import { useAppSelector } from "../hooks/hooks";

interface Props extends SelectProps {
  width?: string | number;
  color?: string;
  useCustomTagRender?: boolean;
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

const SeclectLanguageInput = ({
  width,
  color = "blue",
  useCustomTagRender = true,
  ...rest
}: Props) => {
  const widthProperty = (typeof width === "number" && `${width}px`) || width;
  const [t] = useTranslation(["commons"]);
  const initialLanguageOptions = [
    {
      value: "english",
      label: t("English"),
      color: "blue",
    },
    {
      value: "vietnamese",
      label: t("Vietnamese"),
      color: "blue",
    },
    {
      value: "chinese",
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

  useEffect(() => {
    if (!listLanguages) return;
    const languages = listLanguages?.map((language) => ({
      value: language.id,
      label: t(language.name),
      color: "blue",
    }));
    setLanguages(languages);
  }, [listLanguages]);

  return (
    <Select
      {...rest}
      defaultValue={["english"]}
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
    />
  );
};

export default SeclectLanguageInput;
