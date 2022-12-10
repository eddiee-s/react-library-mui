import { FC } from "react";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

interface HeaderDrawerPropsType {
  handleDrawerClose: () => void;
  handleDeleteBook: () => void;
  handleEditBook: () => void;
  title: string | undefined;
  author: string | undefined;
}

const HeaderDrawer: FC<HeaderDrawerPropsType> = ({
  handleDrawerClose,
  handleDeleteBook,
  handleEditBook,
  title,
  author,
}) => {
  const theme = useTheme();

  return (
    <DrawerHeader
      sx={{
        postiton: "flex",
        flexShrink: 0,
        flexDirection: "column",
        alignContent: "flex-start",
        backgroundColor: "#002b73",
        height: "150px",
        minHeight: "150px",
        boxShadow: 5,
      }}
    >
      <div style={{ paddingTop: "12px", alignSelf: "flex-end" }}>
        <IconButton sx={{ color: "#fff" }} onClick={() => handleEditBook()}>
          <EditIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }} onClick={() => handleDeleteBook()}>
          <DeleteIcon />
        </IconButton>
      </div>
      <IconButton
        sx={{
          alignSelf: "flex-start",
          backgroundColor: "#d6d8dd",
          "&:hover": { backgroundColor: "#eef0f5" },
        }}
        onClick={() => handleDrawerClose()}
      >
        {theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <Box sx={{ alignSelf: "flex-start", paddingLeft: 5 }}>
        <Typography sx={{ color: "#fff", fontWeight: "bold" }} component="div">
          {title}
        </Typography>
        <Typography sx={{ color: "#fff" }} component="div">
          {author}
        </Typography>
      </Box>
    </DrawerHeader>
  );
};

export default HeaderDrawer;
