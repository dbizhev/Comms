import React, { useState } from "react";
import { Button } from "../components/button";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";

import { useParams } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const PostChannel: React.FunctionComponent<IPageProps> = (props) => {
  const { channel_id } = useParams<{ channel_id: string }>();
  const { name } = useParams<{ name: string }>();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const savePost = async (e: any) => {
    e.preventDefault();
    var uniqId = "id" + new Date().getTime();
    let post = {
      chId: channel_id,
      pId: uniqId,
      time: new Date(),
      title: subject,
      body: body,
    };
    await addDoc(collection(db, "posts"), post);
    setSubject("");
    setBody("");
    (window as any).alert("Content posted");
    setTimeout((window as any).location.reload(), 3000);
  };

  console.log(channel_id);
  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>
          <Container>
            <h1>{name} </h1>
            <div>
              <p>Post on {name}... </p>
              <div
                style={{
                  marginTop: 50,
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
                <textarea
                  onChange={(e) => setBody(e.target.value)}
                  style={{
                    marginLeft: 20,
                    borderRadius: 8,
                    fontSize: 15,
                    paddingTop: 20,
                  }}
                  id="body"
                  name="body"
                  placeholder="Body"
                  rows={6}
                />
              </div>
              <Button onClick={savePost} style={{ marginTop: 20 }}>
                Submit
              </Button>
            </div>
            <h5>Replies</h5>
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default PostChannel;
