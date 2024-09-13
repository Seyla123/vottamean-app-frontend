import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { shadow } from "../../styles/global";

const ShortListTable = ({ data }) => {
    return (
        <TableContainer sx={{ ...shadow }} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>All Students</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "center",
                                }}
                            >
                                <Avatar alt={item.name} src={item.avatar} />
                                <Box>
                                    <Typography variant="body2">
                                        {item.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {item.email}
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ShortListTable;
