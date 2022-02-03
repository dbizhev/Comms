import { styled } from "@stitches/react";
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";
import { query, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";

const NotificationCard = styled("div", {
  display: "flex",
  flexDirection: "row",
  marginLeft: "405px",
  width: "584px",
  marginBottom: "10px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
});

const Time = styled("div", {
  fontSize: "13px",
  marginTop: "15px",
  fontStyle: "italic",
  marginLeft: "15px",
  width: "100%",
});
const Name = styled("div", {
  fontSize: "$2",
  marginTop: "15px",
  marginLeft: "15px",
  fontWeight: "bold",
  textTransform: "uppercase",
  width: "100%",
});
const Post = styled("div", {
  width: "100%",
  marginLeft: "15px",
  marginTop: "15px",
});

const PostChannel = styled("div", {
  fontSize: "14px",
  marginLeft: "15px",
  fontWeight: "bold",
  textTransform: "uppercase",
  width: "100%",
});

const PostTitle = styled("div", {
  fontSize: "11px",
  marginLeft: "15px",
  width: "100%",
  overflow: "clip",
  "&:hover": {
    color: "$black",
    fontWeight: "bold",
  },
});
const Avatar = styled("img", {
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  background: "Gray",
  marginBottom: "10px",
});

const InboxPage: React.FunctionComponent<IPageProps> = (props) => {
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
        <Sidebar />
        <PageContainer>
          <Container>
            <h1>Inbox</h1>

            {postList.length === 0 && <h5>Inbox Empty</h5>}
            {postList.length > 0 &&
              postList.map((post: any) => {
                return (
                  <NotificationCard>
                    <Avatar alt="" src={post.photoAuthor || ""} />
                    <Name>{post.author}</Name>
                    <Time>on {post.time.toDate().toDateString()}</Time>
                    <Post>
                      <PostChannel>{post.channel}</PostChannel>
                      <PostTitle>
                        <Link
                          to={`/channel/${post.chId}/${post.pId}/${post.title}/comments`}
                        >
                          {post.title}
                        </Link>
                      </PostTitle>
                    </Post>
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
