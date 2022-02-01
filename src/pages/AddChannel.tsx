import React, { useState } from "react";
import { Button } from "../components/button";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const AddChannel: React.FunctionComponent<IPageProps> = (props) => {
  const [channelName, setChannelName] = useState("");

  const saveChannel = async (e: any) => {
    e.preventDefault();
    var uniqId = "id" + new Date().getTime();
    let channel = {
      chName: channelName,
      chId: uniqId,
      time: new Date(),
    };
    const docRef = await addDoc(collection(db, "channels"), channel);
    setChannelName("");
    setTimeout((window as any).location.reload(), 3000);
  };

  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>
          <Container>
            <h3>Add channel </h3>
            <input
              style={{
                paddingLeft: 20,
                fontSize: 15,
                height: 40,
                width: 170,
                borderRadius: 8,
              }}
              onChange={(e) => setChannelName(e.target.value)}
              type="text"
              placeholder="Channel name..."
            />
            <div style={{ marginTop: 20 }}>
              <Button onClick={saveChannel}>Create</Button>
            </div>
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default AddChannel;
