import { Select, SelectProps, Tag } from "antd";
import { useTranslation } from "react-i18next";

interface Props extends SelectProps {
  width?: string | number;
  color?: string;
}

const tagRender = (props: any) => {
  console.log(props);
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

const SeclectLanguageInput = ({ width, color = "blue", ...rest }: Props) => {
  const widthProperty = (typeof width === "number" && `${width}px`) || width;
  const [t] = useTranslation(["commons"]);

  const languages = [
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
  return (
    <Select
      {...rest}
      defaultValue={["english"]}
      tagRender={(props) => tagRender({ ...props, color })}
      options={languages.map((language) => ({ ...language, color }))}
      style={(width && { ...rest.style, width: widthProperty }) || rest.style}
    />
  );
};

export default SeclectLanguageInput;
