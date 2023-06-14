import { message } from "antd";
import { SetStateAction, useEffect, useState } from "react";
import { selectCredentials } from "../../features/auth/authSlice";
import {
  Post,
  useInteractPostMutation,
  useLazyGetNumOfInteractQuery,
  useUpdateModePostMutation,
} from "../../services/post/postService";
import { useAppSelector } from "../hooks";

type Actions =
  | "updateVisible"
  | "updateSharing"
  | "updateCorrection"
  | "delete";
type UsePostReturn = [
  Post,
  React.Dispatch<SetStateAction<Post>>,
  {
    handleHeart: (e: React.MouseEvent) => Promise<void>;
    handlePostActions: (actions: Actions) => Promise<void>;
    isLoading: boolean;
    isOwner: boolean;
  }
];
const usePost = (postData: Post): UsePostReturn => {
  const [post, setPost] = useState<Post>(postData);
  const [interactPost, { isLoading: isInteractingPost }] =
    useInteractPostMutation();
  const [getNumOfInteract, { isLoading: isGettingNumOfInteract }] =
    useLazyGetNumOfInteractQuery();
  const [updateModePost, { isLoading: isUpdatingModePost }] =
    useUpdateModePostMutation();
  const credentials = useAppSelector(selectCredentials);

  useEffect(() => {
    setPost(postData);
  }, [postData]);

  const handleHeart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // TODO: improve this by updating before call api
    try {
      if (!credentials.userId) return;
      let mode = 0;
      if (post.isUserInteracted) mode = 1;

      await interactPost({
        userId: credentials.userId,
        postId: post.postId,
        mode: mode as 0 | 1,
      }).unwrap();

      const numOfInteract = await getNumOfInteract(post.postId).unwrap();
      setPost((prev) => ({
        ...prev,
        numOfInteract,
        isUserInteracted: !post.isUserInteracted,
      }));
    } catch (error) {
      message.error("Error when interacting post");
    }
  };

  const handleUpdateModePost = async (mode: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
    if (!credentials.userId) return;

    try {
      await updateModePost({
        userId: credentials.userId,
        postId: post.postId,
        mode: mode,
      }).unwrap();
      message.success("Successfull!");
    } catch (error) {
      message.error("Oops, something went wrong");
      throw error;
    }
  };

  const handlePostActions = async (actions: Actions) => {
    switch (actions) {
      case "updateVisible":
        await handleUpdateModePost(post.isPublic ? 1 : 0);
        setPost((prev) => ({ ...prev, isPublic: !post.isPublic }));
        break;
      case "updateCorrection":
        await handleUpdateModePost(post.isTurnOffCorrection ? 7 : 5);
        setPost((prev) => ({
          ...prev,
          isTurnOffCorrection: !post.isTurnOffCorrection,
        }));
        break;
      case "updateSharing":
        await handleUpdateModePost(post.isTurnOffShare ? 6 : 4);
        setPost((prev) => ({
          ...prev,
          isTurnOffShare: !post.isTurnOffShare,
        }));
        break;
      case "delete":
        await handleUpdateModePost(2);
        break;
    }
  };

  const isLoading =
    isInteractingPost || isGettingNumOfInteract || isUpdatingModePost;
  const isOwner = credentials.userId === post.userId;

  return [
    post,
    setPost,
    { handleHeart, handlePostActions, isLoading, isOwner },
  ];
};

export default usePost;
