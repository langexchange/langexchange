import { Drawer, FloatButton, Input, InputRef, message, Spin } from "antd";
import { useRef, useState } from "react";
import {
  useLazyLookupWordQuery,
  WordDictionary,
} from "../services/dictionary/dictionaryService";
import DictionaryDetail from "./DictionaryDetail";
import DictionaryIcon from "./DictionaryIcon";

const Dictionary: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);
  const [wordDictionary, setWordDictionary] = useState<WordDictionary[] | null>(
    null
  );
  const [lookupWord, { isLoading, isFetching }] = useLazyLookupWordQuery();

  const handleLookup = async () => {
    try {
      const word = inputRef.current?.input?.value;
      if (!word) return;
      const result = await lookupWord(word).unwrap();
      setWordDictionary(result);
    } catch (error) {
      message.error("Something went wrong, please try again late!", 1);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      inputRef.current?.focus({
        cursor: "end",
      });
    }, 300);
  };

  return (
    <>
      <FloatButton onClick={handleOpen} icon={<DictionaryIcon />} />
      <Drawer
        title={
          <>
            <span className="color-blue-logo">Lang</span>
            <span className="color-red-logo">Exchange</span> Dictionary
          </>
        }
        placement="left"
        width={800}
        onClose={() => setOpen(false)}
        open={open}
        extra={
          <Input
            placeholder="Type word to lookup..."
            ref={inputRef}
            allowClear
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleLookup();
                inputRef.current?.input?.blur();
              }
            }}
            style={{ minWidth: "350px" }}
          />
        }
      >
        <Spin spinning={isLoading || isFetching}>
          <DictionaryDetail data={wordDictionary} />
        </Spin>
      </Drawer>
    </>
  );
};

export default Dictionary;
