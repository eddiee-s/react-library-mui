import axios from "axios";
import { FC, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { dateIsValid } from "../../helpers/date-validation";
import ConfirmModal from "../Modals/ConfirmModal";
import ErrorModal from "../Modals/ErrorModal";
import { useNavigate } from "react-router-dom";

interface BookDataTypes {
  id?: number;
  isbn: number;
  title: string;
  nameOfAuthor: string;
  dateOfBirthAuthor: string;
  numberOfPages: number;
  yearOfPublishing: number;
  quantity: number;
  coverPhoto?: string;
}

const initialFormState = {
  isbn: 0,
  title: "",
  nameOfAuthor: "",
  dateOfBirthAuthor: "",
  numberOfPages: 0,
  yearOfPublishing: 0,
  quantity: 0,
  coverPhoto: "",
};

const FormAddBook: FC = () => {
  const [vaildationMsg, setVaildationMsg] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [formInputs, setFormInputs] = useState<BookDataTypes>(initialFormState);
  const navigate = useNavigate();

  const handleValidateForm = () => {
    const dateInvalid = !dateIsValid(formInputs.dateOfBirthAuthor);
    if (
      formInputs.title === "" ||
      formInputs.nameOfAuthor === "" ||
      formInputs.dateOfBirthAuthor === "" ||
      dateInvalid ||
      formInputs.isbn === 0 ||
      formInputs.numberOfPages === 0 ||
      formInputs.yearOfPublishing === 0 ||
      formInputs.quantity === 0
    ) {
      setVaildationMsg(
        dateInvalid
          ? "Please check date format entered"
          : "Empty fields not allowed. Please check for empty fields"
      );
    } else {
      setVaildationMsg("");
      addBook(formInputs);
    }
  };

  const addBook = async (book: BookDataTypes) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}`, book)
      .then((res) => {
        if (res.status === 201) {
          setFormInputs(initialFormState);
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
              onChange={(e) => {
                setFormInputs({ ...formInputs, title: e.target.value });
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
              onChange={(e) => {
                setFormInputs({ ...formInputs, nameOfAuthor: e.target.value });
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
              onChange={(e) => {
                setFormInputs({
                  ...formInputs,
                  dateOfBirthAuthor: e.target.value,
                });
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
              onChange={(e) => {
                setFormInputs({ ...formInputs, isbn: +e.target.value });
              }}
              value={formInputs.isbn > 0 ? formInputs.isbn : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              placeholder="Number of pages"
              label="Pages"
              variant="standard"
              sx={{ width: 100 }}
              onChange={(e) => {
                setFormInputs({
                  ...formInputs,
                  numberOfPages: +e.target.value,
                });
              }}
              value={
                formInputs.numberOfPages > 0 ? formInputs.numberOfPages : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              placeholder="Year of publishing"
              label="Year"
              variant="standard"
              sx={{ width: 100 }}
              onChange={(e) => {
                setFormInputs({
                  ...formInputs,
                  yearOfPublishing: +e.target.value,
                });
              }}
              value={
                formInputs.yearOfPublishing > 0
                  ? formInputs.yearOfPublishing
                  : ""
              }
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
              value={formInputs.quantity > 0 ? formInputs.quantity : ""}
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
              Save Book
            </Button>
          </Grid>
        </Grid>
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

export default FormAddBook;
