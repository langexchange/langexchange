import { useState } from "react";
import { Col, Row, Tabs, TabsProps } from "antd";
import ProfileCard from "./ProfileCard";
import PostList from "../../components/community/PostList";
import VocabularyList from "../../components/partners/VocabularyList";
import PostModal from "../../components/PostModal";
import VocabularyModal from "../../components/VocabularyModal";
import VocabularySet from "../../types/VocabularySet";
import Post from "../../types/Post";
import { useTranslation } from "react-i18next";

const onChange = (key: string) => { };

const PartnerDetailPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const [vocabularySet, setVocabularySet] = useState<VocabularySet | null>(
    null
  );
  const [isModalVocabularyOpen, setIsModalVocabularyOpen] =
    useState<boolean>(false);
  const [t] = useTranslation(["commons"]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalVocabulary = () => {
    setIsModalVocabularyOpen(true);
  };

  const tabItems: TabsProps["items"] = [
    {
      label: t("Posts"),
      key: "posts",
      children: (
        <div className="px-3">
          {/* <PostList setPost={setPost} showModal={showModal} /> */}
        </div>
      ),
    },
    {
      label: t("Vocabularies"),
      key: "vocabularies",
      children: (
        <div className="px-3">
          <VocabularyList
            colSpan={24}
            editable={false}
            setVocabularySet={setVocabularySet}
            showModal={showModalVocabulary}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <Col span={18} className="height-full pos-relative">
        <Row className="height-full pos-relative">
          <Col span={10} className="height-full pos-relative">
            {/* <ProfileCard /> */}
          </Col>
          <Col span={14} className="height-full pos-relative">
            <Tabs
              className="height-full pos-relative tab-bar-with-content-scroll"
              onChange={onChange}
              items={tabItems}
              tabBarStyle={{
                padding: "0 16px",
              }}
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
