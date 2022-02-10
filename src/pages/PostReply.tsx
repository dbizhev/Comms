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
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/comments";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import { db } from "../config/firebase";

const PostReply = () => {
  const auth = getAuth();
  const { post_id } = useParams<{ post_id: string }>();
  const { post_name } = useParams<{ post_name: string }>();

  const onChangePreference = async (e: any) => {
    await setDoc(
      doc(
        db,
        `users/${auth.currentUser?.providerData[0].uid}/preference`,
        post_id
      ),
      { preference: e.target.value }
    );

    (window as any).alert("Preference Updated");
  };

  const fetchPreference = useCallback(async () => {
    const notifRef = doc(
      db,
      `users/${auth.currentUser?.providerData[0].uid}/preference`,
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

  useEffect(() => {
    fetchPreference();
  }, [fetchPreference]);
  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>
          <div style={{ position: "relative" }}>
            <h1>{post_name}</h1>
            <div
              style={{
                marginTop: 40,
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
              Get Tagged Notifications
            </div>
          </div>
          <div style={{ height: 800, overflow: "scroll" }}>
            <Comments id={post_id} />
          </div>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default PostReply;
