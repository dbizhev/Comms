import React, { useCallback, useEffect, useState } from "react";
import { query, getDocs, collection } from "firebase/firestore";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";

import { useParams, useHistory, Link } from "react-router-dom";
import { db } from "../config/firebase";
import { styled } from "@stitches/react";
import { Button } from "../components/button";
import {
  NotificationCard,
  Name,
  Time,
  Post,
  PostTitle,
  MarkAsRead,
  PostChannel,
} from "../components/listItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Avatar = styled("img", {
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  background: "Gray",
  marginBottom: "10px",
  margin: "10px",
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
          <h3> #{name} </h3>
          <Button
            style={{
              backgroundColor: "#05473C",
              color: "white",
              width: "200px",
              position: "relative",
            }}
            onClick={() => history.push(`/channel/${channel_id}/${name}/post`)}
          >
            <FontAwesomeIcon icon={faPlus} /> New Post in {name}
          </Button>
          <Container style={{ marginTop: 50, height: 500 }}>
            {postList.length === 0 && <h5>Create posts in {name}</h5>}
            {postList.length > 0 &&
              postList.map((post: any) => {
                return (
                  <NotificationCard>
                    <Avatar alt="" src={post.photoAuthor || ""} />
                    <Name>{post.author}</Name>
                    <Time>
                      {post.body === "" ? "replied " : "posted"} on{" "}
                      {post.time.toDate().toString().substring(0, 25)}
                    </Time>
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
                    <MarkAsRead
                      style={{ marginRight: "10px" }}
                      onClick={() =>
                        history.push(
                          `/channel/${post.chId}/${post.pId}/${post.title}/comments`
                        )
                      }
                    >
                      join discussion
                    </MarkAsRead>
                  </NotificationCard>
                );
              })}
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default Channel;
