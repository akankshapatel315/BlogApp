import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { debounce } from "lodash";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { axiosGet } from "../../Common/commonAPI";
export const Search = () => {
  const columns: any = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "category", label: "Category", minWidth: 100 },
    {
      id: "description",
      label: "Description",
      minWidth: 170,
      align: "center",
    },
  ];
  const [allblogs, setAllBlogs] = useState<any>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [serachContent, setSearchContent] = React.useState<string>("");
  async function getAllArticles() {
    try {
      const response: any = await axiosGet({}, "getAllArticles");
      if (response.status === 200) {
        setAllBlogs(response.data.articles);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("An error occurred while fetching the data");
      }
    }
  }

  useEffect(() => {
    getAllArticles();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) =>
    setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (value: any) => {
    if (!value) {
      getAllArticles();
      return;
    }
    const filteredResults = allblogs.filter((item: any) =>
      item?.category.toLowerCase().includes(value.toLowerCase())
    );
    setAllBlogs(filteredResults);
  };

  const debouncedSearch = debounce(handleSearch, 300);

  const handleChange = (event: any) => {
    const value = event.target.value;
    setSearchContent(value);
    debouncedSearch(value);
  };
  return (
    <div className="position-relative">
      <div className="mt-4 ">
        <OutlinedInput
          sx={{ width: "50%", overflow: "hidden" }}
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">Search</InputAdornment>
          }
          value={serachContent}
          onChange={handleChange}
          label="Amount"
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column: any, index: number) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allblogs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column: any) => {
                          const value = row[column?.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allblogs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};
