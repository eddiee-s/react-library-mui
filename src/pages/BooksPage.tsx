import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { fetchAuthors, fetchBooks } from "../redux/slices/books-slice";
import BooksTable from "../components/BooksTable";
import RemoveModal from "../components/Modals/RemoveModal";
import ConfirmModal from "../components/Modals/ConfirmModal";
import { BookEndpointTypes, DeleteBookResponse } from "../types";
import PersistentDrawerRight from "../components/Drawer";
import { Helmet } from "react-helmet-async";
import Spinner from "../components/shared/Spinner";

const BooksPage = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openSucessModal, setOpenSucessModal] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");

  const { sortBooks, authorFilter, singleBook } = useSelector(
    (state: RootState) => state.books
  );
  const { orderBy, order } = sortBooks;

  const getBooks = async (sortBy: string, sortOrder: string) => {
    try {
      const res = await axios.get<BookEndpointTypes>(
        `${process.env.REACT_APP_API_URL}?${sortBy}=${sortOrder}`,
        {
          params: {
            ...(authorFilter.length > 0 ? { author: authorFilter } : {}),
          },
        }
      );
      const paramsIsEmpty = Object.keys(res.config.params).length === 0;
      setIsLoading(false);
      dispatch(fetchBooks(res.data.records));
      paramsIsEmpty && dispatch(fetchAuthors(res.data.records));
    } catch (error) {
      setIsLoading(true);
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  };

  const removeBook = async (id: number | undefined) => {
    try {
      const { data, status } = await axios.delete<DeleteBookResponse>(
        `${process.env.REACT_APP_API_URL}/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (status === 200) {
        setResMessage(data.info.responseMessage);
        setOpenSucessModal(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  };

  const handleRemoveBook = () => {
    removeBook(singleBook.id);
  };

  const handleConfirm = () => {
    getBooks(orderBy, order);
    setOpenSucessModal(false);
    setOpenDrawer(false);
  };

  useEffect(() => {
    getBooks(orderBy, order);
  }, [orderBy, order, authorFilter]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Books App Home Page</title>
      </Helmet>
      {isLoading ? (
        <Spinner />
      ) : (
        <BooksTable
          openRemoveModal={() => setRemoveModalIsOpen(true)}
          handleDrawer={(a) => setOpenDrawer(a)}
          drawer={openDrawer}
        />
      )}
      {openDrawer && (
        <PersistentDrawerRight
          open={openDrawer}
          handleDeleteBook={() => setRemoveModalIsOpen(true)}
          handleDrawerClose={() => setOpenDrawer(false)}
        />
      )}
      <RemoveModal
        isOpen={removeModalIsOpen}
        handleClose={() => setRemoveModalIsOpen(false)}
        bookData={singleBook}
        handleRemove={handleRemoveBook}
      />
      {openSucessModal && (
        <ConfirmModal
          title={"Book removal status"}
          message={resMessage}
          handleConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default BooksPage;
