import {
  Avatar,
  Button,
  Card,
  List,
  message,
  Popover,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  useGetFriendSuggestionsQuery,
  useSendFriendRequestMutation,
} from "../services/friend/friendService";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import {
  UserAddOutlined,
  TranslationOutlined,
  TagOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const defaultFilters = {
  nativeLangs: [],
  targetLangs: [],
  countryCodes: [],
};

const SuggestFriendSide: React.FC = () => {
  const defaultDeletedSuggestFriendIds = localStorage.getItem(
    "deletedSuggestFriendIds"
  )
    ? JSON.parse(localStorage.getItem("deletedSuggestFriendIds") || "")
    : [];
  const { data: suggestFriends, isLoading } = useGetFriendSuggestionsQuery(
    defaultFilters,
    {}
  );
  const [t] = useTranslation(["commons", "countries"]);
  const [friendList, setFriendList] = useState<any[]>([]);
  const [sendFriendRequest, { isLoading: isSending }] =
    useSendFriendRequestMutation();
  const [deletedSuggestFriendIds, setDeletedSuggestFriendIds] = useState<
    string[]
  >(defaultDeletedSuggestFriendIds);

  useEffect(() => {
    localStorage.setItem(
      "deletedSuggestFriendIds",
      JSON.stringify(deletedSuggestFriendIds)
    );
    setFriendList((prev) => {
      return prev.filter((item) => !deletedSuggestFriendIds.includes(item.id));
    });
  }, [deletedSuggestFriendIds]);

  useEffect(() => {
    if (!suggestFriends) return;
    setFriendList(
      suggestFriends.filter(
        (item) => !deletedSuggestFriendIds.includes(item.id || "")
      )
    );
  }, [suggestFriends]);

  const handleDeleteSuggestFriend = (e: any, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDeletedSuggestFriendIds([...deletedSuggestFriendIds, id]);
  };

  const handleSendFriendRequest = async (e: any, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!id) return;
    try {
      await sendFriendRequest(id).unwrap();
      message.success({
        content: "Send request successful!",
      });
      setDeletedSuggestFriendIds([...deletedSuggestFriendIds, id]);
    } catch (error) {
      message.error({
        content: "Oops! Something went wrong.",
      });
    }
  };

  const popoverContent = (item: any) => {
    return (
      <Space direction="vertical" className="px-2" align="start">
        <Space>
          <Avatar src={item.avatar} size="large" />
          <div>
            <Link to={`/profile/${item.id}`}>
              <Typography.Title level={4} className="m-0 hover-underline">
                {[item.firstName, item.lastName].join(" ")}
              </Typography.Title>
            </Link>
            <Space
              align="center"
              className="has-background-color rounded-4 px-2"
            >
              <span style={{ color: "black" }}>
                {item?.country && getUnicodeFlagIcon(item.country)}
              </span>
              <Typography.Text>
                {t(item.country, { ns: "countries" })}
              </Typography.Text>
            </Space>
          </div>
        </Space>
        <Space size={4} wrap className="w-100 text-left">
          <span className="me-2 text-500 secondary-color">{t("Native")}</span>
          {[item.nativeLanguage].map((lang, index) => (
            <Tag
              color="green"
              key={lang.id || index}
              icon={<TranslationOutlined />}
              className="m-0"
            >
              {item.name || "Vietnamese"}
            </Tag>
          ))}
        </Space>
        <Space size={4} wrap className="w-100 text-left">
          <span className="me-2 text-500 secondary-color">{t("Target")}</span>
          {item.targetLanguages.map((lang: any, index: number) => (
            <Tag
              color="blue"
              key={lang.id || index}
              icon={<TagOutlined />}
              className="m-0"
            >
              {lang.name || "English"}
            </Tag>
          ))}
        </Space>
      </Space>
    );
  };

  return (
    <Card
      size="small"
      title={<span className="fz-16 text-500">{t("You may know")}</span>}
      bordered={false}
      headStyle={{ border: "none" }}
      style={{ background: "#00000005" }}
    >
      <List
        className="demo-loadmore-list"
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={friendList.slice(0, 6)}
        renderItem={(item) => (
          <Popover
            content={popoverContent(item)}
            arrow={false}
            mouseEnterDelay={0.5}
            placement="bottom"
          >
            <List.Item
              extra={
                <Space size={4}>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<UserAddOutlined />}
                    type="link"
                    onClick={(e) => handleSendFriendRequest(e, item.id || "")}
                    loading={isSending}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    type="text"
                    className="secondary-color"
                    onClick={(e) => handleDeleteSuggestFriend(e, item.id || "")}
                  />
                </Space>
              }
              className="border-0 hover-as-text-button px-2"
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  <Link to={`/profile/${item.id}`}>
                    {[item.firstName, item.lastName].join(" ")}
                  </Link>
                }
                description={
                  <Space
                    align="center"
                    className="has-background-color rounded-4 px-2"
                  >
                    <span style={{ color: "black" }}>
                      {item?.country && getUnicodeFlagIcon(item.country)}
                    </span>
                    <Typography.Text>
                      {t(item.country, { ns: "countries" })}
                    </Typography.Text>
                  </Space>
                }
              />
            </List.Item>
          </Popover>
        )}
      />
    </Card>
  );
};

export default SuggestFriendSide;
