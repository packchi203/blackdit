
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts';
import { NextPageWithLayout } from '@/models';
import EditPostForm from './edit_post';
import ConfirmationBox from './confirm';

import styles from './edit_account.module.css'; 
import toast from 'react-hot-toast';
import { EyeIcon,PencilIcon,TrashIcon } from '@heroicons/react/24/outline';

interface Post {
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
interface Report {
  id: number;
  reason: string;
  reportType: string;
  account: { name: string };
  postId: { slug: string };
  status: string;
  createdAt: string;
}
const Home: NextPageWithLayout = () => {
  const [data, setData] = useState<Post[]>([]);
  const [token] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMTI0NDQ5M30.dbh_DUAHtryyZwE14RUJ_lZuRwHIwnl3Z5_4Krpb0js');
  const [showEditForm, setShowEditForm] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Post[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const router = useRouter();
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleData = filteredData.slice(startIndex, endIndex);
  const [showConfirmationBox, setShowConfirmationBox] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/posts/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error(`Error fetching data: ${response.statusText}`);
        return;
      }
  
      const result = await response.json();
      const reversedData = result.reverse();
  
      setData(reversedData);
      setFilteredData(reversedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = (postId: number) => {
    setSelectedPostId(postId);
    setShowConfirmationBox(true);
  };
  const performDelete = async () => {
    // Perform the delete operation using the selected post ID
    if (selectedPostId !== null) {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/posts/${selectedPostId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          if (response.status === 403) {
            // Display a specific alert if the status is 403
            toast.error(`Community này đã có bài viết không thể xoá`, {
              icon: '❌',
            })
          } else {
            // Display error toast if deletion fails for other reasons
            toast.error(`Error deleting post: ${response.statusText}`, {
              icon: '❌',
            });
          }
          return;
        }
  
        // Remove the deleted post from both data and filteredData
        setData((prevData) => prevData.filter((post) => post.id !== selectedPostId));
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter((post) => post.id !== selectedPostId)
        );
  
        // Display success toast
        toast.success('Post deleted successfully!', {
          icon: '✅',
        });
      } catch (error) {
        // Display error toast if an exception occurs
        console.error('Error deleting post:', error);
        toast.error('An error occurred while deleting the post.', {
          icon: '❌',
        });
      } finally {
        // Reset the selected post ID
        setSelectedPostId(null);
      }
    }
  };
  
  const handleConfirmationCancel = () => {
    // Hide the confirmation box and reset the selected post ID
    setShowConfirmationBox(false);
    setSelectedPostId(null);
  };
  const handleConfirmationConfirm = () => {
    performDelete();
    // Hide the confirmation box
    setShowConfirmationBox(false);
  };


  const handleEdit = (postId: number) => {
    const postToEdit = data.find((post) => post.id === postId);
    if (postToEdit) {
      setEditPost(postToEdit);
      setShowEditForm(true);
    }
  };
  const handleEditSubmit = async (updatedPost: Post) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/posts/${updatedPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPost),
      });
  
      if (!response.ok) {
        // Display error toast if the update fails
        toast.error(`Error updating post: ${response.statusText}`, {
          icon: '❌',
        });
        return;
      }
  
      // Update the data and filteredData with the updated post
      setData((prevData) =>
        prevData.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
      setFilteredData((prevFilteredData) =>
        prevFilteredData.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
  
      // Display success toast
      toast.success('Post updated successfully!', {
        icon: '✅',
      });
  
      // Close the edit form
      setShowEditForm(false);
    } catch (error) {
      // Display error toast if an exception occurs
      console.error('Error updating post:', error);
      toast.error('An error occurred while updating the post.', {
        icon: '❌',
      });
    }
  };
  const handleSearch = () => {
    const filtered = data.filter((post) =>
      post.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1); // Reset current page when changing rows per page
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
      <div className={styles.formContainer} >
              <h1>Post List</h1>
            <div  className={styles.topTable}  >
            {showConfirmationBox && (
                  <div className={`${styles.confirmationBoxContainer} ${styles.backdropFilter}`}>
                    <ConfirmationBox onCancel={handleConfirmationCancel} onConfirm={handleConfirmationConfirm} />
                  </div>
                )}

              <div className={styles.searchContainer}>
                <input
                  placeholder='Search by Name:'
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
              </div>
              <div className={styles.rowsPerPageContainer}>
                <label htmlFor="rowsPerPage">Rows per page:</label>
                <select
                  id="rowsPerPage"
                  value={rowsPerPage}
                  onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                </select>
              </div>
            </div>

        <table className={styles.myTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Community</th>
                <th>Author</th>
                <th>Comment</th>
                <th>View</th>
                <th>Vote</th>
                <th>Create At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {visibleData.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.tags.map(tag => tag.name).join(', ')}</td>
                  <td>{post.account.name}</td>
                  <td>{post.commentCount}</td>
                  <td>{post.viewCount}</td>
                  <td>{post.voteCount}</td>
                  <td>{formatDate(post.createdAt)}</td>
                  <td>
                  <div className={styles.dropdown}>
                      <button onClick={() => router.push(`/bai-dang/${post.slug}`)}>
                        <EyeIcon className='w-4 h-4 text-gray-600 mr-1' />
                      </button>
                      <button onClick={() => handleEdit(post.id)}>
                        <PencilIcon className='w-4 h-4 text-gray-600 mr-1' />
                      </button>
                      <button onClick={() => handleDelete(post.id)}>
                        <TrashIcon className='w-4 h-4 text-red-600 mr-1' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination} >
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{` ${currentPage} / ${totalPages}`}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
          {showEditForm && editPost && (
            <EditPostForm
              post={editPost}
              onCancel={() => setShowEditForm(false)}
              onSubmit={handleEditSubmit}
            />
          )}
    
  </div>
  );
};

Home.Layout = AdminLayout;
Home.sidebarRight = true;
Home.SidebarLeft = true;
Home.requestAuth = false;
export default Home;
