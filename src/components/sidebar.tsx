import { getAuth } from "firebase/auth";
import { query, getDocs, collection } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { styled } from "../stitches.config";
import { Button } from "./button";
import { SideBarItem } from "./sidebaritem";

const SidebarContainer = styled("div", {
  width: "20vw",
  background: "$white",
  borderRight: "$darkGreen solid 2px",
  marginTop: "20px",
  marginBottom: "20px",
  color: "$black",
});

const LogoContainer = styled("div", {
  marginTop: "70px",
  marginBottom: "50px",
});

const auth = getAuth();

export default function Sidebar() {
  const [channelList, setChannelList] = useState<any>([]);

  const logOut = () => {
    auth.signOut();
    window.location.reload();
  };

  const fetchChannels = useCallback(async () => {
    const q = query(collection(db, "channels"));
    const docs = await getDocs(q);
    let allChannels: Array<any> = [];
    docs.forEach((item: any) => {
      const data = item.data();
      allChannels.push(data);
    });
    // const postComments = allChannels.filter((item, key) => {
    //   return item.pId === id;
    // });
    setChannelList(allChannels);
  }, []);
  console.log(channelList);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);
  return (
    <SidebarContainer>
      <LogoContainer>
        <img
          src="https://www.google.com/url?sa=i&url=http%3A%2F%2Fpadtrader.ca%2Fcompare-properties&psig=AOvVaw2tlz6nVrMYf2l_rfXx8nuB&ust=1643802450502000&source=images&cd=vfe&ved=2ahUKEwjwgbW6t971AhUOXcAKHQJZBjsQjRx6BAgAEAk"
          alt="logo"
        />
      </LogoContainer>
      <div>
        <h3>CHANNELS</h3>
      </div>
      {channelList.length > 0 &&
        channelList.map((channel: any) => {
          return (
            <Link to={`/channel/${channel.chId}/${channel.chName}`} key={channel.chId}>
              <SideBarItem>#{channel.chName}</SideBarItem>
            </Link>
          );
        })}
      <div style={{ marginTop: 400 }}>
        <Button>
          <Link to={"/add-channel"}>Add channel</Link>
        </Button>
      </div>
      <div style={{ marginTop: 50 }}>
        <Button onClick={logOut}>Signout</Button>
      </div>
    </SidebarContainer>
  );
}
