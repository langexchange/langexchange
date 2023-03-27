import { Button, Dropdown, DropDownProps, MenuProps } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
  FileDoneOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface PostCardMoreActionsProps extends DropDownProps {
  isOwner: boolean;
  isPublic: boolean;
  isTurnOffShare: boolean;
  isTurnOffCorrection: boolean;
  handleMenuClick: MenuProps["onClick"];
}

const PostCardMoreActions: React.FC<PostCardMoreActionsProps> = ({
  isOwner,
  isPublic,
  isTurnOffShare,
  isTurnOffCorrection,
  handleMenuClick,
  ...rest
}) => {
  const [t] = useTranslation(["commons"]);
  const items: MenuProps["items"] = [
    {
      label: <span>Copy link of this post</span>,
      key: "2",
      icon: <LinkOutlined />,
    },
    {
      label: <span>{t("Edit this post")}</span>,
      key: "0",
      disabled: !isOwner,
      icon: <EditOutlined />,
    },
    // {
    //   label: <span>{t("Collect this post")}</span>,
    //   key: "1",
    //   disabled: isTurnOffShare,
    // },
    {
      label: <span>{isPublic ? "Set post private" : "Set post public"}</span>,
      key: "3",
      disabled: !isOwner,
      icon: isPublic ? <LockOutlined /> : <UnlockOutlined />,
    },
    {
      label: (
        <span>
          {isTurnOffCorrection ? "Turn on correction" : "Turn off correction"}
        </span>
      ),
      key: "4",
      disabled: !isOwner,
      icon: <FileDoneOutlined />,
    },
    {
      label: <span>{isTurnOffShare ? "Allow share" : "Disable share"}</span>,
      key: "5",
      disabled: !isOwner,
      icon: <ShareAltOutlined />,
    },
    {
      label: <span>Delete this post</span>,
      key: "6",
      disabled: !isOwner,
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];
  const menuDropdown = {
    items: items,
    onClick: handleMenuClick,
  };
  return (
    <Dropdown menu={menuDropdown} trigger={["click"]} {...rest}>
      <Button
        type="text"
        icon={<MoreOutlined rotate={90} />}
        className="btn-text-warning width-full"
        block
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    </Dropdown>
  );
};

export default PostCardMoreActions;
