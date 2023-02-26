import { List } from "antd";
import Comment from "../types/Comment";
import { fakeComments } from "../utils/fakeData/fakeComment";
import CommentItem from "./CommentItem";

const items: Comment[] = fakeComments(15);

interface CommentListProps {
  commentList?: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ commentList }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={commentList || items}
      split={false}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <CommentItem {...item} />
        </List.Item>
      )}
    />
  );
};

export default CommentList;
