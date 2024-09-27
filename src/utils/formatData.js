// Utility: Capitalize the first letter of each word
export const capitalize = (name) =>
  name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

// Utility: Format Date to a more readable format ("DD/MM/YYYY")
export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

// Utility: Ensure phone number formatting
export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phoneNumber;
};

// Utility: Get user age
export const getAge = (dob) => {
  const birthDate = new Date(dob);
  return new Date().getFullYear() - birthDate.getFullYear();
};

// Utility: Calculation to get period of hour
export const calculatePeriod = (startTime, endTime) => {
  const diff = Math.abs(
    new Date(`1970-01-01T${endTime}Z`) - new Date(`1970-01-01T${startTime}Z`),
  );
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

// Utility: Format into standard hour AM or PM
export const formatTimeTo12Hour = (timeString) => {
  let [hours, minutes] = timeString.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
};

// Utility: Get Full Name from API response
export const getFullName = (info) =>
  info ? capitalize(`${info.first_name} ${info.last_name}`) : 'N/A';

// Transform API response into table data format
export const transformAttendanceData = (apiResponse) =>
  apiResponse.map((item) => ({
    id: item.student_id,
    attendance_id: item.attendance_id,
    name: getFullName(item.Student.Info),
    time: `${item.Sessions.Period.start_time.slice(0, 5)} - ${item.Sessions.Period.end_time.slice(0, 5)}`,
    subjectId: item.Sessions.Subject.id,
    subject: item.Sessions.Subject.name,
    classId: item.Student.Class.id,
    class: item.Student.Class.class_name,
    address: item.Student.Info.address,
    date: item.date,
    status_id: item.status_id,
    status: capitalize(item.Status.status),
    img: item.Student.Info.photo,
  }));

// Format attendance data detail
export const formatAttendanceData = (apiResponse) => {
  const { Sessions, Status, Student } = apiResponse;
  const teacherInfo = Sessions.Teacher.Info;
  const studentInfo = Student.Info;

  // Attendance Information
  const attendance = {
    "Student's Name": getFullName(studentInfo),
    Class: Sessions.Class?.class_name ?? 'N/A',
    Subject: Sessions.Subject.name ?? 'N/A',
    Time: `${formatTimeTo12Hour(Sessions.Period.start_time)} - ${formatTimeTo12Hour(Sessions.Period.end_time)}`,
    Period: calculatePeriod(
      Sessions.Period.start_time,
      Sessions.Period.end_time,
    ),
    "Teacher's Name": getFullName(teacherInfo),
    Status: Status.status ?? 'N/A',
    Date: apiResponse.date ?? 'N/A',
  };

  // Student Information
  const student = {
    'Student ID': Student.student_id ?? 'N/A',
    Name: getFullName(studentInfo),
    Class: Sessions.Class?.class_name ?? 'N/A',
    Age: getAge(studentInfo.dob),
    Gender: studentInfo.gender ?? 'N/A',
    'Date of Birth': studentInfo.dob ?? 'N/A',
    Phone: Student.guardian_phone_number ?? 'N/A',
    Email: Student.guardian_email ?? 'N/A',
    Address: studentInfo.address ?? 'N/A',
  };

  // Teacher Information
  const teacher = {
    'Teacher ID': Sessions.Teacher.teacher_id ?? 'N/A',
    Name: getFullName(teacherInfo),
    Age: getAge(teacherInfo.dob),
    Gender: teacherInfo.gender ?? 'N/A',
    'Date of Birth': teacherInfo.dob ?? 'N/A',
    Phone: teacherInfo.phone_number ?? 'N/A',
    Email: teacherInfo.email ?? 'N/A',
    Address: teacherInfo.address ?? 'N/A',
  };

  // Guardian Information
  const guardian = {
    "Guardian's Name": Student.guardian_name ?? 'N/A',
    Relationship: Student.guardian_relationship ?? 'N/A',
    Phone: Student.guardian_phone_number ?? 'N/A',
    Email: Student.guardian_email ?? 'N/A',
  };

  return {
    attendance,
    student,
    teacher,
    guardian,
    teacherImg: teacherInfo.photo,
    studentImg: studentInfo.photo,
  };
};

// Transform Sessions data
export const transformSessionsData = (apiResponse) =>
  apiResponse.map((item) => ({
    id: item.session_id,
    teacher: getFullName(item.Teacher.Info),
    class: item.Class.class_name,
    subject: item.Subject.name,
    time: calculatePeriod(item.Period.start_time, item.Period.end_time),
    day: item.DayOfWeek.day,
  }));

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
  const { first_name, last_name, gender, dob, phone_number, address } =
    teacherData.data.Info;
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

// Transform User Profile Data
export const transformUserProfile = (user) => {
  const info = user?.data?.adminProfile?.Info;

  if (!info) return {};

  return {
    'Full Name': getFullName(info),
    Age: getAge(info.dob) || 'N/A',
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
    user_id: user.data.adminProfile.user_id,
    info_id: user.data.adminProfile.info_id,
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
    school_address: school.school_address,
    school_phone_number: school.school_phone_number,
  };
};

// Function for Formatted Student Data
export function studentsData(student) {
  return {
    id: student.student_id,
    name: `${student.Info.first_name || 'N/A'} ${student.Info.last_name || 'N/A'}`,
    class: student.Class.class_name || 'N/A',
    age: getAge(student.info.dob) || 'N/A',
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

// Transform filter subject for attendance report table
export const transformedFilterSubjects = (subjects) => {
  return subjects.map((subject) => ({
    value: subject.subject_id,
    label: subject.name,
  }));
};

// Transform filter class for attendance report table
export const transformedFilterClasses = (classes) => {
  return classes.map((item) => ({
    value: item.class_id,
    label: item.class_name,
  }));
};
