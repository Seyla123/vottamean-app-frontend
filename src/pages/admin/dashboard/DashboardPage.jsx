import React from "react";
import { Typography, Box, CardContent, Chip, Grid } from "@mui/material";
import FormComponent from "../../../components/common/FormComponent";
import { GraduationCap, UsersIcon } from "lucide-react";
import WelcomeHandImage from "../../../assets/images/welcome-illustration.png";
import ShortListTable from "../../../components/common/ShortListTable";
import { shadow } from "../../../styles/global";
import StaticTable from "../../../components/common/StaticTable";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
        icon: <GraduationCap />,
    },
];

function dashboard() {
    return (
        <FormComponent title="Dashboard Overview" subTitle="All Data">
            <Box>Input</Box>
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
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                background: "#6499E9",
                color: "white",
                height: { xs: "120px", sm: "240px" },
                overflow: "hidden",
                p: { xs: 2, sm: 4 },
                ...shadow,
            }}
        >
            <Box sx={{ position: "relative", zIndex: 2 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "24px", sm: "32px", md: "48px" },
                        textShadow: "1px 1px 10px #344C64",
                    }}
                >
                    Welcome Back 👋
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ textShadow: "1px 1px 5px #344C64" }}
                >
                    Sokha Seng
                </Typography>
            </Box>
            <Box
                sx={{
                    width: {
                        xs: "200px",
                        sm: "240px",
                        lg: "300px",
                        position: "absolute",
                        bottom: -80,
                        right: 4,
                    },
                }}
            >
                <img
                    src={WelcomeHandImage}
                    alt={"Welcome Image"}
                    style={{
                        width: "100%",
                        height: "100%",
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
