import { useState } from "react";
import { Col, Row, Tabs } from "antd";
import ProfileCard from "./ProfileCard";
import PostList from "../../components/community/PostList";
import VocabularyList from "../../components/partners/VocabularyList";
import PostModal from "../../components/PostModal";
import VocabularyModal from "../../components/VocabularyModal";

const onChange = (key: string) => {
  console.log(key);
};

const PartnerDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVocabularyOpen, setIsModalVocabularyOpen] = useState(false);

  const showModal = () => {
    console.log("show");
    setIsModalOpen(true);
  };

  const showModalVocabulary = () => {
    console.log("show");
    setIsModalVocabularyOpen(true);
  };

  const [post, setPost] = useState({
    owner: {
      fullname: "",
      color: "",
      image: "",
    },
    images: [""],
    contents: "",
    languages: [""],
    emotions: "",
    comments: "",
    time: "",
  });

  const [vocabularySet, setVocabularySet] = useState({
    title: "",
    descriptions: "",
    termLanguage: "",
    defineLanguage: "",
  });

  return (
    <>
      <Col
        span={18}
        // style={{ paddingLeft: "12px" }}
        className="height-full pos-relative"
      >
        <Row className="height-full pos-relative" gutter={12}>
          <Col span={10} className="height-full pos-relative">
            <ProfileCard />
          </Col>
          <Col span={14} className="height-full pos-relative">
            <Tabs
              className="height-full pos-relative tab-bar-with-content-scroll"
              onChange={onChange}
              type="card"
              items={[
                {
                  label: `Posts`,
                  key: "posts",
                  children: (
                    <div style={{ padding: "0 12px" }}>
                      <PostList setPost={setPost} showModal={showModal} />
                    </div>
                  ),
                },
                {
                  label: `Vocabularies`,
                  key: "vocabularies",
                  children: (
                    <VocabularyList
                      colSpan={24}
                      editable={false}
                      setVocabularySet={setVocabularySet}
                      showModal={showModalVocabulary}
                    />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      </Col>
      <PostModal
        post={post}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <VocabularyModal
        vocabularySet={vocabularySet}
        isModalVocabularyOpen={isModalVocabularyOpen}
        setIsModalVocabularyOpen={setIsModalVocabularyOpen}
      />
    </>
  );
};

export default PartnerDetailPage;
