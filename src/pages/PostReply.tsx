import { styled } from "@stitches/react";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/comments";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { Time } from "../components/listItems";
import Sidebar from "../components/sidebar";
import { db } from "../config/firebase";

const Subject = styled("h1", {
  marginLeft: "25px",
  fontSize: "24px",
  fontWeight: "normal",
});

const Channel = styled("h1", {
  marginLeft: "25px",
  fontSize: "16px",
  fontWeight: "normal",
  color: "#868686",
});

const AuthorCard = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "90%",
  marginLeft: "20px",
  justifyContent: "left",
});

const Avatar = styled("img", {
  marginTop: "15px",
  height: "26px",
  width: "26px",
  borderRadius: "50%",
  background: "Gray",
  marginBottom: "10px",
});

const Name = styled("div", {
  fontSize: "16px",
  marginTop: "15px",
  fontWeight: "400",
  width: "100%",
});

const PostContainer = styled("div", {
  backgroundColor: "$white",
  border: "none",
  width: "1400px",
  borderRadius: "8px",
  marginLeft: "20px",
});

const PostText = styled("p", {
  wordWrap: "break-word",
});
const PostReply = () => {
  const auth = getAuth();
  const { post_id } = useParams<{ post_id: string }>();
  const { post_name } = useParams<{ post_name: string }>();
  const [body, setBody] = useState<string>("");
  const [channel, setChannel] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [authorPhoto, setAuthorPhoto] = useState<string>("");
  const [postTime, setPostTime] = useState<string>("");

  const onChangePreference = async (e: any) => {
    await setDoc(
      doc(
        db,
        `users/${auth.currentUser?.providerData[0].uid}/preference_post`,
        post_id
      ),
      { preference: e.target.value }
    );

    (window as any).alert("Preference Updated");
  };

  const fetchPreference = useCallback(async () => {
    const notifRef = doc(
      db,
      `users/${auth.currentUser?.providerData[0].uid}/preference_post`,
      post_id
    );
    const docs = await getDoc(notifRef);
    // let pref: Array<any> = [];
    // docs.forEach((item: any) => {
    //   const data = item.data();
    //   pref.push(data);
    // });
    console.log(docs.get);
  }, [auth.currentUser?.providerData, post_id]);

  const fetchPostInfo = useCallback(async () => {
    const qPost = query(collection(db, "posts"), where("pId", "==", post_id));
    const docsPost = await getDocs(qPost);
    let selectedPost: Array<any> = [];

    docsPost.forEach((item: any) => {
      const data = item.data();
      selectedPost.push(data);
    });

    const mainPost = selectedPost.filter((item, key) => {
      return item.body !== "";
    });

    setChannel(mainPost[0].channel);
    setBody(mainPost[0].body);
    setAuthor(mainPost[0].author);
    setAuthorPhoto(mainPost[0].photoAuthor);
    setPostTime(mainPost[0].time.toDate().toString().substring(0, 25));
  }, [post_id]);

  useEffect(() => {
    fetchPostInfo();
  }, [fetchPostInfo]);

  useEffect(() => {
    fetchPreference();
  }, [fetchPreference]);
  return (
    <Container>
      <Content>
        <Sidebar />
        <Container>
          <Subject>{post_name}</Subject>
          <Channel># {channel}</Channel>
          <AuthorCard>
            <Avatar alt="" src={authorPhoto || ""} />
            <Name>{author}</Name>
            <Time>{postTime}</Time>
          </AuthorCard>
          <PostContainer>
            <PostText>{body}</PostText>
          </PostContainer>
          <div style={{ position: "relative" }}>
            <div
              style={{
                marginTop: 40,
                marginLeft: 40,
              }}
              onChange={onChangePreference}
            >
              <input type="radio" value="All" name="preference" /> Get All
              Notifications
              <input
                style={{
                  marginLeft: 40,
                }}
                type="radio"
                value="Tagged"
                name="preference"
              />
              Get Mentioned Notifications
            </div>
          </div>
          <div style={{ height: "100%", overflowY: "scroll", width: "100%" }}>
            <Comments id={post_id} />
          </div>
        </Container>
      </Content>
    </Container>
  );
};

export default PostReply;
