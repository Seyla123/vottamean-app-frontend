import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardComponent from "../../../components/common/CardComponent";
import { Typography, Stack, TextField, Alert } from "@mui/material";
import { fieldContainer } from "../../../styles/authStyle";
import FormComponent from "../../../components/common/FormComponent";
import ButtonContainer from "../../../components/common/ButtonContainer";
import { useUpdateClassesDataMutation, useGetClassesDataQuery } from "../../../services/classApi";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function ClassUpdatePage() {
    const { id } = useParams();
    const { data, fetchError, isLoading } = useGetClassesDataQuery(id);
    const [updateClassesData] = useUpdateClassesDataMutation();
    const navigate = useNavigate(); // Initialize navigate

    const [formData, setFormData] = useState({
        class_name: '',
        description: '',
    });

    // Extract the class Data
    const extractClassData = (data) => {
        if (data && data.data) {
            const { class_id, class_name, description } = data.data;
            return { class_id, class_name, description };
        }
        console.log(data)
        return null; // Return null if data is not valid
    };
    
    const classData = extractClassData(data);
    
    useEffect(() => {
        if (classData) {
            setFormData({
                class_name: classData.class_name || '', // Default to an empty string
                description: classData.description || '', // Default to an empty string
            });
        }
    }, [classData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onClickBack = () => {
        navigate('/admin/classes'); 
    }

    const onClickNext = async () => {
        try {
            await updateClassesData({ id, ...formData }).unwrap();
            console.log('Update successful');
            // Optionally, redirect or provide success feedback
            navigate('/classes'); // Redirect to the classes page or wherever appropriate
        } catch (error) {
            console.error('Update failed', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (fetchError) {
        return (
            <Alert severity="error">
                {fetchError?.data?.message || 'Error loading class data'}
            </Alert>
        );
    }

    return (
        <>
            <FormComponent title={"Update Class"} subTitle={"Please fill class information"}>
                <CardComponent title={"Class Information"}>
                    <Stack sx={fieldContainer}>
                        <Typography variant="body1">Class&apos;s Name</Typography>
                        <TextField
                            name="class_name"
                            value={formData.class_name} // Corrected to use class_name
                            onChange={handleInputChange}
                            placeholder="Class name"
                        />
                    </Stack>
                    <Stack sx={fieldContainer}>
                        <Typography variant="body1">Description</Typography>
                        <TextField
                            name="description"
                            value={formData.description} // Corrected to use description
                            onChange={handleInputChange}
                            multiline
                            minRows={5}
                            placeholder="Description"
                        />
                    </Stack>
                    <ButtonContainer
                        leftBtn={onClickBack}
                        rightBtn={onClickNext}
                        leftBtnTitle={'Cancel'}
                        rightBtnTitle={'Update'}
                    />
                </CardComponent>
            </FormComponent>
        </>
    );
}

export default ClassUpdatePage;