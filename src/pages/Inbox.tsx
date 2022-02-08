import React, { useCallback, useEffect, useState } from "react";
import { Container } from "../components/container";
import { Content } from "../components/content";
import { PageContainer } from "../components/pagecontainer";
import Sidebar from "../components/sidebar";
import IPageProps from "../interfaces/page.interface";
import { query, getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import {
  NotificationCard,
  Name,
  Time,
  Post,
  Avatar,
  MarkAsRead,
  PostTitle,
  PostChannel,
} from "../components/listItems";
import { getAuth } from "firebase/auth";

const InboxPage: React.FunctionComponent<IPageProps> = (props) => {
  const auth = getAuth();
  const [postList, setPostList] = useState<any>([]);

  // db.collection(`users/${user.uid}/inbox`)

  const markAsDone = async (pId: string) => {
    // var uniqId = "id" + new Date().getTime();
    // let readObj = {
    //   readID: uniqId,
    //   pId: pId,
    //   time: new Date(),
    //   reader: auth.currentUser?.email || "",
    // };
    // // addDoc(collection(db, "readposts/" + auth.currentUser?.uid), readObj);
    // await addDoc(collection(db, "readposts"), readObj);
    const notifRef = doc(
      db,
      `users/${auth.currentUser?.providerData[0].uid}/inbox`,
      pId
    );

    await updateDoc(notifRef, {
      read: true,
    });
    (window as any).alert("Notification marked as done");
    setTimeout((window as any).location.reload(), 3000);
  };

  const fetchNotifications = useCallback(async () => {
    const q = query(
      collection(db, `users/${auth.currentUser?.providerData[0].uid}/inbox`)
    );
    const docs = await getDocs(q);
    let allNotifications: Array<any> = [];
    docs.forEach((item: any) => {
      const data = item.data();
      allNotifications.push(data);
    });

    const unRead = allNotifications.filter((item, key) => {
      return item.read === false;
    });

    setPostList(unRead);
  }, [auth.currentUser?.providerData]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
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
                  <NotificationCard key={post.time}>
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
                    <MarkAsRead onClick={() => markAsDone(post.pId)}>
                      mark as done
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

export default InboxPage;
