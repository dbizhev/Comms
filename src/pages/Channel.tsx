import React, { useState } from "react";
import { Button } from "../components/button";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";

import { useParams } from "react-router-dom";

const Channel: React.FunctionComponent<IPageProps> = (props) => {
  const { channel_id } = useParams<{ channel_id: string }>();
  const { name } = useParams<{ name: string }>();

  console.log(channel_id);
  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>
          <Container>
            <h1>{name} </h1>
            <p>Posts</p>
            <h5>Replies</h5>
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default Channel;
