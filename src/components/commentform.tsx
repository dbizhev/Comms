import React, { useState } from "react";
import PropTypes from "prop-types";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";

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
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="name..."
        style={{ marginBottom: 40 }}
      />
      <textarea
        style={{ marginBottom: 20 }}
        id="comment"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        name="comment"
        placeholder="Comment..."
      ></textarea>
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
