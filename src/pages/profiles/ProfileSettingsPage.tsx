import {
  Button,
  Col,
  Form,
  Input,
  message,
  Rate,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SeclectLanguageInput from "../../components/SeclectLanguageInput";
import TagsInput from "../../components/TagsInput";
import { selectCurrentUserId } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  GetProfileResponse,
  Language,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../services/profile/profileServices";
import {
  selectCredentalProfile,
  setCredentialProfile,
} from "../../features/profile/profileSlice";
import { useTranslation } from "react-i18next";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const ProfileSettingsPage = () => {
  const currentUserId = useAppSelector(selectCurrentUserId);
  let { id: userId } = useParams();
  const currentUserProfile = useAppSelector(selectCredentalProfile);
  const [profile, setProfile] = useState<GetProfileResponse>({
    firstName: "",
    lastName: "",
    nativeLanguage: {
      id: "",
      level: 0,
    },
    targetLanguages: [] as Language[],
    introduction: "",
    // address: "",
    // interests: [],
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);
  const {
    data: fetchProfile,
    isFetching,
    isLoading: isLoadingProfile,
    isSuccess,
  } = useGetProfileQuery(userId, {
    refetchOnMountOrArgChange: true,
    skip: !isRefetch,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsRefetch(false);
      dispatch(setCredentialProfile(fetchProfile));
    }
  }, [fetchProfile, isFetching]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentUserProfile) {
      setProfile(currentUserProfile);
      setIsLoaded(true);
    }
  }, [currentUserProfile]);

  const handleSubmit = async (values: any) => {
    if (currentUserId) {
      const data = {
        id: currentUserId,
        body: {
          nativeLanguage: values.nativeLanguage,
          targetLanguages: values.targetLanguages,
          userInfo: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            gender: null,
            introduction: profile.introduction,
          },
        },
      };
      try {
        await updateProfile(data).unwrap();
        setIsRefetch(true);
        message.success("Update profile success");
      } catch (err) {
        message.error(
          "Sorry, something went wrong. Please refresh the page and try again."
        );
      }
    }
  };

  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  const setProfileValue = (key: string, value: any) => {
    setProfile({ ...profile, [key]: value });
  };

  const { t } = useTranslation(["settings", "commons", "initial"]);

  if (currentUserId) {
    const isCurrentUser = userId === currentUserId;
    if (!isCurrentUser) return <Navigate to={`/profile/${userId}`} />;
  }

  return (
    <Skeleton loading={!isLoaded || isLoadingProfile}>
      <Typography.Title level={3}>{t("Profile setting")}</Typography.Title>
      <Form
        name="basic"
        style={{ width: "100%" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="pt-3"
        labelCol={{ span: 8 }}
      >
        <Form.Item label={t("First name", { ns: "initial" })}>
          <Input
            allowClear
            placeholder={t("First name", { ns: "initial" }).toString()}
            name="firstName"
            status={profile.firstName.length === 0 ? "error" : undefined}
            value={profile.firstName}
            onChange={(e) => {
              setProfileValue(e.target.name, e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label={t("Last name", { ns: "initial" })}
          rules={[{ required: true, message: "Missing last name" }]}
        >
          <Input
            allowClear
            name="lastName"
            placeholder={t("Last name", { ns: "initial" }).toString()}
            value={profile.lastName}
            onChange={(e) => setProfileValue(e.target.name, e.target.value)}
            status={profile.lastName.length === 0 ? "error" : undefined}
          />
        </Form.Item>

        <Form.Item label={t("Native language")}>
          <Row gutter={[12, 0]}>
            <Col flex="auto">
              <Form.Item
                name={["nativeLanguage", "id"]}
                initialValue={profile.nativeLanguage.id || null}
                className="mb-0"
              >
                <SeclectLanguageInput placeholder={t("Native language")} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                initialValue={profile.nativeLanguage.level || 0}
                name={["nativeLanguage", "level"]}
                className="mb-0"
              >
                <Rate />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.List
          name="targetLanguages"
          initialValue={profile.targetLanguages.map((item: any) => ({
            id: item.id,
            level: item.level,
          }))}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Row key={key}>
                  <Col span={16}>
                    <Form.Item
                      initialValue={"english"}
                      {...restField}
                      name={[name, "id"]}
                      label={index === 0 ? t("Target languages") : ""}
                      labelCol={{ span: 12 }}
                      wrapperCol={{ span: 12, offset: index === 0 ? 0 : 12 }}
                    >
                      <SeclectLanguageInput
                        placeholder={t("Target Language")}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={7} className="text-center px-2">
                    <Form.Item
                      initialValue={0}
                      {...restField}
                      name={[name, "level"]}
                    >
                      <Rate />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <Button
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                      type="text"
                      shape="circle"
                      danger
                    />
                  </Col>
                </Row>
              ))}

              <Form.Item
                label={fields.length === 0 ? "Target languages" : ""}
                wrapperCol={{ span: 16, offset: fields.length === 0 ? 0 : 8 }}
              >
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {t("Add target language")}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* <Form.Item label="Address"> */}
        {/*   <Input */}
        {/*     placeholder="Address, country..." */}
        {/*     name="adress" */}
        {/*   // value={profile.address} */}
        {/*   // onChange={(e) => setProfileValue(e.target.name, e.target.value)} */}
        {/*   /> */}
        {/* </Form.Item> */}

        <Form.Item label={t("Bio", { ns: "initial" })}>
          <Input.TextArea
            placeholder={t("Bio", { ns: "initial" }).toString()}
            name="introduction"
            value={profile.introduction}
            onChange={(e) => setProfileValue(e.target.name, e.target.value)}
          />
        </Form.Item>

        {/* <Form.Item label="Interest"> */}
        {/*   <TagsInput */}
        {/*     tags={[]} */}
        {/*     // tags={profile.interests} */}
        {/*     setTags={(tags) => setProfileValue("interests", tags)} */}
        {/*     tagColor="green" */}
        {/*     placeholder="Add interest" */}
        {/*     borderStyle="solid" */}
        {/*     placeholderStyle={{ */}
        {/*       fontSize: "14px", */}
        {/*       fontWeight: 300, */}
        {/*       color: "#bfbfbf", */}
        {/*     }} */}
        {/*   /> */}
        {/* </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!profile.firstName || !profile.lastName}
          >
            {t("submit", { ns: "commons" })}
          </Button>
        </Form.Item>
      </Form>
    </Skeleton>
  );
};

export default ProfileSettingsPage;
