import { createSlice } from "@reduxjs/toolkit";
import { BookDataTypes, BooksSortDataTypes } from "../../types";




interface booksState {
    allBooks: BookDataTypes [],
    singleBook: BookDataTypes,
    sortBooks: BooksSortDataTypes,
    authorsArray: string [],
    authorFilter:string,
    newBookData:BookDataTypes
}

const newBookInitialData = { 
    isbn: 0,
    title: "",
    nameOfAuthor: "",
    dateOfBirthAuthor: "",
    numberOfPages: 0,
    yearOfPublishing: 0,
    quantity: 0,
    coverPhoto: "",
}

const initialState:booksState = {
    allBooks: [] ,
    singleBook:{},
    sortBooks: {orderBy:"sortByTitle", order:'asc'},
    authorsArray: [],
    authorFilter: '',
    newBookData: newBookInitialData
} 

const slice = createSlice({
    name:'books',
    initialState:initialState,
    reducers :{
        fetchBooks:(state, action) => {         
            return{
                ...state,
                allBooks:action.payload,
            }
        },
        storeSingleBook:(state, action) => {         
            return{
                ...state,
                singleBook:action.payload,
            }
        },
        resetSingleBook:(state) => {         
            return{
                ...state,
                singleBook:initialState.singleBook,
            }
        },
        sortBooks:(state, action) => {
            return{
                ...state,
                sortBooks:action.payload
            }
        },
        fetchAuthors:(state, action) => {
            const authors = action.payload.map((book:BookDataTypes) => book.nameOfAuthor).sort()
            const authorsFiltered = [...new Set(authors)] as string []            
            return{
                ...state,
                authorsArray:authorsFiltered,
            }
        },
        filterByAuthor:(state, action) => {
            return{
                ...state,
                authorFilter:action.payload
            }
        },
        addNewBookData:(state, action) => {
            return{
                ...state,
                newBookData:action.payload
            }
        },
        
    }
})


export default slice.reducer;
export const {
    fetchBooks,
    storeSingleBook,
    resetSingleBook,
    sortBooks,
    fetchAuthors,
    filterByAuthor,
    addNewBookData
} = slice.actions;