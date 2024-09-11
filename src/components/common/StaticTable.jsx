import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useMediaQuery,
} from "@mui/material";

const StaticTable = ({ columns, data, hideColumns = [] }) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map(
                            (column) =>
                                !hideColumns.includes(column.id) &&
                                (!isMobile || !column.hideOnMobile) && (
                                    <TableCell key={column.id}>
                                        {column.label}
                                    </TableCell>
                                )
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map(
                                (column) =>
                                    !hideColumns.includes(column.id) &&
                                    (!isMobile || !column.hideOnMobile) && (
                                        <TableCell key={column.id}>
                                            {row[column.id]}
                                        </TableCell>
                                    )
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StaticTable;
