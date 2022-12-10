import axios from "axios";
import { FC, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import ConfirmModal from "../Modals/ConfirmModal";
import ErrorModal from "../Modals/ErrorModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface BookDataTypes {
  id?: number;
  isbn?: number;
  title?: string;
  nameOfAuthor?: string;
  dateOfBirthAuthor?: string;
  numberOfPages?: number;
  yearOfPublishing?: number;
  quantity?: number;
  coverPhoto?: string;
}
const FormEditBook: FC = () => {
  const { singleBook } = useSelector((state: RootState) => state.books);

  const [vaildationMsg, setVaildationMsg] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [formInputs, setFormInputs] = useState<BookDataTypes>({
    isbn: singleBook.isbn,
    title: singleBook.title,
    nameOfAuthor: singleBook.nameOfAuthor,
    dateOfBirthAuthor: singleBook.dateOfBirthAuthor,
    numberOfPages: singleBook.numOfPages,
    yearOfPublishing: singleBook.yearOfBublishing,
    quantity: singleBook.quantity,
    coverPhoto: singleBook.coverPhoto,
  });
  const navigate = useNavigate();

  const handleValidateForm = () => {
    if (formInputs.quantity === singleBook.quantity) {
      setVaildationMsg(
        "Quanitiy unchanged. Please change value then try again."
      );
    } else {
      setVaildationMsg("");
      editBook(formInputs);
    }
  };

  const editBook = async (book: BookDataTypes) => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/${singleBook.id}`, book)
      .then((res) => {
        if (res.status === 200) {
          setSuccessMsg(res.data.info.responseMessage);
        }
      })
      .catch((err) => {
        setErrMsg(err.response.data.error.responseMessage);
      });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          width: 700,
          paddingLeft: { xs: "3%", sm: "10%", lg: "9%" },
          my: 3,
          "& .MuiTextField-root": { my: 0.5, mx: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              placeholder="Title of the book"
              label="Title"
              variant="standard"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={formInputs.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Name of the author"
              label="Author"
              variant="standard"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={formInputs.nameOfAuthor}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Date of birth (Author)"
              label="YYYY-MM-DD"
              variant="standard"
              sx={{ width: 150 }}
              InputProps={{
                readOnly: true,
              }}
              value={formInputs.dateOfBirthAuthor}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              placeholder="ISBN"
              label="ISBN"
              variant="standard"
              sx={{ width: 100 }}
              InputProps={{
                readOnly: true,
              }}
              value={formInputs.isbn}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              placeholder="Number of pages"
              label="Pages"
              variant="standard"
              sx={{ width: 100 }}
              InputProps={{
                readOnly: true,
              }}
              value={formInputs.numberOfPages}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              placeholder="Year of publishing"
              label="Year"
              variant="standard"
              sx={{ width: 100 }}
              InputProps={{
                readOnly: true,
              }}
              value={formInputs.yearOfPublishing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              placeholder="Quantity"
              label="Quantity"
              variant="standard"
              sx={{ width: 100 }}
              onChange={(e) => {
                setFormInputs({ ...formInputs, quantity: +e.target.value });
              }}
              value={formInputs.quantity}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Image"
              placeholder="Upload image"
              variant="standard"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: "flex" }}>
            <Button
              variant="outlined"
              color="primary"
              disabled
              fullWidth
              sx={{ m: 1, alignSelf: "flex-end" }}
            >
              Upload
            </Button>
          </Grid>
          <Grid item xs={4} sx={{ my: 1 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleValidateForm}
            >
              Update Book
            </Button>
          </Grid>
        </Grid>
        <p>
          *Note: Only <b>Quantity</b> value can be modified!
        </p>
        {vaildationMsg && (
          <ErrorModal
            handleConfirm={() => setVaildationMsg("")}
            message={vaildationMsg}
          />
        )}
        {errMsg && (
          <ErrorModal handleConfirm={() => setErrMsg("")} message={errMsg} />
        )}
        {successMsg && (
          <ConfirmModal
            title={"New Book add status"}
            message={successMsg}
            handleConfirm={() => {
              setSuccessMsg("");
              navigate("/");
            }}
          />
        )}
      </Box>
    </>
  );
};

export default FormEditBook;
