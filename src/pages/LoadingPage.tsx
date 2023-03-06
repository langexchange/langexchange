import { Spin, SpinProps } from "antd";

const LoadingPage: React.FC<SpinProps> = (props) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
      className="d-flex has-background-color align-items-center justify-content-center"
    >
      <Spin {...props} />
    </div>
  );
};

export default LoadingPage;
