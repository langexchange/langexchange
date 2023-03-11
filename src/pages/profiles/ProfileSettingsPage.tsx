import {
  Button,
  Col,
  Form,
  Input,
  message,
  Radio,
  Rate,
  Row,
  Skeleton,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SeclectLanguageInput from "../../components/SeclectLanguageInput";
import TagsInput from "../../components/TagsInput";
import {
  selectCredentials,
  selectCurrentUserId,
} from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  MinusCircleOutlined,
  PlusOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import {
  GetProfileResponse,
  Language,
  useGetProfileQuery,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "../../services/profile/profileServices";
import {
  selectCredentalProfile,
  setCredentialProfile,
} from "../../features/profile/profileSlice";
import { useTranslation } from "react-i18next";
import CountrySelectInput from "../../components/CountrySelectInput";
import UploadImage from "../../components/UploadImage";
import { useUploadFileMutation } from "../../services/upload/uploadService";
import { RcFile } from "antd/lib/upload/interface";

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  nativeLanguage: {
    id: "",
    level: 0,
  },
  targetLanguages: [] as Language[],
  introduction: "",
  country: "",
  hobbies: [],
  avatar: "",
  gender: "",
  numOfPosts: 0,
  numOfPartners: 0,
};

const onFinishFailed = (errorInfo: any) => { };

const ProfileSettingsPage = () => {
  const currentUserId = useAppSelector(selectCurrentUserId);
  let { id: userId } = useParams();
  const currentUserProfile = useAppSelector(selectCredentalProfile);
  const [profile, setProfile] = useState<GetProfileResponse>(initialValues);
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
      if (currentUserProfile.avatar)
        setFileList([
          {
            uid: "langexchange",
            name: "Avatar",
            status: "done",
            url: currentUserProfile.avatar,
            thumbUrl: currentUserProfile.avatar,
          },
        ]);
      setIsLoaded(true);
    }
  }, [currentUserProfile]);
  const credentials = useAppSelector(selectCredentials);
  const [uploadFiles, { isLoading: isLoadingUpload }] = useUploadFileMutation();

  const handleUploadAvatar = async () => {
    if (!credentials?.incId) return;

    if (fileList.length > 0) {
      const formData = new FormData();
      fileList.forEach((file) => {
        if (file.status === "done") return;
        formData.append("files[]", file as RcFile);
      });

      if (!formData || formData.getAll("files[]").length === 0) return;

      try {
        const result = await uploadFiles({
          type: "image",
          userId: credentials.incId,
          body: formData,
        }).unwrap();
        return result[0].url;
      } catch (error) {
        message.error("Upload image failed");
      }
    }
    return;
  };
  const [updateAvatar, { isLoading: isLoadingUpdateAvatar }] =
    useUpdateAvatarMutation();

  const handleSubmit = async (values: any) => {
    if (currentUserId) {
      try {
        const uploadedUrl = await handleUploadAvatar();
        if (uploadedUrl)
          await updateAvatar({
            id: currentUserId,
            avatar: uploadedUrl,
          }).unwrap();

        const data = {
          id: currentUserId,
          body: {
            nativeLanguage: values.nativeLanguage,
            targetLanguages: values.targetLanguages,
            userInfo: {
              firstName: profile.firstName,
              middleName: profile.middleName,
              lastName: profile.lastName,
              gender: profile.gender,
              introduction: profile.introduction,
              country: profile.country,
              hobbies: profile.hobbies,
            },
          },
        };
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
    <Skeleton loading={!isLoaded || isLoadingProfile} active>
      <Typography.Title level={3}>{t("Profile setting")}</Typography.Title>
      <div className="px-3">
        <div className="text-center">
          <UploadImage
            listType="picture-circle"
            fileList={fileList}
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
            beforeUpload={(file) => {
              const isPNG = file.type.includes("image");
              if (!isPNG) {
                message.error(`${file.name} is not a image file`);
                return Upload.LIST_IGNORE;
              }
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                const newFile: UploadFile = file;
                newFile.url = reader.result?.toString() || undefined;
                setFileList((prev) => [...prev, newFile]);
              };
              return false;
            }}
            limit={1}
          >
            {fileList.length < 1 && "+ Upload"}
          </UploadImage>
        </div>
        <Form
          name="basic"
          style={{ width: "100%" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="pt-3"
          // labelCol={{ span: 8 }}
          layout="vertical"
        >
          <Row gutter={12}>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("Last name", { ns: "initial" })}
                rules={[{ required: true, message: "Missing last name" }]}
              >
                <Input
                  allowClear
                  name="lastName"
                  placeholder={t("Last name", { ns: "initial" }).toString()}
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfileValue(e.target.name, e.target.value)
                  }
                  status={profile.lastName.length === 0 ? "error" : undefined}
                />
              </Form.Item>
            </Col>
          </Row>

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

          <div className="ant-col ant-form-item-label css-dev-only-do-not-override-1me4733">
            <label title="Họ và tên đệm">{t("Target languages")}</label>
          </div>
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
                      // label={index === 0 ? t("Target languages") : ""}
                      // labelCol={{ span: 12 }}
                      // wrapperCol={{ span: 12, offset: index === 0 ? 0 : 12 }}
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
                // label={fields.length === 0 ? "Target languages" : ""}
                // wrapperCol={{ span: 16, offset: fields.length === 0 ? 0 : 8 }}
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

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="Gender">
                <Radio.Group
                  onChange={(e) => setProfileValue("gender", e.target.value)}
                  value={profile.gender}
                >
                  <Radio value="male">
                    <ManOutlined style={{ color: "#68a7ff" }} /> Male
                  </Radio>
                  <Radio value="female">
                    <WomanOutlined style={{ color: "#ff68c3" }} /> Female
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={t("Country", { ns: "initial" })}>
                <CountrySelectInput
                  placeholder={t("Your country", { ns: "initial" })}
                  value={profile.country}
                  onChange={(values: any) => setProfileValue("country", values)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label={t("Bio", { ns: "initial" })}>
            <Input.TextArea
              placeholder={t("Bio", { ns: "initial" }).toString()}
              name="introduction"
              value={profile.introduction}
              onChange={(e) => setProfileValue(e.target.name, e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Hobbies">
            <div className="d-flex">
              <TagsInput
                tags={profile.hobbies}
                setTags={(tags) => setProfileValue("hobbies", tags)}
                tagColor="green"
                placeholder="Add interest"
                borderStyle="solid"
              />
            </div>
          </Form.Item>

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading || isLoadingUpload || isLoadingUpdateAvatar}
              disabled={!profile.firstName || !profile.lastName}
            >
              {t("submit", { ns: "commons" })}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Skeleton>
  );
};

export default ProfileSettingsPage;
