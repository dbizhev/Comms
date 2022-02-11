import { styled } from "@stitches/react";
import React, { useState } from "react";
import { Button } from "./button";
import CommentForm from "./commentform";

const NotificationCard = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "25%",
  borderRadius: "8px",
});

const CommentContainer = styled("div", {
  backgroundColor: "$white",
  boxShadow: "3px 3px 3px 3px $vibrantGreen",
  border: "$darkGreen 1px solid",
  width: "1400px",
  borderRadius: "8px",
  marginLeft: "20px",
});

const CommentAuthor = styled("div", {
  marginRight: "120px",
});

const Italicized = styled("div", {
  fontStyle: "italic",
  marginTop: "10px",
  fontSize: "12px",
});

const CommentText = styled("p", {
  wordWrap: "break-word",
});

const Avatar = styled("img", {
  height: "26px",
  width: "26px",
  borderRadius: "50%",
  background: "Gray",
  marginBottom: "10px",
  margin: "10px",
});

const SingleComment = ({ comment }: any) => (
  <CommentContainer>
    <NotificationCard>
      <Avatar
        style={{ marginBottom: "10px", margin: "10px" }}
        alt=""
        src={comment.photoAuthor || ""}
      />
      <CommentAuthor>
        <Italicized>
          {comment.name} commented on{" "}
          {comment.time.toDate().toString().substring(0, 25)}
        </Italicized>
      </CommentAuthor>
    </NotificationCard>

    <CommentText>{comment.comment}</CommentText>
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
                marginBottom: 20,
                backgroundColor: "#05473C",
                color: "white",
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
