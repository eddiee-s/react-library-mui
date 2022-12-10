import { FC } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import HeaderDrawer from "./HeaderDrawer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const drawerWidth = 360;
const boxStyle = {
  display: "flex",
  padding: "12px 32px",
  fontSize: "16px",
};
const typoTitleStyle = { color: "#7e7c7c", fontWeight: "bold", width: "28%" };
const typoValueStyle = { color: "#686767", width: "70%" };

interface PersistentDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleDeleteBook: () => void;
}

const PersistentDrawerRight: FC<PersistentDrawerProps> = ({
  open = false,
  handleDrawerClose,
  handleDeleteBook,
}) => {
  const { singleBook } = useSelector((state: RootState) => state.books);
  const { id, title, nameOfAuthor, yearOfBublishing:yearOfPublishing, coverPhoto, numOfPages, quantity } = singleBook;

  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          marigin: 0,
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "#fafafa",
            width: drawerWidth,
            boxShadow: 5,
            border: "none",
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <HeaderDrawer
          title={title}
          author={nameOfAuthor}
          handleDrawerClose={handleDrawerClose}
          handleDeleteBook={handleDeleteBook}
          handleEditBook={() => navigate(`/book-details/${id}`)}
        />
        <Divider />
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: drawerWidth,
            maxHeight: 250,
            backgroundColor: "#fff2e9 !important",
          }}
        >
          <Box
            component="img"
            sx={{
              width: 233,
              height: 350,
              maxWidth: { xs: 233, md: 167 },
              maxHeight: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src={coverPhoto}
          />
        </Box>
        <Divider />
        <Box sx={{ display: "flex", padding: "16px 32px", color: "##808080" }}>
          <Typography>Info</Typography>
        </Box>

        <Box sx={{ ...boxStyle }}>
          <Typography sx={{ ...typoTitleStyle }}>Title</Typography>
          <Typography sx={{ ...typoValueStyle }}>
            {" "}
            {title}{" "}
          </Typography>
        </Box>
        <Box sx={{ ...boxStyle }}>
          <Typography sx={{ ...typoTitleStyle }}>Author</Typography>
          <Typography sx={{ ...typoValueStyle }}>
            {" "}
            {nameOfAuthor}{" "}
          </Typography>
        </Box>
        <Box sx={{ ...boxStyle }}>
          <Typography sx={{ ...typoTitleStyle }}>Year</Typography>
          <Typography sx={{ ...typoValueStyle }}>
            {" "}
            {yearOfPublishing}{" "}
          </Typography>
        </Box>
        <Box sx={{ ...boxStyle }}>
          <Typography sx={{ ...typoTitleStyle }}>Pages</Typography>
          <Typography sx={{ ...typoValueStyle }}>
            {" "}
            {numOfPages}{" "}
          </Typography>
        </Box>
        <Box sx={{ ...boxStyle }}>
          <Typography sx={{ ...typoTitleStyle }}>Quantity</Typography>
          <Typography sx={{ ...typoValueStyle }}>
            {" "}
            {quantity}{" "}
          </Typography>
        </Box>

        <Divider />
      </Drawer>
    </Box>
  );
};

export default PersistentDrawerRight;
