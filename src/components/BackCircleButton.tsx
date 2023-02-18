import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const BackCircleButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      size="small"
      shape="circle"
      icon={<LeftOutlined />}
      onClick={() => navigate(-1)}
      className="color-secondary"
    />
  );
};

export default BackCircleButton;
