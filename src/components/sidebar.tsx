import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { getAuth } from "firebase/auth";
import { query, getDocs, collection } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../config/firebase";
import { styled } from "../stitches.config";
import { Button } from "./button";
import { SideBarItem } from "./sidebaritem";

const SidebarContainer = styled("div", {
  width: "20vw",
  background: "$white",
  border: "$darkGreen solid 2px",
  color: "$black",
  height: "auto",
});

const LogoContainer = styled("div", {
  marginTop: "70px",
  marginBottom: "50px",
});

const InboxItem = styled("h3", {
  fontWeight: "normal",
  "&:hover": {
    color: "$black",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

const InboxItemNew = styled("div", {
  display: "flex",
  fontWeight: "normal",
  marginLeft: "100px",
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
  },
});

const InboxAvatar = styled("div", {
  height: "26px",
  width: "26px",
  borderRadius: "50%",
  background: "red",
  marginLeft: "10px",
  lineHeight: "20px",
  textAlign: "center",
});

const ChannelList = styled("div", {
  height: "200px",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const auth = getAuth();

export default function Sidebar() {
  const [channelList, setChannelList] = useState<any>([]);
  const history = useHistory();

  const logOut = () => {
    auth.signOut();
    window.location.reload();
  };
  const [postList, setPostList] = useState<any>([]);

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
  }, []);

  const fetchChannels = useCallback(async () => {
    const q = query(collection(db, "channels"));
    const docs = await getDocs(q);
    let allChannels: Array<any> = [];
    docs.forEach((item: any) => {
      const data = item.data();
      allChannels.push(data);
    });

    const email = auth.currentUser?.email;
    const domain = !email ? "gmail.com" : email.split("@").pop();
    const allowedPosts = allChannels.filter(
      (post) => post.email.split("@").pop() === domain
    );

    setChannelList(allowedPosts);
  }, []);

  useEffect(() => {
    fetchChannels();
    fetchNotifications();
  }, [fetchChannels, fetchNotifications]);
  return (
    <SidebarContainer>
      <LogoContainer>
        {/* <img
          height={50}
          src="https://4m4you.com/wp-content/uploads/2020/06/logo-placeholder.png"
          alt="logo"
        /> */}
        <h2>🛰 Comms</h2>
      </LogoContainer>
      {postList.length ? (
        <InboxItemNew onClick={() => history.push(`/inbox`)}>
          <span style={{ marginTop: "3px" }}>INBOX</span>
          <InboxAvatar>
            <span style={{ color: "white" }}>{postList.length}</span>
          </InboxAvatar>
        </InboxItemNew>
      ) : (
        <InboxItem onClick={() => history.push(`/inbox`)}>
          INBOX {postList.length}
        </InboxItem>
      )}
      <div>
        <h3>Channels</h3>
      </div>
      <ChannelList>
        {channelList.length > 0 &&
          channelList.map((channel: any) => {
            return (
              <Link
                to={`/channel/${channel.chId}/${channel.chName}`}
                key={channel.chId}
              >
                <SideBarItem>#{channel.chName}</SideBarItem>
              </Link>
            );
          })}
      </ChannelList>
      <div style={{ marginTop: 300 }}>
        <Button>
          <Link to={"/add-channel"}>
            <FontAwesomeIcon icon={faPlus} /> New Channel
          </Link>
        </Button>
      </div>
      <div style={{ marginTop: 30 }}>
        <Button onClick={logOut}>
          <FontAwesomeIcon icon={faSignOut} />
        </Button>
      </div>
    </SidebarContainer>
  );
}
