import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { filterByAuthor } from "../redux/slices/books-slice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fafafa",
    },
  },
});

export default function SelectAuthor() {
  const { authorsArray, authorFilter } = useSelector(
    (state: RootState) => state.books
  );
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(filterByAuthor(event.target.value as string));
  };
  const title = authorFilter === "" ? " Any Author" : "Selected Author:";
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 200 }}>
        <FormControl
          fullWidth
          size="small"
          sx={{
            "& .MuiFormLabel-root": {
              color: "white",
            },
          }}
        >
          <InputLabel id="author-select"> {title} </InputLabel>
          <Select
            sx={{
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiSelect-outlined": {
                color: "white",
              },
              "&:hover": {
                "&& fieldset": {
                  border: "2px solid white",
                },
              },
            }}
            labelId="author-select-label"
            id="author-select"
            value={authorFilter}
            label={title}
            onChange={handleChange}
          >
            <MenuItem value={""}>Show all</MenuItem>
            {authorsArray.map((author, index) => (
              <MenuItem key={index} value={author}>
                {author}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}
