import { styled } from "@stitches/react";
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";
import { query, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useHistory } from "react-router-dom";

const NotificationCard = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "584px",
  marginBottom: "10px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
});

const InboxItem = styled("button", {
  border: "none",
  fontSize: "18px",
  color: "$black",
  background: "$white",
  width: "100%",
  marginTop: "15px",

  "&:hover": {
    backgroundColor: "$white",
    color: "$black",
    fontWeight: "bold",
  },
});

const Info = styled("div", {
  fontSize: "$2",
  marginTop: "15px",
});

const InboxPage: React.FunctionComponent<IPageProps> = (props) => {
  const history = useHistory();
  const [postList, setPostList] = useState<any>([]);

  const fetchPosts = useCallback(async () => {
    const q = query(collection(db, "posts"));
    const docs = await getDocs(q);
    let allPosts: Array<any> = [];
    docs.forEach((item: any) => {
      const data = item.data();
      allPosts.push(data);
    });

    setPostList(allPosts);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <Container>
      <Content>
        <Sidebar inbox={postList.length} />
        <PageContainer>
          <Container>
            <h1>Inbox</h1>

            {postList.length === 0 && <h5>Inbox Empty</h5>}
            {postList.length > 0 &&
              postList.map((post: any) => {
                return (
                  <NotificationCard>
                    <InboxItem
                      onClick={() =>
                        history.push(
                          `/channel/${post.chId}/${post.pId}/${post.title}/comments`
                        )
                      }
                      key={post.pId}
                    >
                      Mark as read
                    </InboxItem>
                    <Info>
                      {post.author} posted {post.title}
                    </Info>
                  </NotificationCard>
                );
              })}
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default InboxPage;
