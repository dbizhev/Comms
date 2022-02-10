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
    <div style={{ height: 500, overflowInline: "scroll" }}>
      <div style={{ marginLeft: 50 }}>
        <h5>Join the discussion</h5>
        <CommentForm />
      </div>
      <h5 style={{ marginTop: 50, marginLeft: 50 }}>
        {commentsList.length > 0 ? "Replies" : "No reply"}
      </h5>
      <CommentList>
        {commentsList.length > 0 &&
          commentsList.map((comment: any, index: any) => {
            let child;
            if (comment.id) {
              child = comments?.find((c) => comment.id === c.pId);
            }
            return (
              <Comment key={index} child={child} comment={comment} id={id} />
            );
          })}
      </CommentList>
    </div>
  );
};
export default Comments;
