import { useState } from 'react';
import HeaderTitle from "./HeaderTitle";
import GoBackButton from "../common/GoBackButton";
import schoolIcon from "../../assets/icon/schoolIcon.png";
import { Box, TextField, Typography, Skeleton } from "@mui/material";
import { container, fieldContainer } from "./authStyle";

function RegisterSchoolForm({ onClickBack, children }) {
    // State to manage image loading
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Box sx={container}>
            {/* header title */}
            <Box component={'div'} sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 4 } }} >
                <GoBackButton handleOnClick={onClickBack} />
                <HeaderTitle
                    title={"Introduce Your School to WaveTrack"}
                    subTitle={"Provide the information to begin your journey."}
                    center
                >

                    {/* image container  */}
                    {/* Stack for image loading skeleton */}
                    {isLoading && (
                        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
                            <Skeleton variant="circular" width={100} height={100} />
                        </Box>
                    )}

                    {/* Image box */}
                    <Box
                        maxWidth={{ xs: "100px", sm: "100px" }}
                        component={'img'}
                        src={schoolIcon}
                        sx={{
                            display: isLoading ? "none" : "flex",
                            alignSelf: "center"
                        }}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)} // in case of error, hide Skeleton
                    />

                </HeaderTitle>
            </Box>

            {/* form container */}
            <Box sx={container} >
                 {/* school name input container */}
                 <Box sx={fieldContainer}>
                    <Typography variant="body1">School&apos;s Name</Typography>
                    <TextField placeholder="school&apos;s name" />
                </Box>
                {/* phone number input container */}
                <Box sx={fieldContainer}>
                    <Typography variant="body1">Phone Number</Typography>
                    <TextField placeholder="phone number" />
                </Box>
                {/* address input container */}
                <Box sx={fieldContainer}>
                    <Typography variant="body1">Address</Typography>
                    <TextField
                        multiline
                        minRows={5}
                        placeholder="Phnom Penh, Street 210, ..."
                    />
                </Box>
                {children}
            </Box>
        </Box>
    );
}

export default RegisterSchoolForm;
