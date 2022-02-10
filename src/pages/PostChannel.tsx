import React, { useCallback, useEffect, useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { Button } from "../components/button";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";

import { useParams } from "react-router-dom";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { getAuth } from "firebase/auth";

const PostChannel: React.FunctionComponent<IPageProps> = (props) => {
  const auth = getAuth();
  const { channel_id } = useParams<{ channel_id: string }>();
  const { name } = useParams<{ name: string }>();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
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

  const savePost = async (e: any) => {
    e.preventDefault();

    var patternReply = /\B@[@a-z0-9_-]+/gi;
    console.log(body.match(patternReply));
    var uniqId = "id" + new Date().getTime();
    let post = {
      chId: channel_id,
      pId: uniqId,
      time: new Date(),
      title: subject,
      body: body,
      comment: "",
      author: auth.currentUser?.displayName,
      photoAuthor: auth.currentUser?.photoURL,
      channel: name,
      AuthorId: auth.currentUser?.providerData[0].uid,
      read: false,
      mentions: body.match(patternReply) || null,
    };
    console.log(post);
    await addDoc(collection(db, "posts"), post);
    setSubject("");
    setBody("");
    (window as any).alert("Content posted");
    setTimeout((window as any).location.reload(), 3000);
  };

  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>
          <h1>{name} </h1>
          <div>
            <p>Post on {name}... </p>
            <div
              style={{
                marginTop: 20,
              }}
            >
              <input
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  fontSize: 15,
                  height: 40,
                  width: 170,
                  borderRadius: 8,
                  marginLeft: 20,
                }}
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
              />
            </div>
            <div
              style={{
                fontSize: 15,
                paddingTop: 20,
                borderRadius: 8,
              }}
            >
              <MentionsInput
                style={{
                  marginLeft: 20,
                  borderRadius: 8,
                  fontSize: 15,
                  paddingTop: 20,
                  width: "90%",
                  height: "100px",
                }}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              >
                <Mention trigger="@" data={userList} markup="@__display__" />
              </MentionsInput>
            </div>
            <Button
              onClick={savePost}
              style={{
                marginTop: 20,
                marginRight: 25,
                backgroundColor: "#05473C",
                color: "white",
              }}
            >
              Post
            </Button>
          </div>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default PostChannel;
