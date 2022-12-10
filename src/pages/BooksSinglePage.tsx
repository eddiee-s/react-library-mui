
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import FormAddBook from '../components/Forms/FormAddBook'

import { RootState } from "../redux/store";
import FormEditBook from "../components/Forms/FormEditBook";
const BooksSinglePage = () => {

  const [isNewBook, setIsNewBook] = useState<boolean>(false)
  const {singleBook} = useSelector((state:RootState) => state.books)
  
  useEffect(() => {
    Object.keys(singleBook).length === 0 && setIsNewBook(true)
  }, [])
  
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{isNewBook ? "Add New Book" : singleBook.title}</title>
      </Helmet>
      <Header title={isNewBook ? "Add Book" : `Edit: ${singleBook.title}`}/>
      {isNewBook ? <FormAddBook/> : <FormEditBook/>}
    </div>
  );
};

export default BooksSinglePage;
