import React from "react";
import { Card, Box, CardContent, Typography, Avatar } from "@mui/material";
import ceoGoogleProfile from "../../assets/images/ceo-google-profile.png";
import googleLogo from "../../assets/images/Google_logo.svg.webp";

const TestimonialCard = () => (
    <Card sx={{ padding: 1, borderRadius: "16px", height: "100%" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box component="img" src={googleLogo} sx={imgStyle} />
            <Typography variant="body1" color="text.secondary">
                WaveTrack has revolutionized the way we manage our workforce. Highly recommended!
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
                <Avatar src={ceoGoogleProfile} alt="Sundar Pichai" />
                <Box>
                    <Typography variant="subtitle2" fontWeight={600}>Sundar Pichai</Typography>
                    <Typography variant="caption">Google - CEO</Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const imgStyle = {
    width: "100px",
    height: "40px",
    padding: "4px 24px",
    borderRadius: '50px',
    bgcolor: "#F3F3F5",
    objectFit: "contain",
    objectPosition: "center",
};

export default TestimonialCard;