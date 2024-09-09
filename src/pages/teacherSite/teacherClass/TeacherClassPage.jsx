import React from "react";
import FormComponent from "../../../components/common/FormComponent";
import CardDetail from "../../../components/teacherSite/CardDetail"; // import your card component
import { Grid2 } from "@mui/material";
import classIcon from "../../../assets/icon/list-class.jpg";

// data
const classesData = [
  { id: 1, className: "E.109", day: "Monday", subject: "Math", students: 52, time: "7:00 - 9:00" },
  { id: 2, className: "E.110", day: "Tuesday", subject: "Science", students: 45, time: "9:00 - 11:00" },
  { id: 3, className: "E.111", day: "Wednesday", subject: "History", students: 30, time: "10:00 - 12:00" },
  { id: 4, className: "E.112", day: "Thursday", subject: "Geography", students: 40, time: "11:00 - 1:00" },
  { id: 5, className: "E.113", day: "Friday", subject: "Biology", students: 25, time: "1:00 - 3:00" },
  { id: 6, className: "E.109", day: "Monday", subject: "Math", students: 52, time: "7:00 - 9:00" },
  { id: 7, className: "E.110", day: "Tuesday", subject: "Science", students: 45, time: "9:00 - 11:00" },

];

//colors for card
const colors = ["#D1E9F6", "#FFF4D2","#FFDBA4", "#E3F2C1","#F1D3CE" ,"#D2E0FB", ];

function TeacherClassPage() {
  return (
    <>
      <FormComponent title="Class Today" subTitle="These are 7 classes">
        <Grid2 container spacing={2}>
          {classesData.map((classData, index) => {
            // Random color
            const cardColor = colors[index % colors.length];
            // card
            return (
              <Grid2 item  size={{ xs: 12, md: 6 }} key={classData.id}>
                <CardDetail
                  className={classData.className}
                  day={classData.day}
                  subject={classData.subject}
                  students={classData.students}
                  time={classData.time}
                  classIcon={classIcon}
                  randomColor={cardColor} // Pass the determined color
                />
              </Grid2>
            );
          })}
        </Grid2>
      </FormComponent>
    </>
  );
}

export default TeacherClassPage;
