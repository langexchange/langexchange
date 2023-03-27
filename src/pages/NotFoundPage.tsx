import { Button, Result, ResultProps } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC<ResultProps> = (props) => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
      {...props}
    />
  );
};

export default NotFoundPage;
