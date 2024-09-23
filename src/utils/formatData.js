// Transform API response into table data format
export const transformAttendanceData = (apiResponse) => {
    return apiResponse.map((item) => ({
      id: item.student_id,
      attendance_id: item.attendance_id,
      name: `${item.Student.Info.first_name} ${item.Student.Info.last_name}`, // Combine first and last name
      time: `${item.Sessions.Period.start_time.slice(0, 5)} - ${item.Sessions.Period.end_time.slice(0, 5)}`, // Time range
      subjectId: item.Sessions.Subject.id,
      subject: item.Sessions.Subject.name, // Subject name
      classId: item.Student.Class.id,
      class: item.Student.Class.class_name, // Class name
      address: item.Student.Info.address, // Address
      date:item.date,// Date
      status_id :item.status_id, // Status
      status: item.Status.status.charAt(0).toUpperCase() + item.Status.status.slice(1), // Capitalize status
      img:item.Student.Info.photo, // Photo
    }));
  };

// Calculation to get period of hour
export function calculatePeriod(startTime, endTime) {
  const start = new Date(`1970-01-01T${startTime}Z`);
  const end = new Date(`1970-01-01T${endTime}Z`);
  const diff = Math.abs(end - start);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

// Format into standard hour AM or PM
export function formatTimeTo12Hour(timeString) {
  const [hourStr, minuteStr] = timeString.split(':');
  let hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${formattedMinutes} ${ampm}`;
}

export const transformSessionsData = (apiResponse) => {
  return apiResponse.map((item) => ({
    id : item.session_id , 
    teacher : `${item.Teacher.Info.first_name} ${item.Teacher.Info.last_name}`,
    class : item.Class.class_name,
    subject : item.Subject.name,
    time : calculatePeriod(item.Period.start_time, item.Period.end_time),
    day : item.DayOfWeek.day
}));
}

// Teacher list format
 export function teacherData (teachers){
  return teachers.map((teacher) => ({
    id: teacher.teacher_id,
    name: `${teacher.Info.first_name} ${teacher.Info.last_name}`,
    gender: teacher.Info.gender,
    email: teacher.User.email,
    phoneNumber: teacher.Info.phone_number,
  }));
};  
