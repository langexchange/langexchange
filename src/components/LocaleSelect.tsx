import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CN, FR, VN } from "country-flag-icons/react/3x2";
import { Select, SelectProps } from "antd";

const LocaleSelect: React.FC<SelectProps> = (props) => {
  const { t, i18n } = useTranslation(["commons"]);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    setSelectedLanguage(value);
  };

  const languages = [
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg"
            width={24}
            alt="EN"
          />
          EN
        </div>
      ),
      value: "en",
    },
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <div style={{ width: "24px" }} className="d-flex align-items-center">
            <VN title="Vietnamese" style={{ width: "24px" }} />
          </div>
          VI
        </div>
      ),
      value: "vi",
    },
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <div style={{ width: "24px" }} className="d-flex align-items-center">
            <CN title="Chinese" style={{ width: "24px" }} />
          </div>
          CN
        </div>
      ),
      value: "cn",
    },
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <div style={{ width: "24px" }} className="d-flex align-items-center">
            <FR title="france" style={{ width: "24px" }} />
          </div>
          FR
        </div>
      ),
      value: "fr",
    },
  ];
  return (
    <Select
      className="d-block"
      options={languages}
      bordered={false}
      onChange={handleChangeLanguage}
      defaultValue={i18n.language}
      value={selectedLanguage}
      dropdownMatchSelectWidth={false}
      {...props}
    />
  );
};

export default LocaleSelect;
