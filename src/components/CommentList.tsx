import { List } from "antd";
import { useState } from "react";
import CommentItem from "./CommentItem";
import UpdateCommentModal from "./UpdateCommentModal";
import { Comment } from "../services/comment/commentService";

interface CommentListProps {
  commentList?: Comment[];
  ownerPostId?: string;
  refetch: () => void;
  deleteCommentInList: (id: string) => void;
  setInteractCommentInList: (
    id: string,
    isLiked: boolean,
    numOfInteract: number
  ) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  commentList,
  ownerPostId,
  refetch,
  deleteCommentInList,
  setInteractCommentInList,
}) => {
  const [editComment, setEditComment] = useState<Comment | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const openEditModal = () => setOpen(true);
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={commentList || []}
        split={false}
        renderItem={(item) => (
          <List.Item key={item.commentId}>
            <CommentItem
              {...item}
              ownerPostId={ownerPostId}
              openEditModal={openEditModal}
              setEditComment={setEditComment}
              deleteCommentInList={deleteCommentInList}
              setInteractCommentInList={setInteractCommentInList}
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
