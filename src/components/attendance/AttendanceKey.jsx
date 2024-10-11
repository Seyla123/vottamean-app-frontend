import { Stack , Typography } from '@mui/material';

function AttendanceKey() {
  return (
    <Stack gap={0} >
        <Stack>
        <Typography variant='body1' sx={{ fontSize: "0.7rem" , fontWeight: "500"}}>
        Attendance Key :
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.6rem" }}>
            ✓ : Present (Student was present)
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.6rem" }}>
            A : Absent (Student did not attend)
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.6rem" }}>
            P : Permission (Student had permission to be absent)
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.6rem" }}>
            L : Late (Student arrived late)
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.6rem" }}>
            - : No attendance recorded
        </Typography>
        </Stack>
    </Stack>
  )
}

export default AttendanceKey