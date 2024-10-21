import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useMediaQuery,
    Typography,
    Button,
    Box,
    CircularProgress

} from "@mui/material";
import { shadow } from "../../styles/global";
import EmptyDataImage from '../../assets/images/empty-image.svg';

import { Link } from "react-router-dom";

/**
 * StaticTable Component
 *
 * A reusable table component that displays data in a structured format.
 *
 * Props:
 * @param {Object[]} columns columns: Array of objects defining the columns. Each object should have:
 * @param {string} columns.id id: (string) Unique identifier for the column.
 * @param {string} columns.label label: (string) Display name for the column.
 * @param {Object[]} rows rows: Array of objects representing the data to be displayed in the table.
 * @param {Array<string>} hideColumns hideColumns: Array of column IDs to hide, especially in mobile view.
 *
 * Example Usage:
 *
 * const columns = [
 *     { id: 'name', label: 'Name' },
 *     { id: 'email', label: 'Email' },
 *     { id: 'age', label: 'Age' },
 * ];
 *
 * const rows = [
 *     { name: 'John Doe', email: 'john@example.com', age: 30 },
 *     { name: 'Jane Smith', email: 'jane@example.com', age: 25 },
 * ];
 *
 * <StaticTable columns={columns} rows={rows} hideColumns={['email']} />
 */

const StaticTable = ({ columns, rows, hideColumns = [], isLoading=false }) => {


    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const displayedRows = rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <TableContainer component={Paper} sx={{ ...shadow }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) =>
                            !hideColumns.includes(column.id) || !isMobile ? (
                                <TableCell key={column.id}>
                                    {column.label}
                                </TableCell>
                            ) : null
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? <LoadingTable columns={columns} height={350}/> : 
                    (displayedRows.length > 0 ? displayedRows.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column) =>
                                !hideColumns.includes(column.id) ||
                                    !isMobile ? (
                                    <TableCell key={column.id}>
                                        {row[column.id]}
                                    </TableCell>
                                ) : null
                            )}
                        </TableRow>
                    )) : <EmptyTable columns={columns} emptyTitle="No Teachers Found" emptySubTitle="No Teachers Available" />)}
                </TableBody>
            </Table>
            <Link to="/admin/teachers" >
                <Button sx={{ display: "flex", justifyContent: "center", width: "100%", paddingY: 1.5, color: 'primary.main', textTransform: "none" }}>
                   {displayedRows.length > 0 ? "View All Teachers" : "Go to Teachers Page"}
                </Button>
            </Link>
        </TableContainer>
    );
};

export default StaticTable;
const LoadingTable = ({ columns, height }) => {
    return (
      <TableRow>
        <TableCell
          colSpan={columns.length + 2}
          sx={{
            height: height,
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
        >
          <CircularProgress />
        </TableCell>
      </TableRow>
    );
  };
  const EmptyTable = ({ columns, emptyTitle, emptySubTitle }) => {
    return (
      <TableRow>
        <TableCell
          colSpan={columns.length + 2}
          sx={{
            height: '350px',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Box sx={{ width: '100%', height: '200px' }}>
              <img
                src={EmptyDataImage}
                alt="empty"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Typography variant="h6" gutterBottom>
              {emptyTitle}
            </Typography>
            <Typography variant="body2">{emptySubTitle}</Typography>
          </div>
        </TableCell>
      </TableRow>
    );
  };