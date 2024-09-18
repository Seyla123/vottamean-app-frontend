// Transform API response into table data format
export const transformAttendanceData = (apiResponse) => {
    return apiResponse.map((item) => ({
      id: item.student_id,
      name: `${item.Student.Info.first_name} ${item.Student.Info.last_name}`, // Combine first and last name
      time: `${item.Sessions.Period.start_time.slice(0, 5)} - ${item.Sessions.Period.end_time.slice(0, 5)}`, // Time range
      subject: item.Sessions.Subject.name, // Subject name
      class: item.Student.Class.class_name, // Class name
      address: item.Student.Info.address, // Address
      status: item.Status.status.charAt(0).toUpperCase() + item.Status.status.slice(1), // Capitalize status
    }));
  };