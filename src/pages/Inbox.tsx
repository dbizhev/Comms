import React from "react";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";


const InboxPage: React.FunctionComponent<IPageProps> = (props) => {
  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>
          <Container>
            <h1>Inbox</h1>
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default InboxPage;
