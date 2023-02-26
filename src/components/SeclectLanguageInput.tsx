import { Select, SelectProps, Tag, TagProps } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

const languages = [
  {
    value: "english",
    label: "English",
    color: "blue",
  },
  {
    value: "vietnamese",
    label: "Vietnamese",
    color: "blue",
  },
  {
    value: "chinese",
    label: "Chinese",
    color: "blue",
  },
  {
    value: "japanese",
    label: "Japanese",
    color: "blue",
  },
  {
    value: "korean",
    label: "Korean",
    color: "blue",
  },
  {
    value: "laos",
    label: "Laos",
    color: "blue",
  },
];

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
