import { styled } from "../stitches.config";

export const SideBarItem = styled("p", {
  textDecoration: "none",
  fontSize: "20px",
  color: "$black",
  "&:hover": {
    color: "$black",
    fontWeight: "bold",
  },
});
