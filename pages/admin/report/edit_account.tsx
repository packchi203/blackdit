import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './edit_account.module.css'; 

interface Report {
  id: number;
  reason: string;
  reportType: string;
  account: { name: string };
  username: string;
  postId: { slug: string };
  status: string;
  reportStatus: string;
  createdAt: string;
}

interface EditReportFormProps {
  report: Report;
  onCancel: () => void;
  onSubmit: (updatedReport: Report) => Promise<void>; 
}

const EditReportForm: React.FC<EditReportFormProps> = ({ report, onCancel, onSubmit }) => {
  const [updatedReport, setUpdatedReport] = useState<Report>({ ...report });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'reportStatus' && updatedReport.reportStatus === 'RESOLVED' && value === 'PENDING') {
      toast.error('Cannot change status from RESOLVED to PENDING.', {
        icon: '❌',
      });
      return;
    }

    setUpdatedReport((prevReport) => ({ ...prevReport, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(updatedReport).some((value) => {
      if (typeof value === 'string') {
        return !value.trim(); // Check if the string is empty or consists only of whitespace
      }
      return false; // For non-string values
    })) {
      toast.error('Vui lòng điền đầy đủ thông tin.', {
        icon: '❌',
      });
      return;
    }

    // Reset error message
    setError(null);

    // Call the onSubmit function
    await onSubmit(updatedReport);
  };

  return (
    <div className={styles.editUserModal} style={modalStyles}>
      <form onSubmit={handleSubmit} className={styles.editUserForm} style={formStyles}>
        {/* {error && <p className={styles.error}>{error}</p>}
        <label htmlFor="reason">Reason:</label>
        <input
          type="text"
          id="reason"
          name="reason"
          value={updatedReport.reason}
          onChange={handleChange}
        /> */}
        
        {/* {updatedReport.reportType === 'SPAM' && (
          <>
            <label htmlFor="reportType">Report Type:</label>
            <select
              id="reportType"
              name="reportType"
              value={updatedReport.reportType}
              onChange={handleChange}
            >
              <option value="SPAM">SPAM</option>
              <option value="INSULTS">INSULTS</option>
              <option value="ADULT_CONTENT">ADULT CONTENT</option>
              <option value="DISCRIMINATION">DISCRIMINATION</option>
              <option value="CHEAT">CHEAT</option>
              <option value="CHILD ABUSE">CHILD ABUSE</option>
              <option value="FALSE_CONTENT">FALSE CONTENT</option>
            </select>
          </>
        )} */}

        <label htmlFor="reportStatus">Status:</label>
        <select
          id="reportStatus"
          name="reportStatus"
          value={updatedReport.status}
          onChange={handleChange}
        >
          <option value="PENDING">PENDING</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>

        <div className={styles.buttonContainer}>
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Update Report</button>
        </div>
      </form>
    </div>
  );
};

const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  width: '500px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const formStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

export default EditReportForm;
