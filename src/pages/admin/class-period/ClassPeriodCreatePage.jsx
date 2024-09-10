import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Typography, Box } from "@mui/material";
import CardComponent from "../../../components/common/CardComponent";
import FormComponent from "../../../components/common/FormComponent";
import ButtonContainer from "../../../components/common/ButtonContainer";
import { containerInput, timeInput } from "../../../styles/classPeriod";
import { useNavigate } from "react-router-dom";


function ClassPeriodCreatePage() {
  // form valiadation
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();


  const onClickNext = () => {
    if (!startTime || !endTime) {
      setError(true)
    } else {
      navigate(`/dashboard/class-periods`);
    }
  };

  return (
    <>
      <FormComponent
        title={"Add Class Period"}
        subTitle={"Please Fill Class Period Information"}
      >
        <CardComponent title={"Class Period Information"}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["TimePicker", "TimePicker", "TimePicker"]}
            >
              <Box sx={containerInput}>
                <Box>
                  <Typography color={!startTime && error ? "red" : "inherit"}>
                    Start time
                  </Typography>
                  <TimePicker
                    sx={timeInput}
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    slotProps={{
                      textField: {
                        placeholder: "select",
                        helperText:
                          !startTime && error ? "Start time is required" : "",
                        error: !startTime && error,
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography color={!endTime && error ? "red" : "inherit"}>
                    End time
                  </Typography>
                  <TimePicker
                    sx={timeInput}
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    slotProps={{
                      textField: {
                        placeholder: "select",
                        helperText:
                          !endTime && error ? "End time is required" : "",
                        error: !endTime && error,
                        margin: "none",
                        FormHelperTextProps: {},
                      },
                    }}
                  />
                </Box>
              </Box>
            </DemoContainer>
          </LocalizationProvider>
          {/* Button Container  */}
          <ButtonContainer
            rightBtn={onClickNext}
            leftBtnTitle={"Cancel"}
            rightBtnTitle={"Add Period"}
          />
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default ClassPeriodCreatePage;
