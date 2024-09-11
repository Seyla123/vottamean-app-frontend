import React from "react";
import { Typography, Box, CardContent, Chip, Grid } from "@mui/material";
import FormComponent from "../../../components/common/FormComponent";
import DataTable from "../../../components/common/DataTable";
import { CheckCheckIcon, UsersIcon } from "lucide-react";
import WelcomeImage from "../../../assets/images/welcome-illustration.png";
import ShortListTable from "../../../components/common/ShortListTable";
import { shadow } from "../../../styles/global";
import { AspectRatio } from "@mui/icons-material";

const teacherArr = [
    {
        id: 1,
        fullname: "Sokha Seng",
        gender: "Female",
        email: "sokha.seng@example.com",
        phonenumber: "012 345 678",
    },
    {
        id: 2,
        fullname: "Vuthy Vong",
        gender: "Male",
        email: "vuthy.vong@example.com",
        phonenumber: "098 765 432",
    },
    {
        id: 3,
        fullname: "Sopheaktra Sorn",
        gender: "Male",
        email: "sopheaktra.sorn@example.com",
        phonenumber: "012 987 654",
    },
    {
        id: 4,
        fullname: "Sovannary Seng",
        gender: "Female",
        email: "sovannary.seng@example.com",
        phonenumber: "098 123 456",
    },
];
const studentArr = [
    {
        id: 1,
        name: "Sokunthea Chhorn",
        email: "sokunthea.chhorn@example.com",
    },
    {
        id: 2,
        name: "Sokha Sorn",
        email: "sokha.sorn@example.com",
    },
    {
        id: 3,
        name: "Sovannarith Seng",
        email: "sovannarith.seng@example.com",
    },
];

const columnDefinitions = [
    { id: "fullname", label: "Full Name" },
    { id: "gender", label: "Gender" },
    { id: "email", label: "Email" },
    // { id: "phonenumber", label: "Phone Number" },
];

const statusCard = [
    {
        id: 1,
        title: "Total Teachers",
        amount: "1,248",
        icon: <UsersIcon />,
    },
    {
        id: 2,
        title: "Total Students",
        amount: "2,500",
        icon: <CheckCheckIcon />,
    },
];

function dashboard() {
    const handleEdit = () => {
        console.log("HandleEdit");
    };
    const handleDelete = () => {
        console.log("HandleDelete");
    };
    const handleSelectedDelete = () => {
        console.log("HandleSelectedDelete");
    };
    return (
        <FormComponent title="Dashboard Overview" subTitle="All Data">
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                    <GreetingCard />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <StatusCard />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                    <DataTable
                        rows={teacherArr}
                        columns={columnDefinitions}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onSelectedDelete={handleSelectedDelete}
                        hideColumns={["email", "phonenumber"]}
                        emptyTitle="No data available"
                        emptySubTitle="Add some data to see it in the table"
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <ShortListTable data={studentArr} />
                </Grid>
            </Grid>
        </FormComponent>
    );
}

const GreetingCard = () => {
    return (
        <CardContent
            sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", lg: "row" },
                alignItems: "center",
                gap: 2,
                p: { xs: 4, sm: 6 },
                ...shadow,
            }}
        >
            <Box>
                <Typography variant="h3">Welcome Back 👋</Typography>
                <Typography variant="body1">Sokha Seng</Typography>
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "40%" } }}>
                <img
                    src={WelcomeImage}
                    alt={"Welcome Image"}
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            </Box>
        </CardContent>
    );
};

const StatusCard = () => {
    return (
        <CardContent>
            {statusCard.map((item) => (
                <Grid container key={item.id}>
                    <Grid item>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box>{item.icon}</Box>
                            <Box>
                                <Typography variant="h6">
                                    {item.title}
                                </Typography>
                                <Typography variant="body1">
                                    {item.amount}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            ))}
        </CardContent>
    );
};

export default dashboard;
