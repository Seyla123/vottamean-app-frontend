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
    date: item.date, // Date
    status_id: item.status_id, // Status
    status:
      item.Status.status.charAt(0).toUpperCase() + item.Status.status.slice(1), // Capitalize status
    img: item.Student.Info.photo, // Photo
  }));
};
//
export const formatAttendanceData = (apiResponse) => {
  const teacherFullName = `${apiResponse.Sessions.Teacher.Info.first_name} ${apiResponse.Sessions.Teacher.Info.last_name}`;
  const studentFullName = `${apiResponse.Student.Info.first_name} ${apiResponse.Student.Info.last_name}`;
  const teacherImg =
    apiResponse.Sessions.Teacher.User.photo ||
    'https://i.ibb.co/0y9GkFm/placeholder.png';
  const studentImg =
    apiResponse.Student.Info.photo ||
    'https://i.ibb.co/0y9GkFm/placeholder.png';
  // Attendance Information
  const attendance = {
    "Student's Name": studentFullName || 'N/A',
    Class: apiResponse.Sessions.Class?.class_name ?? 'N/A',
    Subject: apiResponse.Sessions.Subject.name ?? 'N/A',
    Time: `${apiResponse.Sessions.Period.start_time ?? 'N/A'} - ${apiResponse.Sessions.Period.end_time ?? 'N/A'}`,
    Period: `${apiResponse.Sessions.Period.end_time ?? 'N/A'} - ${apiResponse.Sessions.Period.start_time ?? 'N/A'}`,
    "Teacher's Name": teacherFullName || 'N/A',
    Status: apiResponse.Status.status ?? 'N/A',
    Date: apiResponse.date ?? 'N/A',
  };

  // Student Information
  const student = {
    'Student ID': apiResponse.student_id ?? 'N/A',
    Name: studentFullName || 'N/A',
    Class: apiResponse.Sessions.Class?.class_name ?? 'N/A',
    Age: apiResponse.Student.Info.dob
      ? new Date().getFullYear() -
        new Date(apiResponse.Student.Info.dob).getFullYear()
      : 'N/A',
    Gender: apiResponse.Student.Info.gender ?? 'N/A',
    'Date of Birth': apiResponse.Student.Info.dob ?? 'N/A',
    Phone: apiResponse.Student.guardian_phone_number ?? 'N/A',
    Email: apiResponse.Student.guardian_email ?? 'N/A',
    Address: apiResponse.Student.Info.address ?? 'N/A',
  };

  // Teacher Information
  const teacher = {
    'Teacher ID': apiResponse.Sessions.Teacher.teacher_id ?? 'N/A',
    Name: teacherFullName || 'N/A',
    Age: apiResponse.Sessions.Teacher.Info.dob
      ? new Date().getFullYear() -
        new Date(apiResponse.Sessions.Teacher.Info.dob).getFullYear()
      : 'N/A',
    Gender: apiResponse.Sessions.Teacher.Info.gender ?? 'N/A',
    'Date of Birth': apiResponse.Sessions.Teacher.Info.dob ?? 'N/A',
    Phone: apiResponse.Sessions.Teacher.Info.phone_number ?? 'N/A',
    Email: apiResponse.Sessions.Teacher.User.email ?? 'N/A',
    Address: apiResponse.Sessions.Teacher.Info.address ?? 'N/A',
  };

  // Guardian Information
  const guardian = {
    "Guardian's Name": apiResponse.Student.guardian_name ?? 'N/A',
    Relationship: apiResponse.Student.guardian_relationship ?? 'N/A',
    Phone: apiResponse.Student.guardian_phone_number ?? 'N/A',
    Email: apiResponse.Student.guardian_email ?? 'N/A',
  };
  return { attendance, student, teacher, guardian, teacherImg, studentImg };
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
    id: item.session_id,
    teacher: `${item.Teacher.Info.first_name} ${item.Teacher.Info.last_name}`,
    class: item.Class.class_name,
    subject: item.Subject.name,
    time: calculatePeriod(item.Period.start_time, item.Period.end_time),
    day: item.DayOfWeek.day,
  }));
};

