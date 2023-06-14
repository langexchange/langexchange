import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import VocabularyStaticChart from "../../components/tracking/VocabularyStaticChart";

const VocabularyPracticeOverviewPage = () => {
  const [t] = useTranslation(["vocabulary"]);
  return (
    <div className="w-100 text-center">
      <span
        className="mb-4 text-300 secondary-color"
        style={{ fontSize: "24px", wordWrap: "break-word" }}
      >
        {t("message-to-let-user-choose-set")}
      </span>
      <VocabularyStaticChart />
    </div>
  );
};

export default VocabularyPracticeOverviewPage;
