import React, { useCallback, useEffect, useState } from "react";
import {
  query,
  getDocs,
  collection,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
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
import { getAuth } from "firebase/auth";

const Avatar = styled("img", {
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  background: "Gray",
  marginBottom: "10px",
});

const Channel: React.FunctionComponent<IPageProps> = (props) => {
  const history = useHistory();
  const auth = getAuth();

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

  const onChangePreference = async (e: any) => {
    await setDoc(
      doc(
        db,
        `users/${auth.currentUser?.providerData[0].uid}/preference`,
        channel_id
      ),
      { preference: e.target.value }
    );

    (window as any).alert("Preference Updated");
  };

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
            <Button
              style={{
                marginTop: 400,
                backgroundColor: "#05473C",
                color: "white",
                width: "200px",
              }}
              onClick={() =>
                history.push(`/channel/${channel_id}/${name}/post`)
              }
            >
              Create Post
            </Button>
            <div
              style={{
                marginTop: 40,
              }}
              onChange={onChangePreference}
            >
              <input type="radio" value="All" name="preference" /> Get Notified
              on All Posts
              <input
                style={{
                  marginLeft: 40,
                }}
                type="radio"
                value="Tagged"
                name="preference"
              />{" "}
              Get Notified on Tagged Posts
            </div>
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default Channel;
