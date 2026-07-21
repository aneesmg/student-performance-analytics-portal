import React, { useState } from 'react';

const defaultActivities = [
  { id: 1, action: 'New student enrolled', detail: 'Ali Khan - Computer Science', time: '10 min ago', user: 'Admin' },
  { id: 2, action: 'Grades updated', detail: 'Semester 2 results for 15 students', time: '1 hour ago', user: 'Teacher' },
  { id: 3, action: 'Report generated', detail: 'Attendance summary for March', time: '3 hours ago', user: 'Admin' },
  { id: 4, action: 'Student record updated', detail: 'Ayesha Ahmed - contact info changed', time: '6 hours ago', user: 'Teacher' },
  { id: 5, action: 'Course added', detail: 'Machine Learning - CS Department', time: '1 day ago', user: 'Admin' },
];

function RecentActivity() {
  const [activities] = useState(defaultActivities);

  return (
    <div className="widget activity-widget">
      <div className="widget-header">
        <h3 className="widget-title">Recent Activity</h3>
      </div>
      <div className="activity-timeline">
        {activities.map((a) => (
          <div key={a.id} className="activity-item">
            <div className="activity-dot"></div>
            <div className="activity-content">
              <p className="activity-action">{a.action}</p>
              <p className="activity-detail">{a.detail}</p>
              <span className="activity-meta">
                {a.time} &bull; {a.user}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
