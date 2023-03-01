import { useState } from "react";
import {
  Button,
  Col,
  Input,
  message,
  Row,
  Select,
  SelectProps,
  Steps,
  theme,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { VN } from "country-flag-icons/react/3x2";

const BasicInformationForm: React.FC = () => {
  const [t] = useTranslation(["initial"]);
  return (
    <div className="text-center w-100">
      <Typography.Title level={2} className="text-300">
        {t("How can I call you!")}
      </Typography.Title>
      <br />
      <Input
        size="large"
        placeholder={t("First name").toString()}
        className="w-50 has-background-color rounded-pill"
        bordered={false}
      />
      <br />
      <br />
      <Input
        size="large"
        placeholder={t("Last name").toString()}
        className="w-50 has-background-color rounded-pill"
        bordered={false}
      />
    </div>
  );
};

const SetupLanguagesForm: React.FC = () => {
  const [t] = useTranslation(["initial"]);
  const options: SelectProps["options"] = [
    {
      value: "english",
      label: t("English"),
    },
    {
      value: "vietnamese",
      label: t("Vietnamese"),
    },
    {
      value: "chinese",
      label: t("Chinese"),
    },
    {
      value: "japanese",
      label: t("Japanese"),
    },
    {
      value: "korean",
      label: t("Korean"),
    },
    {
      value: "laos",
      label: t("Laos"),
    },
  ];
  return (
    <div className="text-center w-100">
      <Row gutter={32}>
        <Col span={12}>
          <Typography.Title level={2} className="text-300">
            {t("Your native languages?")}
          </Typography.Title>
          <br />
          <Select
            mode="multiple"
            size="large"
            placeholder={t("input-native-placeholder")}
            style={{ width: "100%" }}
            options={options}
            className="has-background-color rounded-3"
            bordered={false}
          />
        </Col>
        <Col span={12}>
          <Typography.Title level={2} className="text-300">
            {t("You want to improve...")}
          </Typography.Title>
          <br />
          <Select
            mode="multiple"
            size="large"
            placeholder={t("input-target-placeholder")}
            style={{ width: "100%" }}
            options={options}
            className="has-background-color rounded-3"
            bordered={false}
          />
        </Col>
      </Row>
    </div>
  );
};

const MoreInformation: React.FC = () => {
  const [t] = useTranslation(["initial"]);
  const countryOptions = [
    { label: t("Viet Nam", { ns: "commons" }), value: "1" },
    { label: t("China", { ns: "commons" }), value: "2" },
    { label: t("United States", { ns: "commons" }), value: "3" },
    { label: t("United Kingdom", { ns: "commons" }), value: "4" },
    { label: t("Japan", { ns: "commons" }), value: "5" },
    { label: t("Korea", { ns: "commons" }), value: "6" },
    { label: t("Brazil", { ns: "commons" }), value: "7" },
    { label: t("Canada", { ns: "commons" }), value: "8" },
  ];
  return (
    <div className="text-center w-100">
      <Typography.Title level={2} className="text-300">
        {t("Your country")}
      </Typography.Title>
      <Select
        size="large"
        placeholder={t("Country")}
        style={{ width: "100%" }}
        options={countryOptions}
        className="has-background-color rounded-3 w-50"
        bordered={false}
      />
      <br />
      <br />
      <Typography.Title level={2} className="text-300">
        {t("Bio")}
      </Typography.Title>
      <Input.TextArea
        placeholder={t("Bio").toString() + "..."}
        size="large"
        rows={3}
        bordered={false}
        className="has-background-color w-50"
      />
    </div>
  );
};

const InitialPage: React.FC = () => {
  const { t, i18n } = useTranslation(["initial", "commons"]);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    setSelectedLanguage(value);
    message.success("Change language success");
  };
  const steps = [
    {
      title: t("Basic information"),
      content: <BasicInformationForm />,
    },
    {
      title: t("Setup languages"),
      content: <SetupLanguagesForm />,
    },
    {
      title: t("More information"),
      content: <MoreInformation />,
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    minHeight: "300px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
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
  ];
  return (
    <div style={{ maxHeight: "100vh" }} className="pt-5">
      <Select
        className="float-right me-5"
        options={languages}
        bordered={false}
        onChange={handleChangeLanguage}
        defaultValue={i18n.language}
        value={selectedLanguage}
        dropdownMatchSelectWidth={false}
      />
      <div className="container py-5">
        <div className="text-center mb-3">
          <Typography.Title level={2} style={{ margin: 0 }}>
            {t("Welcome to")} <span className="color-blue-logo">Lang</span>
            <span className="color-red-logo">Exchange</span>
          </Typography.Title>
          <br />
          <Typography.Text className="text-300 fz-24">
            {t("initial-title")}
          </Typography.Text>
        </div>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              {t("Next", { ns: "commons" })}
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              {t("Done", { ns: "commons" })}
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              {t("Previous", { ns: "commons" })}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
