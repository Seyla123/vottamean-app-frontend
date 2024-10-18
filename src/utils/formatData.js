import dayjs, { Dayjs } from 'dayjs';
import {
  getProfileKey,
  capitalize,
  getFullName,
  getAge,
  formatDate,
  formatPhoneNumber,
  calculatePeriod,
  formatTimeTo12Hour,
} from './formatHelper';

// Transform API response into table data format
export const transformAttendanceData = (apiResponse) =>
  apiResponse.map((item) => ({
    attendanceId: item.attendance_id,
    studentId: item.student_id,
    className: item.Student.Class.class_name,
    name: getFullName(item.Student.Info),
    time: `${formatTimeTo12Hour(item.Sessions.Period.start_time)} - ${formatTimeTo12Hour(item.Sessions.Period.end_time)}`,
    subjectId: item.Sessions.Subject.subject_id,
    subject: item.Sessions.Subject.subject_name,
    address: item.Student.Info.address,
    statusId: item.status_id,
    status: capitalize(item.Status.status),
    img: item.Student.Info.photo,
    date: item.date,
    day: item.Sessions.DayOfWeek.day,
    teacherName:
      item.Sessions.Teacher.Info.first_name +
      ' ' +
      item.Sessions.Teacher.Info.last_name,
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
    Subject: Sessions.Subject.subject_name ?? 'N/A',
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
    subject: item.Subject.subject_name,
    duration: calculatePeriod(item.Period.start_time, item.Period.end_time),
    time: `${formatTimeTo12Hour(item.Period.start_time)} - ${formatTimeTo12Hour(item.Period.end_time)}`,
    day: item.DayOfWeek.day,
  }));

// Session detail format
export const formatSessionDetail = (sessionData) => {
  // Ensure sessionData is valid before accessing properties
  if (!sessionData) return {};

  const teacherInfo = sessionData.Teacher.Info;

  return {
    // 'Teach By': `${teacherInfo.first_name} ${teacherInfo.last_name}`,
    'Teach By': getFullName(teacherInfo),
    Time: `${sessionData.Period.start_time} - ${sessionData.Period.end_time}`,
    Period: calculatePeriod(
      sessionData.Period.start_time,
      sessionData.Period.end_time,
    ),
    Subject: sessionData.Subject.subject_name,
    Class: sessionData.Class.class_name,
    'Day of week': sessionData.DayOfWeek.day,
  };
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
    return []
  }
  const { email,emailVerified } = teacherData.data.User;
  const { 
    first_name,
    last_name, 
    gender, 
    dob, 
    phone_number, 
    address,
    photo
    } = teacherData.data.Info;

  return {
    fullName: `${first_name} ${last_name}`,
    email: email,
    phoneNumber: phone_number,
    dateOfBirth: dob,
    gender: gender,
    address: address,
    photo: photo,
    emailVerified: emailVerified
  };
}

// Transform User Profile Data
export const transformUserProfile = (user) => {
  const profileKey = getProfileKey(user.data.role);
  const profileInfo = user?.data[profileKey]?.Info;

  if (!profileInfo) return {};

  return {
    userRole: user.data.role,
    userId: user.data?.id || 'N/A',
    userName: getFullName(profileInfo),
    userGender: profileInfo.gender || 'Not specified',
    userDOB: formatDate(profileInfo.dob) || 'Not provided',
    userPhoneNumber:
      formatPhoneNumber(profileInfo.phone_number) || 'Not provided',
    userEmail: user.data.email || 'Not provided',
    userAddress: profileInfo.address || 'Not provided',
  };
};

// Transform School Profile Data
export const transformSchoolProfile = (user) => {
  const profileKey = getProfileKey(user.data.role);
  const profileSchools = user?.data[profileKey]?.School?.[0];

  if (!profileSchools) return {};

  return {
    schoolId: profileSchools.school_id || 'N/A',
    schoolName: profileSchools.school_name || 'Not provided',
    schoolPhoneNumber:
      formatPhoneNumber(profileSchools.school_phone_number) || 'Not provided',
    schoolAddress: profileSchools.school_address || 'Not provided',
  };
};

// Combined User and School Profile Data
export const getUserProfileData = (user) => {
  const userProfile = transformUserProfile(user);
  const schoolProfile = transformSchoolProfile(user);
  const profileKey = getProfileKey(user.data.role);
  const photo = user?.data[profileKey]?.Info?.photo ?? null;

  return {
    userProfile,
    schoolProfile,
    photo,
  };
};

