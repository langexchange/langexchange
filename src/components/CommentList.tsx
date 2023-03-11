import { List } from "antd";
import { useState } from "react";
import { Comment } from "../services/comment/commentService";
import CommentItem from "./CommentItem";
import UpdateCommentModal from "./UpdateCommentModal";

const items = [] as Comment[];

interface CommentListProps {
  commentList?: Comment[];
  ownerPostId?: string;
  refetch: () => void;
  deleteCommentInList: (id: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  commentList,
  ownerPostId,
  refetch,
  deleteCommentInList,
}) => {
  const [editComment, setEditComment] = useState<Comment | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const openEditModal = () => {
    setOpen(true);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={commentList || items}
        split={false}
        renderItem={(item, index) => (
          <List.Item key={item.commentId}>
            <CommentItem
              {...item}
              ownerPostId={ownerPostId}
              openEditModal={openEditModal}
              setEditComment={setEditComment}
              deleteCommentInList={deleteCommentInList}
            />
          </List.Item>
        )}
      />
      <UpdateCommentModal
        editComment={editComment}
        refetch={refetch}
        setEditComment={setEditComment}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default CommentList;
