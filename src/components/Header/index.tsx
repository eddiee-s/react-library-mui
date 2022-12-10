import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import HeadBar from "./HeadBar";

const Header: FC<{ title: string }> = ({ title }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#0b52a2", display: "flex", height: "150px" }}
      >
        <HeadBar title={title} />
      </AppBar>
    </Box>
  );
};

export default Header;
