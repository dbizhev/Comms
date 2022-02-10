import React, { useCallback, useEffect, useState } from "react";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";
import { MentionsInput, Mention } from "react-mentions";
import { Button } from "./button";
import { getAuth } from "firebase/auth";
import defaultStyle from "./mentions/defaultStyle";

const CommentForm = () => {
  const auth = getAuth();
  const [content, setContent] = useState("");
  const { post_id } = useParams<{ post_id: string }>();
  const { post_name } = useParams<{ post_name: string }>();
  const { channel_id } = useParams<{ channel_id: string }>();

  const [userList, setUserList] = useState<any>([]);

  const fetchUsers = useCallback(async () => {
    const q = query(collection(db, "users"));
    const docs = await getDocs(q);
    let allUsers: Array<any> = [];
    docs.forEach((item: any) => {
      const data = item.data();
      allUsers.push(data);
    });

    const strippedUsers = allUsers.map(
      ({
        displayName,
        email,
        photoURL,
        providerId,
        userName,
        uid,
        ...rest
      }) => {
        return rest;
      }
    );

    setUserList(strippedUsers);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCommentSubmission = async (e: any) => {
    var pattern = /\B@[@a-z0-9_-]+/gi;
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
      mentions: content.match(pattern) || null,
    };
    var uniqId = "id" + new Date().getTime();
    let comment = {
      cId: uniqId,
      comment: content,
      pId: post_id,
      time: new Date(),
      name: auth.currentUser?.displayName,
      photoAuthor: auth.currentUser?.photoURL,
      AuthorId: auth.currentUser?.providerData[0].uid,
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
          width: "90%",
        }}
      >
        <MentionsInput
          style={defaultStyle}
          // style={{
          //   marginLeft: 20,
          //   borderRadius: 8,
          //   fontSize: 15,
          //   paddingTop: 20,
          //   width: "90%",
          //   height: "100px",
          // }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        >
          <Mention trigger="@" data={userList} markup="@__display__" />
        </MentionsInput>
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