// Teacher list format
export function teacherData(teachers) {
  return teachers.map((teacher) => ({
    id: teacher.teacher_id,
    name: `${teacher.Info.first_name} ${teacher.Info.last_name}`,
    gender: teacher.Info.gender,
    email: teacher.User.email,
    phoneNumber: teacher.Info.phone_number,
  }));
}
// Format teacher detail
export function formatTeacherDetail(teacherData) {
  if (!teacherData || !teacherData.data || !teacherData.data.Info) {
    return null;
  }
  const { email } = teacherData.data.User;
  const { first_name, last_name, gender, dob, phone_number, address } = teacherData.data.Info;
  const formattedData = [
    { label: 'Teacher ID', value: teacherData.data.teacher_id },
    { label: 'Teacher Name', value: `${first_name} ${last_name}` },
    { label: 'Gender', value: gender },
    { label: 'Date of Birth', value: dob },
    { label: 'Phone Number', value: phone_number },
    { label: 'Email', value: email },
    { label: 'Street Address', value: address },
  ];
  return formattedData;
}

// Utility: Format Date to a more readable format ("DD/MM/YYYY")
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Utility: Ensure phone number formatting
export function formatPhoneNumber(phoneNumber) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
}

// Utility:g Capitalize the first letter of each word
export function capitalize(name) {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

// Transform User Profile Data
export const transformUserProfile = (user) => {
  const info = user?.data?.adminProfile?.Info;

  if (!info) return {};

  const fullName = `${info.first_name} ${info.last_name}`;
  return {
    'Full Name': capitalize(fullName),
    Age: info.dob
      ? new Date().getFullYear() - new Date(info.dob).getFullYear()
      : 'N/A',
    Gender: info.gender || 'N/A',
    'Date Of Birth': info.dob ? formatDate(info.dob) : 'N/A',
    'Phone Number': formatPhoneNumber(info.phone_number),
    Email: user.data.email,
    Address: info.address || 'N/A',
  };
};

// Transform School Profile Data
export const transformSchoolProfile = (user) => {
  const school = user?.data?.adminProfile?.Schools?.[0];

  if (!school) return {};

  return {
    'School Name': school.school_name || 'N/A',
    'School Phone Number':
      formatPhoneNumber(school.school_phone_number) || 'N/A',
    'School Address': school.school_address || 'N/A',
  };
};

// Combined User and School Profile Data
export const getUserProfileData = (user) => {
  const userProfile = transformUserProfile(user);
  const schoolProfile = transformSchoolProfile(user);
  const photo = user?.data?.adminProfile?.Info?.photo;

  return {
    userProfile,
    schoolProfile,
    photo: photo || null,
  };
};

// Combined User Profile Data for Updates (without formatted DOB)
export const getUserProfileUpdateData = (user) => {
  const info = user?.data?.adminProfile?.Info;

  if (!info) return {};

  return {
    // user_id: user.data.adminProfile.user_id,
    // info_id: user.data.adminProfile.info_id,
    photo: info.photo,
    first_name: info.first_name,
    last_name: info.last_name,
    gender: info.gender || '',
    dob: info.dob || '',
    phone_number: info.phone_number,
    address: info.address,
  };
};

// Transform School Data for Updates
export const getSchoolData = (user) => {
  const school = user?.data?.adminProfile?.Schools?.[0];

  if (!school) return {};

  return {
    info_id: user.data.adminProfile.info_id,
    school_id: school.school_id,
    school_name: school.school_name,
    school_phone_number: school.school_phone_number,
    school_address: school.school_address,
  };
};

// Function for Formatted Student Data
export function studentsData(student) {
  return {
    id: student.student_id,
    name: `${student.Info.first_name || 'N/A'} ${student.Info.last_name || 'N/A'}`,
    class: student.Class.class_name || 'N/A',
    age: student.Info.dob
      ? new Date().getFullYear() - new Date(student.Info.dob).getFullYear()
      : 'N/A',
    gender: student.Info.gender || 'N/A',
    'Date of Birth': student.Info.dob ? formatDate(student.Info.dob) : 'N/A',
    phone: student.Info.phone_number || 'N/A',
    email: student.guardian_email || 'N/A',
    address: student.Info.address || 'N/A',
  };
}

// GuardianData Formatted
export function guardianData(guardian) {
  return {
    "Guardian's Name": guardian.guardian_name || 'N/A',
    Relationship: guardian.guardian_relationship || 'N/A',
    Phone: formatPhoneNumber(guardian.guardian_phone_number),
    Email: guardian.guardian_email,
  };
}

// Combined User and School Profile Data
export const StudentProfile = (student) => {
  // const info = student.Info;
  const studentProfile = studentsData(student);
  const guardianProfile = guardianData(student);

  return {
    studentProfile,
    guardianProfile,
    // img: info.photo,
  };
};

// Formatting Students List for Data Table
export function formatStudentsList(students) {
  return students.map((student) => studentsData(student));
}
