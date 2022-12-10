import { FC, useEffect, useState } from "react";
import { Order, TableHeadData } from "../../types/index";
import {
  Box,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetSingleBook, sortBooks, storeSingleBook } from "../../redux/slices/books-slice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import BooksTableHead from "./BooksTableHead";
import MoreMenu from "./MoreMenu";
import AddIcon from "@mui/icons-material/Add";

interface BooksTablePropTypes {
  drawer: boolean;
  handleDrawer: (arg: boolean) => void;
  openRemoveModal: () => void;
}
const BooksTable: FC<BooksTablePropTypes> = ({
  drawer,
  handleDrawer = (a) => a,
  openRemoveModal,
}) => {
  const { allBooks, singleBook } = useSelector(
    (state: RootState) => state.books
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TableHeadData>("sortByTitle");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage] = useState<number>(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableHeadData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSelectBook = (bookDetails: {}) => {
    handleDrawer(true);
    dispatch(storeSingleBook(bookDetails));
  };

  useEffect(() => {
    dispatch(sortBooks({ orderBy, order }));
  }, [order, orderBy]);

  return (
    <>
      <Paper
        sx={{
          width: drawer ? "calc(100% - 350px)" : "100%",
          borderRadius: "0px",
        }}
      >
        <Header title="Books" />
        <Box
          sx={{
            position: "absolute",
            top: 115,
            left: 10,
            "& > :not(style)": { m: 1 },
          }}
        >
          <Fab
            onClick={() => {
              dispatch(resetSingleBook())
              navigate("/book-new");
            }}
            sx={{
              color: "#60bb46",
              backgroundColor: "#ffffff",
              "&:hover": {
                backgroundColor: "#f6f6f6",
              },
            }}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Box>

        <TableContainer sx={{ maxHeight: "calc(100vh - 205px)" }}>
          <Table
            stickyHeader
            aria-label="simple table"
            sx={{ height: "100%", overflowY: "scroll" }}
          >
            <BooksTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {allBooks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ td: { border: 0 } }}
                    selected={singleBook.id === row.id ? true : false}
                    hover={true}
                  >
                    <TableCell
                      onClick={() => {
                        handleSelectBook(row);
                      }}
                      sx={{ width: { md: "8%", lg: "10%" }, cursor: "pointer" }}
                    >
                      <img src={row.coverPhoto} alt={row.title} width={60} />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleSelectBook(row);
                      }}
                      sx={{
                        fontWeight: orderBy === "sortByTitle" ? "bold" : "",
                        cursor: "pointer",
                      }}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleSelectBook(row);
                      }}
                      sx={{
                        fontWeight: orderBy === "sortByAuthor" ? "bold" : "",
                        cursor: "pointer",
                      }}
                    >
                      {row.nameOfAuthor}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleSelectBook(row);
                      }}
                      align="center"
                    >
                      {row.yearOfBublishing}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleSelectBook(row);
                      }}
                      align="center"
                    >
                      {row.numOfPages}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleSelectBook(row);
                      }}
                      align="center"
                    >
                      {row.quantity}
                    </TableCell>
                    <TableCell align="center">
                      <MoreMenu
                        handleEdit={() => {
                          handleSelectBook(row)
                          navigate(`/book-details/${row.id}`);
                        }}
                        openRemoveModal={() => {
                          openRemoveModal();
                          dispatch(storeSingleBook(row));
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.25)",
            width: "100%",
            position: "sticky",
          }}
          rowsPerPageOptions={[]}
          component="div"
          count={allBooks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </>
  );
};

export default BooksTable;
