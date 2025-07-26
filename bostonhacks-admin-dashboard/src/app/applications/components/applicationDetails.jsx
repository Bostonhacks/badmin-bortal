import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button } from '@mui/material';
import { dummyApps } from '@/data/dummyData';

export default function ApplicationDetails({ userId }) {
  const data = dummyApps.find(app => app.userId === userId);
  if (!data) return <div>No application details found.</div>;

  return (
    <div >
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {typeof value === 'object' && value !== null ? JSON.stringify(value) : (value || 'N/A')}
        </div>
      ))}
    </div>
  )
}