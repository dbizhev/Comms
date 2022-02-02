import { styled } from "@stitches/react";
import React, { useState } from "react";
import { Button } from "./button";
import CommentForm from "./commentform";

const CommentContainer = styled("div", {
  backgroundColor: "$white",
  boxShadow: "3px 3px 3px 3px $vibrantGreen",
  border: "$darkGreen 1px solid",
  width: "1400px",
  borderRadius: "8px",
  marginLeft: "20px",
});

const CommentAuthor = styled("div", {
  marginRight: "1200px",
});
const Italicized = styled("div", {
  fontStyle: "italic",
  marginTop: "10px",
  fontSize: "12px",
});

const SingleComment = ({ comment }: any) => (
  <CommentContainer>
    <CommentAuthor>
      <Italicized>
        {comment.name} <span>commented</span>
      </Italicized>
    </CommentAuthor>
    <p>{comment.comment}</p>
  </CommentContainer>
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
              <Button
                onClick={() => setShowReplyBox(false)}
                style={{
                  marginTop: 20,
                  marginRight: 45,
                  marginBottom: 20,
                }}
              >
                Cancel
              </Button>
              <CommentForm />
            </div>
          ) : (
            <Button
              onClick={() => setShowReplyBox(true)}
              style={{
                marginTop: 20,
                marginRight: 45,
                marginBottom: 20,
              }}
            >
              Reply
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Comment;
