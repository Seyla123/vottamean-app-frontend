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

// Transform User Profile Data
export const UserProfileData = (user) => {
  if (!user || !user.data.adminProfile?.Info) {
    return {};
  }

  const info = user.data.adminProfile.Info;
  const school = user.data.adminProfile?.Schools[0] || {};

  // Transform user profile data
  const userProfile = {
    'Full Name': `${info.first_name} ${info.last_name}`, // Combine first and last name
    Age: info.dob
      ? new Date().getFullYear() - new Date(info.dob).getFullYear()
      : 'N/A',
    Gender: info.gender || 'N/A',
    'Date of Birth': info.dob ? formatDate(info.dob) : 'N/A',
    Phone: formatPhoneNumber(info.phone_number),
    Email: user.data.email,
    Address: info.address || 'N/A',
  };

  // Transform school data
  const schoolProfile = {
    'School Name': school.school_name || 'N/A',
    'Phone Number': formatPhoneNumber(school.school_phone_number) || 'N/A',
    'School Address': school.school_address || 'N/A',
  };

  return {
    userProfile,
    schoolProfile,
    img: info.photo || '/default-profile.jpg', // Default profile image
  };
};

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
