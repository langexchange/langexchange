import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { InputRef, TagProps } from "antd";
import { Space, Input, Tag, Tooltip } from "antd";

interface Props {
  width?: number | string;
  verticalAlign?: string;
  background?: string;
  borderStyle?: string;
  placeholder?: string;
  tags: string[];
  setTags: React.Dispatch<SetStateAction<string[]>>;
  tagColor?: TagProps["color"];
  placeholderStyle?: React.CSSProperties;
  limit?: number;
}
const TagsInput = ({
  width = "100%",
  verticalAlign = "top",
  background = "white",
  borderStyle = "dash",
  placeholder = "New tag",
  placeholderStyle,
  tagColor,
  tags,
  setTags,
  limit = 2000,
}: Props) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };

  const tagInputStyle: React.CSSProperties = {
    width: width,
    verticalAlign: verticalAlign,
  };

  const tagPlusStyle: React.CSSProperties = {
    background: background,
    borderStyle: borderStyle,
  };

  return (
    <Space size={[0, 8]} wrap align="center" className="h-100">
      <Space size={[0, 8]} wrap align="center">
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="small"
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable={true}
              style={{ userSelect: "none" }}
              onClose={() => handleClose(tag)}
              color={tagColor}
            >
              <span
                onDoubleClick={(e) => {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      </Space>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : tags.length >= limit ? null : (
        <Tag style={tagPlusStyle} onClick={showInput}>
          <span style={placeholderStyle}>
            <PlusOutlined /> {placeholder}
          </span>
        </Tag>
      )}
    </Space>
  );
};

export default TagsInput;
