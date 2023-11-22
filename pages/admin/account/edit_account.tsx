import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './edit_account.module.css'; 
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  reputation: number;
  role: string;
  createdAt: string;
}

interface EditUserFormProps {
  user: User;
  onCancel: () => void;
  onSubmit: (updatedUser: User) => Promise<void>; 
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onCancel, onSubmit }) => {
  const [updatedUser, setUpdatedUser] = useState<User>({ ...user });
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(updatedUser).some((value) => {
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
    await onSubmit(updatedUser);
  };

  return (
    <div className={styles.editUserModal} style={modalStyles}>
      
      <form onSubmit={handleSubmit} className={styles.editUserForm} style={formStyles}>
      {error && <p className={styles.error}>{error}</p>}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={updatedUser.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={updatedUser.email}
          onChange={handleChange}
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={updatedUser.username}
          onChange={handleChange}
        />

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={updatedUser.role}
          onChange={handleChange}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <div className={styles.buttonContainer}>
        <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Update User</button>
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

export default EditUserForm;
