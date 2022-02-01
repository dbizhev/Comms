import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
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
  const logOut = () => {
    auth.signOut();
    window.location.reload();
  };
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
      <SideBarItem>Channel</SideBarItem>
      <SideBarItem>Channel</SideBarItem>
      <SideBarItem>Channel</SideBarItem>
      <SideBarItem>Channel</SideBarItem>
      <SideBarItem>Channel</SideBarItem>
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
