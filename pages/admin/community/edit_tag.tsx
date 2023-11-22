import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './edit_account.module.css'; 
interface Tag {
  id: number;
  name: string,
  desc: string,
  tag_follow_count: number,
  posts_use:number,
  createdAt: string;
}
interface EditTagFormProps {
  tag: Tag;
  onCancel: () => void;
  onSubmit: (updatedTag: Tag) => Promise<void>; 
}

const EditTagForm: React.FC<EditTagFormProps> = ({ tag, onCancel, onSubmit }) => {
  const [updatedTag, setUpdatedTag] = useState<Tag>({ ...tag });
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedTag((prevTag) => ({ ...prevTag, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(updatedTag).some((value) => {
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
    await onSubmit(updatedTag);
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
          value={updatedTag.name}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue.length <= 30) {
              handleChange(e);
            } else {
              toast.error('Tên không được quá 30 kí tự.', {
                icon: '❌',
              });
            }
          }}
          maxLength={30}
        />

        <label htmlFor="desc">Desc:</label>
        <input
          placeholder='Enter description'
          type="text"
          id="desc"
          name="desc"
          value={updatedTag.desc}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue.length <= 250) {
              handleChange(e);
            } else {
              toast.error('Mô tả không được quá 250 kí tự.', {
                icon: '❌',
              });
            }
          }}
          maxLength={250}
        />
      
        <div className={styles.buttonContainer}>
        <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Update Tag</button>
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

export default EditTagForm;
