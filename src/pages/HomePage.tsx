import React from "react";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>
          <Container>
            <h5>Add channel or post to forum</h5>
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default HomePage;
