import { styled } from "../stitches.config";

export const Button = styled("button", {
  borderRadius: "$round",
  fontSize: "$4",
  padding: "$2 $3",
  border: "2px solid $black",
  color: "$black",

  "&:hover": {
    backgroundColor: "$white",
    color: "$black",
  },
});
