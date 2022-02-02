import React, { useState, useCallback, useEffect } from "react";
import { query, getDocs, collection } from "firebase/firestore";
import { styled } from "@stitches/react";
import { db } from "../config/firebase";
import CommentForm from "./commentform";
import Comment from "./comment";

const CommentList = styled("div", {
  marginBottom: "20px",
});

interface IComments {
  comments?: any[];
  id?: any;
}

const Comments = ({ comments, id }: IComments) => {
  const [commentsList, setCommentsList] = useState<any>([]);

  const fetchComments = useCallback(async () => {
    const q = query(collection(db, "comments"));
    const docs = await getDocs(q);
    let allComments: Array<any> = [];
    docs.forEach((item) => {
      const data = item.data();
      allComments.push(data);
    });
    console.log(allComments, id);
    const postComments = allComments.filter((item, key) => {
      return item.pId === id;
    });
    setCommentsList(postComments);
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  console.log(commentsList);

  return (
    <div style={{ height: 50, overflowInline: "scroll" }}>
      <h2>Join the discussion</h2>
      <CommentForm />
      <CommentList>
        {commentsList.length > 0 &&
          commentsList.map((comment: any) => {
            let child;
            if (comment.id) {
              child = comments?.find((c) => comment.id === c.pId);
            }
            return (
              <Comment
                key={comment.id}
                child={child}
                comment={comment}
                id={id}
              />
            );
          })}
      </CommentList>
    </div>
  );
};
export default Comments;
