import { HeadCell, Order, TableHeadData } from "../../types/index";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

const headCells: readonly HeadCell[] = [
  {
    id: "image",
    sortable: false,
    numeric: false,
    label: "",
  },
  {
    id: "sortByTitle",
    sortable: true,
    numeric: false,
    label: "Title",
  },
  {
    id: "sortByAuthor",
    sortable: true,
    numeric: false,
    label: "Author",
  },
  {
    id: "year",
    sortable: false,
    numeric: true,
    label: "Year",
  },
  {
    id: "pages",
    sortable: false,
    numeric: true,
    label: "Pages",
  },
  {
    id: "quantity",
    sortable: false,
    numeric: true,
    label: "Quantity",
  },
  {
    id: "more",
    sortable: false,
    numeric: true,
    label: "",
  },
];

interface BooksTableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableHeadData
  ) => void;
  order: Order;
  orderBy: string;
}

function BooksTableHead(props: BooksTableHeadProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TableHeadData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon={!headCell.sortable}
              disabled={!headCell.sortable}
              sx={{ fontWeight: "bold" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default BooksTableHead;
