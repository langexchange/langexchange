import { useTranslation } from "react-i18next";
import VocabularyStaticChart from "../../components/tracking/VocabularyStaticChart";

const VocabularyPracticeOverviewPage = () => {
  const [t] = useTranslation(["vocabulary"]);
  return (
    <div style={{ fontSize: "36px" }} className="color-secondary text-300">
      <div className="mb-4">{t("message-to-let-user-choose-set")}</div>
      <VocabularyStaticChart />
    </div>
  );
};

export default VocabularyPracticeOverviewPage;
