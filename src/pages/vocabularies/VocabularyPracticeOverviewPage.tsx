import { useTranslation } from "react-i18next";

const VocabularyPracticeOverviewPage = () => {
  const [t] = useTranslation(["vocabulary"]);
  return (
    <div style={{ fontSize: "36px" }} className="color-secondary text-300">
      {t("message-to-let-user-choose-set")}
    </div>
  );
};

export default VocabularyPracticeOverviewPage;
