import { Select, SelectProps, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

const languages: SelectProps["options"] = [
  {
    value: "english",
    label: "English",
  },
  {
    value: "vietnamese",
    label: "Vietnamese",
  },
  {
    value: "chinese",
    label: "Chinese",
  },
  {
    value: "japanese",
    label: "Japanese",
  },
  {
    value: "korean",
    label: "Korean",
  },
  {
    value: "laos",
    label: "Laos",
  },
];

interface Props extends SelectProps {
  width?: string | number;
}

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color="blue"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const SeclectLanguageInput = ({ width, ...rest }: Props) => {
  const widthProperty = (typeof width === "number" && `${width}px`) || width;
  console.log({ ...rest.style, width: widthProperty });
  return (
    <Select
      {...rest}
      defaultValue={["english"]}
      tagRender={tagRender}
      options={languages}
      style={(width && { ...rest.style, width: widthProperty }) || rest.style}
    />
  );
};

export default SeclectLanguageInput;
