import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";
import { Button } from "./button";

const CommentForm = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const { post_id } = useParams<{ post_id: string }>();

  const handleCommentSubmission = async (e: any) => {
    e.preventDefault();
    var uniqId = "id" + new Date().getTime();
    let comment = {
      cId: uniqId,
      comment: content,
      pId: post_id,
      time: new Date(),
      name: name,
    };
    await addDoc(collection(db, "comments"), comment);
    setName("");
    setContent("");
    (window as any).alert("Comment posted");
    setTimeout((window as any).location.reload(), 3000);
  };

  return (
    <form onSubmit={(e) => handleCommentSubmission(e)}>
      <div>
        <input
          onChange={(e) => setName(e.target.value)}
          style={{
            fontSize: 15,
            height: 40,
            width: 170,
            borderRadius: 8,
            marginLeft: 20,
          }}
          type="text"
          id="name"
          name="name"
          placeholder="Name"
        />
      </div>
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
          marginRight: 45,
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
