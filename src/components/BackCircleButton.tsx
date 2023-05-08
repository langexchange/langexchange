import { Button, ButtonProps } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackCircleButton: React.FC<ButtonProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Button
      shape="circle"
      type="text"
      icon={<ArrowLeftOutlined />}
      onClick={() => navigate(-1)}
      {...props}
    />
  );
};

export default BackCircleButton;
