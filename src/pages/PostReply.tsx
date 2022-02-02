import React from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/comments";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";

const PostReply = () => {
  const { post_id } = useParams<{ post_id: string }>();
  const { post_name } = useParams<{ post_name: string }>();
  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>
          <Container>
            <div>
              <h1>{post_name}</h1>
              <Comments id={post_id} />
            </div>
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default PostReply;