// Formatted user data for the layout component
export const getUserProfileDataLayout = (user) => {
  if (!user || !user.data) {
    return {
      username: 'Username',
      email: 'Not provided',
      photo: '',
    };
  }

  const profileKey = getProfileKey(user.data.role);
  const profileInfo = user.data[profileKey]?.Info;
  const photo = profileInfo?.photo ?? '';

  return {
    username: getFullName(profileInfo),
    email: user.data.email || 'Not provided',
    photo,
  };
};

// Combined User Profile Data for Updates (without formatted DOB)
export const getUserProfileUpdateData = (user) => {
  const profileKey = getProfileKey(user.data.role);
  const profileInfo = user?.data[profileKey]?.Info;

  if (!profileInfo) return {};

  return {
    user_id: user.data[profileKey]?.user_id,
    info_id: user.data[profileKey]?.info_id,
    photo: profileInfo.photo,
    first_name: profileInfo.first_name,
    last_name: profileInfo.last_name,
    gender: profileInfo.gender || '',
    dob: profileInfo.dob || '',
    phone_number: profileInfo.phone_number,
    address: profileInfo.address,
  };
};

// Transform School Data for Updates
export const getSchoolData = (user) => {
  const profileKey = getProfileKey(user.data.role);
  const profileSchools = user?.data[profileKey]?.School;

  if (!profileSchools) return {};

  return {
    info_id: user.data[profileKey]?.info_id,
    school_id: profileSchools.school_id,
    school_name: profileSchools.school_name,
    school_address: profileSchools.school_address,
    school_phone_number: profileSchools.school_phone_number,
  };
};

// Function for Formatted Student Data
export function studentsData(student) {
  const profileInfo = student?.Info;

  return {
    id: student.student_id,
    name: getFullName(profileInfo),
    class: student.Class.class_name || 'N/A',
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
    "Guardian's Name": `${guardian.guardian_first_name || 'N/A'} ${guardian.guardian_last_name || 'N/A'}`,
    Relationship: guardian.guardian_relationship || 'N/A',
    Phone: formatPhoneNumber(guardian.guardian_phone_number),
    Email: guardian.guardian_email,
  };
}

// Combined User and School Profile Data
export const StudentProfile = (student) => {
  const info = student.Info;
  const studentProfile = studentsData(student);
  const guardianProfile = guardianData(student);

  return {
    studentProfile,
    guardianProfile,
    photo: info.photo,
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
    label: subject.subject_name,
  }));
};

// Transform filter class for attendance report table
export const transformedFilterClasses = (classes) => {
  return classes.map((item) => ({
    value: item.class_id,
    label: item.class_name,
  }));
};

export const transformedForFilter = (data, dataId, dataName) => {
  return data.map((item) => ({
    value: item.dataId,
    label: item.dataName,
  }));
};

// Function to transform the data
export const transformMarkAttendancetTable = (apiResponse) => {
  return apiResponse.map((item) => ({
    id: `${item.student_id}`,
    img: item.Info.photo || '', // Adjust the URL as needed
    name: `${item.Info.first_name} ${item.Info.last_name}`,
    gender: item.Info.gender === 'Male' ? 'M' : 'F', // Convert to 'M' or 'F'
    phone: item.Info.phone_number,
    address: item.Info.address,
    dob: item.Info.dob,
    status: null,
  }));
};

// Format teacher form data for updating
export const formatTeacherFormData = (teacherData) => {
  if (teacherData && teacherData.data && teacherData.data.Info) {
    const Info = teacherData.data.Info;
    return {
      firstName: Info.first_name || '',
      lastName: Info.last_name || '',
      phoneNumber: Info.phone_number || '',
      gender: Info.gender || '',
      dob: Info.dob || null,
      address: Info.address || '',
      photo: Info.photo || '',
    };
  }

  return null;
};
export const formatStudentFormData = (studentData) => {
  if (!studentData || !studentData.data) return null;

  const {
    Info,
    class_id,
    guardian_first_name,
    guardian_last_name,
    guardian_email,
    guardian_phone_number,
    guardian_relationship,
  } = studentData.data;
  console.log(Info.dob ? dayjs(Info.dob) : null);

  return {
    first_name: Info.first_name || '',
    last_name: Info.last_name || '',
    phone_number: Info.phone_number || '',
    gender: Info.gender || '',
    dob: Info.dob || null, // Format DOB with dayjs
    address: Info.address || '',
    class_id: class_id ? String(class_id) : '',
    guardian_first_name: guardian_first_name || '',
    guardian_last_name: guardian_last_name || '',
    guardian_email: guardian_email || '',
    guardian_phone_number: guardian_phone_number || '',
    guardian_relationship: guardian_relationship || '',
  };
};
