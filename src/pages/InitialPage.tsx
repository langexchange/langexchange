import { useState } from "react";
import {
  Button,
  Col,
  Input,
  message,
  Row,
  Spin,
  Steps,
  theme,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import AuthenBackgroundImage from "../assets/images/authen_bg.png";
import { useUpdateProfileMutation } from "../services/profile/profileServices";
import { useAppSelector } from "../hooks/hooks";
import { selectCurrentUserId } from "../features/auth/authSlice";
import { useNavigate, useOutletContext } from "react-router-dom";
import SeclectLanguageInput from "../components/SeclectLanguageInput";
import CountrySelectInput from "../components/CountrySelectInput";
import LocaleSelect from "../components/LocaleSelect";

interface BasicInfo {
  firstName: string;
  lastName: string;
  nativeLanguage: string;
  targetLanguages: string[];
  country: string;
  introduction: string;
}

interface ItemStepProps {
  setBasicInfo: (key: string, value: any) => void;
  basicInfo: BasicInfo;
}

const BasicInformationForm: React.FC<ItemStepProps> = (props) => {
  const {
    basicInfo: { firstName, lastName },
    setBasicInfo,
  } = props;
  const [t] = useTranslation(["initial"]);
  return (
    <div className="text-center w-100">
      <Typography.Title level={2} className="text-300">
        {t("How can I call you!")}
      </Typography.Title>
      <br />
      <Input
        name="firstName"
        size="large"
        placeholder={t("First name").toString()}
        className="w-50 has-background-color rounded-pill"
        bordered={false}
        value={firstName}
        onChange={(e) => setBasicInfo(e.target.name, e.target.value)}
      />
      <br />
      <br />
      <Input
        size="large"
        name="lastName"
        placeholder={t("Last name").toString()}
        className="w-50 has-background-color rounded-pill"
        bordered={false}
        value={lastName}
        onChange={(e) => setBasicInfo(e.target.name, e.target.value)}
      />
    </div>
  );
};

const SetupLanguagesForm: React.FC<ItemStepProps> = (props) => {
  const {
    basicInfo: { nativeLanguage, targetLanguages },
    setBasicInfo,
  } = props;
  const [t] = useTranslation(["initial"]);
  return (
    <div className="text-center w-100">
      <Row gutter={32}>
        <Col span={12}>
          <Typography.Title level={2} className="text-300">
            {t("Your native languages?")}
          </Typography.Title>
          <br />
          <SeclectLanguageInput
            size="large"
            placeholder={t("input-native-placeholder")}
            style={{ width: "100%" }}
            className="has-background-color rounded-3"
            bordered={false}
            value={nativeLanguage || null}
            onChange={(value) => {
              setBasicInfo("nativeLanguage", value);
            }}
            exceptLanguages={targetLanguages}
          />
        </Col>
        <Col span={12}>
          <Typography.Title level={2} className="text-300">
            {t("You want to improve...")}
          </Typography.Title>
          <br />
          <SeclectLanguageInput
            mode="multiple"
            size="large"
            placeholder={t("input-target-placeholder")}
            style={{ width: "100%" }}
            className="has-background-color rounded-3"
            bordered={false}
            showArrow
            value={targetLanguages}
            exceptLanguages={[nativeLanguage]}
            onChange={(value) => {
              setBasicInfo("targetLanguages", value);
            }}
            useCustomTagRender={false}
          />
        </Col>
      </Row>
    </div>
  );
};

const MoreInformation: React.FC<ItemStepProps> = (props) => {
  const {
    basicInfo: { country, introduction },
    setBasicInfo,
  } = props;

  const [t] = useTranslation(["initial"]);
  return (
    <div className="text-center w-100">
      <Typography.Title level={2} className="text-300">
        {t("Your country")}
      </Typography.Title>
      <CountrySelectInput
        size="large"
        placeholder={t("Country")}
        style={{ width: "100%" }}
        className="has-background-color rounded-3 w-50"
        bordered={false}
        value={country || null}
        onChange={(value) => setBasicInfo("country", value)}
      />
      <br />
      <br />
      <Typography.Title level={2} className="text-300">
        {t("Bio")}
      </Typography.Title>
      <Input.TextArea
        placeholder={t("Bio").toString() + "..."}
        size="large"
        name="introduction"
        rows={3}
        bordered={false}
        className="has-background-color w-50"
        value={introduction}
        onChange={(e) => setBasicInfo(e.target.name, e.target.value)}
      />
    </div>
  );
};

const InitialPage: React.FC = () => {
  const { t } = useTranslation(["initial", "commons"]);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const currentUserId = useAppSelector(selectCurrentUserId);

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    firstName: "",
    lastName: "",
    nativeLanguage: "",
    targetLanguages: [] as string[],
    country: "",
    introduction: "",
  });

  const navigate = useNavigate();
  const outletContext: any = useOutletContext();

  const handleSubmit = async () => {
    if (currentUserId) {
      const data = {
        id: currentUserId,
        body: {
          nativeLanguage: {
            id: basicInfo.nativeLanguage,
            level: 4,
          },
          targetLanguages: basicInfo.targetLanguages.map((item) => ({
            id: item,
            level: 1,
          })),
          userInfo: {
            firstName: basicInfo.firstName,
            middleName: "",
            lastName: basicInfo.lastName,
            gender: null,
            labels: [],
            introduction: basicInfo.introduction,
            country: basicInfo.country,
            hobbies: [],
          },
        },
      };
      try {
        await updateProfile(data).unwrap();
        message.success("Update profile success");

        outletContext.credentialsProfile.refetch();
        navigate("/community");
      } catch (err) {
        message.error(
          "Sorry, something went wrong. Please refresh the page and try again."
        );
      }
    }
  };

  const setBasicInfoValue = (key: string, value: any) => {
    setBasicInfo({ ...basicInfo, [key]: value });
  };

  const steps = [
    {
      title: t("Basic information"),
      content: (
        <BasicInformationForm
          setBasicInfo={setBasicInfoValue}
          basicInfo={basicInfo}
        />
      ),
    },
    {
      title: t("Setup languages"),
      content: (
        <SetupLanguagesForm
          setBasicInfo={setBasicInfoValue}
          basicInfo={basicInfo}
        />
      ),
    },
    {
      title: t("More information"),
      content: (
        <MoreInformation
          setBasicInfo={setBasicInfoValue}
          basicInfo={basicInfo}
        />
      ),
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

  const canNext = (current: number) => {
    switch (current) {
      case 0:
        return basicInfo.firstName && basicInfo.lastName;
      case 1:
        return basicInfo.nativeLanguage && basicInfo.targetLanguages.length > 0;
      default:
        return true;
    }
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

  return (
    <Spin tip="Just a moment" size="large" spinning={isLoading}>
      <div
        style={{
          maxHeight: "100vh",
          backgroundImage: `url(${AuthenBackgroundImage})`,
        }}
        className="pt-5"
      >
        <LocaleSelect className="float-right me-5" />
        <div className="container-lg py-5">
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
              <Button
                type="primary"
                onClick={() => next()}
                disabled={!canNext(current)}
              >
                {t("Next", { ns: "commons" })}
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={handleSubmit}>
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
    </Spin>
  );
};

export default InitialPage;
