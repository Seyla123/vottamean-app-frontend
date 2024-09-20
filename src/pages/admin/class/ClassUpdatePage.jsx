import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import CardComponent from "../../../components/common/CardComponent";
import { Typography, Stack, TextField, Alert } from "@mui/material";
import FormComponent from "../../../components/common/FormComponent";
import ButtonContainer from "../../../components/common/ButtonContainer";
import {
  useGetClassesByIdQuery,
  useUpdateClassesDataMutation,
} from "../../../services/classApi";
import { resetFormData, updateFormData } from "../../../store/slices/formSlice";

function ClassUpdatePage() {
  const { id } = useParams(); // Extract ID from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch class data by ID
  const { data, isLoading, fetchError } = useGetClassesByIdQuery(id);

  // Local state for form data, initialized with the fetched class data
  const [formData, setFormData] = useState({
    class_name: "",
    description: "",
  });

  // Mutation hook for updating class data
  const [updateClassesData, { isUpdating,  updateError }] = useUpdateClassesDataMutation();

  // Update local state when class data is fetched
  useEffect(() => {
    if (data && data.data) {
      setFormData({
        class_name: data.data.class_name || "",
        description: data.data.description || "",
      });
    }
      dispatch(resetFormData());
    }, [data], [dispatch]);

  // Handle input change and update local state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);  
    console.log(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle cancel button click
  const onClickBack = () => {
    navigate("/admin/classes");
  };
  // Handle update (submit) button click
  const onSubmit = async () => {
    console.log(formData);
    try {
      await updateClassesData( id, formData ).unwrap();
      navigate("/admin/classes");
    } catch (error) {
      console.error("Update failed", error);
    }
  };
  // Loading and error handling for fetching class data
  if (isLoading) return <div>Loading class data...</div>;
  if (fetchError) {
    return (
      <Alert severity="error">
        {fetchError?.data?.message || "Error loading class data"}
      </Alert>
    );
  }
  // Loading and error handling for updating class data
  if (isUpdating) return <div>Updating class data...</div>;
  if (updateError) {
    return (
      <Alert severity="error">
        {updateError?.data?.message || "Error updating class data"}
      </Alert>
    );
  }

  return (
    <FormComponent title={"Update Class"} subTitle={"Please fill class information"}>
      <CardComponent title={"Class Information"}>
        <Stack>
          <Typography variant="body1">Class's Name</Typography>
          <TextField
            name="class_name"
            value={formData.class_name}
            onChange={handleInputChange}
            placeholder="Class name"
          />
        </Stack>
        <Stack>
          <Typography variant="body1">Description</Typography>
          <TextField
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            minRows={5}
            placeholder="Description"
          />
        </Stack>
        <ButtonContainer
          leftBtn={onClickBack}
          rightBtn={onSubmit}
          leftBtnTitle={"Cancel"}
          rightBtnTitle={"Update"}
        />
      </CardComponent>
    </FormComponent>
  );
}

export default ClassUpdatePage;
