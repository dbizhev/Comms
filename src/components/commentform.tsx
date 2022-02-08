import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";
import { Button } from "./button";
import { getAuth } from "firebase/auth";

const CommentForm = () => {
  const auth = getAuth();
  const [content, setContent] = useState("");
  const { post_id } = useParams<{ post_id: string }>();
  const { post_name } = useParams<{ post_name: string }>();
  const { channel_id } = useParams<{ channel_id: string }>();

  const handleCommentSubmission = async (e: any) => {
    e.preventDefault();
    let post = {
      chId: channel_id,
      pId: post_id,
      time: new Date(),
      title: post_name,
      comment: content,
      body: "",
      author: auth.currentUser?.displayName,
      photoAuthor: auth.currentUser?.photoURL,
      channel: post_name,
      AuthorId: auth.currentUser?.providerData[0].uid,
      read: false,
    };
    var uniqId = "id" + new Date().getTime();
    let comment = {
      cId: uniqId,
      comment: content,
      pId: post_id,
      time: new Date(),
      name: auth.currentUser?.displayName,
    };
    await addDoc(collection(db, "posts"), post);
    await addDoc(collection(db, "comments"), comment);
    setContent("");
    (window as any).alert("Comment posted");
    setTimeout((window as any).location.reload(), 3000);
  };

  return (
    <form onSubmit={(e) => handleCommentSubmission(e)}>
      <div
        style={{
          fontSize: 15,
          paddingTop: 20,
          borderRadius: 8,
        }}
      >
        <textarea
          onChange={(e) => setContent(e.target.value)}
          style={{
            marginLeft: 20,
            borderRadius: 8,
            fontSize: 15,
            paddingTop: 20,
            width: 1000,
          }}
          id="comment"
          name="comment"
          placeholder="Type comment and hit send"
          rows={6}
        />
      </div>
      <Button
        style={{
          marginTop: 20,
          marginBottom: 20,
          backgroundColor: "#05473C",
          color: "white",
        }}
        type="submit"
      >
        Send
      </Button>
    </form>
  );
};

export default CommentForm;
