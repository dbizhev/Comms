import React, { useState } from "react";
import CommentForm from "./commentform";

const SingleComment = ({ comment }: any) => (
  <div>
    <div>
      <div>
        <p>
          {comment.name} <span>commented</span>
        </p>
      </div>
    </div>
    <p>{comment.comment}</p>
  </div>
);

const Comment = ({ comment, child, id }: any) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  return (
    <>
      <SingleComment comment={comment} />
      {child && <SingleComment comment={child} />}
      {!child && (
        <div>
          {showReplyBox ? (
            <div>
              <button onClick={() => setShowReplyBox(false)}>
                Cancel Reply
              </button>
              <CommentForm />
            </div>
          ) : (
            <button onClick={() => setShowReplyBox(true)}>Reply</button>
          )}
        </div>
      )}
    </>
  );
};

export default Comment;
