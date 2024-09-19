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