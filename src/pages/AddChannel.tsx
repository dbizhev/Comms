import React, { useState } from "react";
import { Button } from "../components/button";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { getAuth } from "firebase/auth";

const AddChannel: React.FunctionComponent<IPageProps> = (props) => {
  const [channelName, setChannelName] = useState("");
  const auth = getAuth();

  const saveChannel = async (e: any) => {
    e.preventDefault();
    var uniqId = "id" + new Date().getTime();
    let channel = {
      chName: channelName,
      chId: uniqId,
      time: new Date(),
      email: auth.currentUser?.email || "",
      author: auth.currentUser?.displayName,
    };
    await addDoc(collection(db, "channels"), channel);
    setChannelName("");
    (window as any).alert("Channel created");
    setTimeout((window as any).location.reload(), 3000);
  };

  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>
          <Container>
            <h3>Add channel </h3>
            <div>
              <input
                style={{
                  paddingLeft: 20,
                  fontSize: 15,
                  height: 40,
                  width: 270,
                }}
                onChange={(e) => setChannelName(e.target.value)}
                type="text"
                placeholder="Channel name..."
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Button
                style={{
                  backgroundColor: "#05473C",
                  color: "white",
                }}
                onClick={saveChannel}
              >
                Create
              </Button>
            </div>
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default AddChannel;
