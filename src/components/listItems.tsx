import { styled } from "@stitches/react";

export const NotificationCard = styled("div", {
  display: "flex",
  flexDirection: "row",
  marginBottom: "10px",
  paddingBottom: "10px",
  width: "100%",

  borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
});

export const Time = styled("div", {
  fontSize: "13px",
  marginTop: "15px",
  fontStyle: "italic",
  marginLeft: "15px",
  width: "100%",
});
export const Name = styled("div", {
  fontSize: "$2",
  marginTop: "15px",
  marginLeft: "15px",
  fontWeight: "bold",
  textTransform: "uppercase",
  width: "100%",
});
export const Post = styled("div", {
  width: "100%",
  marginLeft: "15px",
  marginTop: "15px",
});

export const PostChannel = styled("div", {
  fontSize: "14px",
  marginLeft: "15px",
  fontWeight: "bold",
  textTransform: "uppercase",
  width: "100%",
});

export const PostTitle = styled("div", {
  fontSize: "11px",
  marginLeft: "15px",
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
