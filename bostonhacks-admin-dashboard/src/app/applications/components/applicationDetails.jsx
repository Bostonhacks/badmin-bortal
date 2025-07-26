import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button } from '@mui/material';
import { dummyApps } from '@/data/dummyData';

export default function ApplicationDetails({ userId }) {
  const data = dummyApps.find(app => app.userId === userId);
  if (!data) return <div>No application details found.</div>;

  return (
    <div >
      {/* TODO: make this formatted in some way and maybe more selective with info shown */}
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {typeof value === 'object' && value !== null ? JSON.stringify(value) : (value || 'N/A')}
        </div>
      ))}
      {/* TODO: add a way to update status of applicants */}
    </div>
  )
}