import React, { useCallback, useEffect, useState } from "react";
import { query, getDocs, collection } from "firebase/firestore";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";

import { useParams, useHistory } from "react-router-dom";
import { db } from "../config/firebase";
import { styled } from "@stitches/react";
import { Button } from "../components/button";

const PostCard = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "584px",
  marginBottom: "10px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
});
const Avatar = styled("div", {
  height: "36px",
  width: "36px",
  borderRadius: "50%",
  background: "Gray",
  marginBottom: "10px",
});

const Info = styled("div", {
  fontSize: "$2",
  marginTop: "15px",
});

const PostButton = styled("button", {
  border: "none",
  fontSize: "$2",
  //   padding: "$2 $3",
  color: "$black",
  background: "$white",
  width: "100%",
  marginBottom: "10px",

  "&:hover": {
    backgroundColor: "$white",
    color: "$black",
    fontWeight: "bold",
  },
});

const Channel: React.FunctionComponent<IPageProps> = (props) => {
  const history = useHistory();

  const { channel_id } = useParams<{ channel_id: string }>();
  const { name } = useParams<{ name: string }>();

  const [postList, setPostList] = useState<any>([]);

  const fetchPosts = useCallback(async () => {
    const q = query(collection(db, "posts"));
    const docs = await getDocs(q);
    let allPosts: Array<any> = [];
    docs.forEach((item: any) => {
      const data = item.data();
      allPosts.push(data);
    });
    const posts = allPosts.filter((item, key) => {
      return item.chId === channel_id;
    });
    setPostList(posts);
  }, [channel_id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>
          <Container>
            <h3>Channel {name} </h3>
            {postList.length > 0 &&
              postList.map((post: any) => {
                return (
                  <PostCard>
                    <Avatar>
                      <img alt="" />
                    </Avatar>
                    <PostButton
                      onClick={() =>
                        history.push(
                          `/channel/${channel_id}/${post.pId}/${post.title}/comments`
                        )
                      }
                      key={post.pId}
                    >
                      {post.author}
                    </PostButton>
                    <Info>{post.title}</Info>
                  </PostCard>
                );
              })}

            <Button
              style={{
                marginTop: 400,
                backgroundColor: "#05473C",
                color: "white",
              }}
              onClick={() =>
                history.push(`/channel/${channel_id}/${name}/post`)
              }
            >
              Create Post
            </Button>
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default Channel;
