import React from 'react';
import DateCalendarCard from '../../../components/common/DateCalendarCard';

const TeacherDashboardPage = () => {
  // Get the current hour to determine the appropriate greeting
  const currentHour = new Date().getHours();
  let greeting = 'Good evening';

  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  }

  return (
    <div className="teacher-dashboard">
      <h1 className="dashboard-greeting">{greeting}, Teacher!</h1>
      <div className="dashboard-content">
        <DateCalendarCard />
        {/* Add more dashboard components here */}
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
