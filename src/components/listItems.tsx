import { styled } from "@stitches/react";

export const NotificationCard = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "90%",
  borderRadius: "8px",
  borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
  "&:hover": {
    backgroundColor: "#D3D3D3",
  },
});

export const Time = styled("div", {
  fontSize: "16px",
  marginTop: "15px",
  color: "#848484",
  marginLeft: "15px",
  width: "100%",
});
export const Name = styled("div", {
  fontSize: "16px",
  marginTop: "25px",
  marginLeft: "15px",
  fontWeight: "400",
  width: "100%",
});
export const Post = styled("div", {
  width: "100%",
  marginTop: "15px",
  alignItems: "start",
});

export const PostChannel = styled("div", {
  fontSize: "12px",
  fontWeight: "400",
  width: "100%",
});

export const PostTitle = styled("div", {
  fontSize: "11px",
  width: "100%",
  overflow: "clip",
  "&:hover": {
    color: "$black",
    fontWeight: "bold",
  },
});
export const Avatar = styled("img", {
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  background: "Gray",
  marginBottom: "10px",
});

export const MarkAsRead = styled("button", {
  borderRadius: "8px",
  fontSize: "10px",
  padding: "$2 $3",
  marginRight: "10px",
  border: "2px solid $black",
  color: "$black",
  background: "$white",
  width: "100%",
  height: "30px",
  marginLeft: "25px",
  marginTop: "15px",

  "&:hover": {
    backgroundColor: "$black",
    color: "$white",
    fontWeight: "bold",
  },
});
