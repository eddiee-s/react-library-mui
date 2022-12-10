import { FC } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SelectAuthor from "../SelectAuthor";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const HeadBar: FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Toolbar sx={{ padding: "80px 10px 10px 0px" }}>
      {!(title === "Books") && (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ position: "absolute", mr: 2, top: 10, left: 40 }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <Typography
        variant="h4"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          paddingLeft: { xs: "3%", sm: "10%", lg: "9%" },
        }}
      >
        {title}
      </Typography>
      {title === "Books" && <SelectAuthor />}
    </Toolbar>
  );
};

export default HeadBar;
