import { Box } from "@mui/material";
import { HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HashLoader color="#3637d6" />
    </Box>
  );
};

export default Spinner;
