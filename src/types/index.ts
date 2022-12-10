export interface BookEndpointTypes {
  limit: number;
  records: BookDataTypes[];
  start: number;
  totalRecords: number;
}

export interface DeleteBookResponse {
  info: resInfoTypes;
}

type resInfoTypes = {
  responseMessage: string;
  statusCode: number;
};

export interface BookDataTypes {
  id?: number;
  isbn?: number;
  title?: string;
  nameOfAuthor?: string;
  dateOfBirthAuthor?: string;
  numOfPages?: number;
  yearOfBublishing?: number;
  quantity?: number;
  coverPhoto?: string;
}

export type Order = "asc" | "desc";

export interface BooksSortDataTypes {
  orderBy: "sortByTitle" | "sortByAuthor";
  order: Order;
}

export interface TableHeadData {
  image: string;
  sortByTitle: string;
  sortByAuthor: string;
  year: number;
  pages: number;
  quantity: number;
  more: string;
}

export interface HeadCell {
  id: keyof TableHeadData;
  sortable: boolean;
  numeric: boolean;
  label: string;
}

export interface bookDataTypes {
  id?: number;
  title?: string;
  author?: string;
}
