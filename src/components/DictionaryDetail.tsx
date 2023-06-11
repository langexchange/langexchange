import { Button, Image, Space, Tag, Typography } from "antd";
import { SoundOutlined, AntDesignOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { WordDictionary } from "../services/dictionary/dictionaryService";
import DictionaryImage from "../assets/images/dictionary.avif";

interface DictionaryDetailProps {
  data: WordDictionary[] | null;
}

const DictionaryDetail: React.FC<DictionaryDetailProps> = ({ data }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!data)
    return (
      <div className="text-center fz-20 text-300 color-secondary">
        <span className="color-blue-logo">Lang</span>
        <span className="color-red-logo">Exchange</span> will help you to lookup
        word and its meaning.
        <Image
          src={DictionaryImage}
          alt="Dictionary"
          preview={false}
          width="min(500px, 100vw)"
          className="mt-3"
        />
      </div>
    );

  return (
    <div>
      <Typography.Title level={2} className="mb-2">
        {data[0].word}
      </Typography.Title>
      <div>
        <Space size={4} align="center" className="mb-2">
          <Typography.Text>
            {data[0].phonetics.find((x) => x.text)?.text}
          </Typography.Text>
          <audio
            src={data[0].phonetics.find((x) => x.audio)?.audio}
            controls
            style={{ width: "100%", height: "40px" }}
            ref={audioRef}
            hidden
          />
          <Button
            onClick={() => audioRef.current?.play()}
            size="small"
            shape="circle"
            type="text"
            icon={<SoundOutlined />}
          />
        </Space>
      </div>
      <Space direction="vertical">
        {data[0].meanings.map((x) => (
          <div>
            <div className="mb-2 mt-3">
              <Tag color="#1d2956">
                <Typography.Title
                  level={4}
                  className="m-0"
                  style={{ color: "#fff" }}
                >
                  {x.partOfSpeech}
                </Typography.Title>
              </Tag>
            </div>
            <div
              className="ps-3"
              style={{
                borderLeft: "2px solid #1d2956",
                borderRadius: "16px",
              }}
            >
              <Space direction="vertical">
                {x.definitions.map((y) => (
                  <Space direction="vertical" className="mb-3">
                    <Typography.Text strong className="fz-16">
                      <AntDesignOutlined /> {y.definition}
                    </Typography.Text>
                    {y.example && (
                      <div
                        className="rounded-3 has-background-color p-2 pe-3"
                        style={{ width: "fit-content" }}
                      >
                        <Typography.Text strong italic className="fz-12">
                          Example
                        </Typography.Text>
                        <br />
                        <Typography.Text italic className="ms-2">
                          {y.example}
                        </Typography.Text>
                      </div>
                    )}
                  </Space>
                ))}
              </Space>
              {x.synonyms.length > 0 && (
                <div
                  className="rounded-3 has-background-color p-2 px-3 mb-3"
                  style={{ width: "fit-content" }}
                >
                  <div className="mb-1">
                    <Typography.Text strong type="success">
                      Synonyms
                    </Typography.Text>
                  </div>
                  <div className="d-flex flex-wrap">
                    {x.synonyms.map((z, index) => (
                      <div key={index} className="me-3">
                        • <Typography.Text>{z}</Typography.Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {x.antonyms.length > 0 && (
                <div
                  className="rounded-3 has-background-color p-2 px-3 mb-3"
                  style={{ width: "fit-content" }}
                >
                  <div className="mb-1">
                    <Typography.Text strong type="danger">
                      Antonyms
                    </Typography.Text>
                  </div>
                  <div className="d-flex flex-wrap">
                    {x.antonyms.map((z, index) => (
                      <div key={index} className="me-3">
                        • <Typography.Text>{z}</Typography.Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </Space>
    </div>
  );
};

export default DictionaryDetail;
