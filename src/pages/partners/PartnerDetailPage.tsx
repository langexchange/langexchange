import { useState } from "react";
import { Col, Row, Tabs, TabsProps } from "antd";
import ProfileCard from "./ProfileCard";
import VocabularyList from "../../components/partners/VocabularyList";
import VocabularyModal from "../../components/VocabularyModal";
import VocabularySet from "../../types/VocabularySet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ProfileWallPage from "../profiles/ProfileWallPage";
import ProfileVocabulariesPage from "../../pages/profiles/ProfileVocabulariePage";

const PartnerDetailPage: React.FC = () => {
  const [t] = useTranslation(["commons"]);
  const { id: userId } = useParams<{ id: string }>();
  const [vocabularySet, setVocabularySet] = useState<VocabularySet | null>(
    null
  );
  const [isModalVocabularyOpen, setIsModalVocabularyOpen] =
    useState<boolean>(false);
  const showModalVocabulary = () => {
    setIsModalVocabularyOpen(true);
  };

  const tabItems: TabsProps["items"] = [
    {
      label: t("Posts"),
      key: "posts",
      children: (
        <div className="px-3">
          <ProfileWallPage />
        </div>
      ),
    },
    {
      label: t("Vocabularies"),
      key: "vocabularies",
      children: (
        <div className="px-3">
          <ProfileVocabulariesPage />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="height-full pos-relative">
        <Row className="height-full pos-relative">
          <Col span={10} className="height-full pos-relative">
            <ProfileCard userId={userId} />
          </Col>
          <Col span={14} className="height-full pos-relative">
            <Tabs
              className="height-full pos-relative tab-bar-with-content-scroll"
              items={tabItems}
              tabBarStyle={{
                padding: "0 16px",
              }}
            />
          </Col>
        </Row>
      </div>
      <VocabularyModal
        vocabularySet={vocabularySet}
        isModalVocabularyOpen={isModalVocabularyOpen}
        setIsModalVocabularyOpen={setIsModalVocabularyOpen}
      />
    </>
  );
};

export default PartnerDetailPage;
