import React from "react";
import { Typography, Box, CardContent, Chip, Grid } from "@mui/material";
import FormComponent from "../../../components/common/FormComponent";
import DataTable from "../../../components/common/DataTable";
import { CheckCheckIcon, UsersIcon } from "lucide-react";
import WelcomeImage from "../../../assets/images/welcome-illustration.png";
import ShortListTable from "../../../components/common/ShortListTable";
import { shadow } from "../../../styles/global";
import StaticTable from "../../../components/common/StaticTable";

const teacherArr = [
    {
        id: 1,
        name: "Sokha Seng",
        gender: "Female",
        email: "sokha.seng@example.com",
        phonenumber: "012 345 678",
    },
    {
        id: 2,
        name: "Vuthy Vong",
        gender: "Male",
        email: "vuthy.vong@example.com",
        phonenumber: "098 765 432",
    },
    {
        id: 3,
        name: "Sopheaktra Sorn",
        gender: "Male",
        email: "sopheaktra.sorn@example.com",
        phonenumber: "012 987 654",
    },
    {
        id: 4,
        name: "Sovannary Seng",
        gender: "Female",
        email: "sovannary.seng@example.com",
        phonenumber: "098 123 456",
    },
];

const teacherColumnArr = [
    { id: "name", label: "Full Name" },
    { id: "gender", label: "Gender" },
    { id: "email", label: "Email" },
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
                    <StaticTable
                        rows={teacherArr}
                        columns={teacherColumnArr}
                        hideColumns={["email"]}
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
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                p: { xs: 2, sm: 4 },
                ...shadow,
            }}
        >
            <Box>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "24px", sm: "32px", md: "48px" },
                    }}
                >
                    Welcome Back 👋
                </Typography>
                <Typography variant="body1">Sokha Seng</Typography>
            </Box>
            <Box sx={{ width: { xs: "200px", sm: "240px", lg: "300px" } }}>
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
        </Box>
    );
};

const StatusCard = () => {
    return (
        <Box
            sx={{
                p: { xs: 2, sm: 4 },
                ...shadow,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: 1,
            }}
        >
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
                            <Box
                                sx={{ ...shadow }}
                                width={40}
                                height={40}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                {item.icon}
                            </Box>
                            <Box>
                                <Typography variant="body2">
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
        </Box>
    );
};

export default dashboard;
