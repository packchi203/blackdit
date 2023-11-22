import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './edit_account.module.css'; 

export interface Post{
  id: number;
  title: string;
  slug: string;
  tags: { name: string }[];
  content: string;
  account: { name: string };
  commentCount: number;
  viewCount: number;
  voteCount: number;
  createdAt: string;
}
interface EditPostFormProps {
  post: Post;
  onCancel: () => void;
  onSubmit: (updatedPost: Post) => Promise<void>; 
}

const EditPostForm: React.FC<EditPostFormProps> = ({ post, onCancel, onSubmit }) => {
  const [updatedPost, setUpdatedPost] = useState<Post>({ ...post });
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(updatedPost).some((value) => {
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
    await onSubmit(updatedPost);
  };

  return (
    <div className={styles.editUserModal} style={modalStyles}>
      
      <form onSubmit={handleSubmit} className={styles.editUserForm} style={formStyles}>
      {error && <p className={styles.error}>{error}</p>}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedPost.title}
          onChange={handleChange}
        />

        <label htmlFor="slug">Slug:</label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={updatedPost.slug}
          onChange={handleChange}
        />
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="content"
            value={updatedPost.content}
            onChange={handleChange}
            rows={4} // You can adjust the number of rows as needed
            style={{
              width: '100%', 
              height: '350px',// Set the width to 100% or adjust as needed
              padding: '8px', // Adjust padding as needed
              boxSizing: 'border-box', // Include padding in the total width/height
              resize: 'vertical', // Allow vertical resizing
            }}
        />

       

        <div className={styles.buttonContainer}>
        <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Update Post</button>
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

export default EditPostForm;
