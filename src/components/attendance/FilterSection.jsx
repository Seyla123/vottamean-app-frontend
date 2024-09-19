// FilterSection.js
import React from "react";
import { Box } from "@mui/material";
import FilterComponent from "../../components/common/FilterComponent";

const FilterSection = ({
  subjectValue, 
  classValue, 
  filterValue, 
  subjects, 
  classes, 
  filter,
  handleSubjectChange, 
  handleClassChange, 
  handleFilterChange
}) => (
  <Box sx={filterBoxStyle}>
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignSelf: "start" }}>
      <FilterComponent
        value={subjectValue}
        data={subjects}
        onChange={handleSubjectChange}
        placeholder={"By Subject"}
      />
      <FilterComponent
        value={classValue}
        data={classes}
        onChange={handleClassChange}
        placeholder={"By Class"}
      />
    </Box>
    <Box alignSelf={"end"}>
      <FilterComponent
        value={filterValue}
        data={filter}
        onChange={handleFilterChange}
        placeholder={"Filter"}
      />
    </Box>
  </Box>
);

export default FilterSection;

const filterBoxStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 4,
  width: "100%",
  gap: 2,
};
