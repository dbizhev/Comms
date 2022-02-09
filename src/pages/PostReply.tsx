import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
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
  return (
    <Container>
      <Content>
        <Sidebar />
        <PageContainer>
          <Container>
            <div>
              <h1>{post_name}</h1>
              <div
                style={{
                  marginTop: 40,
                }}
                onChange={onChangePreference}
              >
                <input type="radio" value="All" name="preference" /> Get All
                <input
                  style={{
                    marginLeft: 40,
                  }}
                  type="radio"
                  value="Tagged"
                  name="preference"
                />{" "}
                Tagged
              </div>
              <Comments id={post_id} />
            </div>
          </Container>
        </PageContainer>
      </Content>
    </Container>
  );
};

export default PostReply;
