
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts';
import { NextPageWithLayout } from '@/models';
import EditTagForm from './edit_tag';
import ConfirmationBox from './confirm';

import styles from './edit_account.module.css'; 
import toast from 'react-hot-toast';
import CreateTagForm from './create_tag';

import { EyeIcon,PencilIcon,TrashIcon ,PlusIcon} from '@heroicons/react/24/outline';
interface Tag {
  id: number;
  name: string,
  desc: string,
  tag_follow_count: number,
  posts_use:number,
  createdAt: string;
}
const Home: NextPageWithLayout = () => {
  const [data, setData] = useState<Tag[]>([]);
  const [token] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMTI0NDQ5M30.dbh_DUAHtryyZwE14RUJ_lZuRwHIwnl3Z5_4Krpb0js');
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTag, setEditTag] = useState<Tag | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Tag[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const router = useRouter();
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleData = filteredData.slice(startIndex, endIndex);
  const [showConfirmationBox, setShowConfirmationBox] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/tags', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Error fetching data: ${response.statusText}`);
        return;
      }
      const result: Tag[] = await response.json();
      setData(result.reverse());
        setFilteredData(result.reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = (tagId: number) => {
    setSelectedTagId(tagId);
    setShowConfirmationBox(true);
  };
  const performDelete = async () => {
    // Perform the delete operation using the selected tag ID
    if (selectedTagId !== null) {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/tags/${selectedTagId}`, {
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
            toast.error(`Error deleting tag: ${response.statusText}`, {
              icon: '❌',
            });
          }
          return;
        }
  
        // Remove the deleted tag from both data and filteredData
        setData((prevData) => prevData.filter((tag) => tag.id !== selectedTagId));
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter((tag) => tag.id !== selectedTagId)
        );
  
        // Display success toast
        toast.success('Tag deleted successfully!', {
          icon: '✅',
        });
      } catch (error) {
        // Display error toast if an exception occurs
        console.error('Error deleting tag:', error);
        toast.error('An error occurred while deleting the tag.', {
          icon: '❌',
        });
      } finally {
        // Reset the selected tag ID
        setSelectedTagId(null);
      }
    }
  };
  
  const handleConfirmationCancel = () => {
    // Hide the confirmation box and reset the selected tag ID
    setShowConfirmationBox(false);
    setSelectedTagId(null);
  };
  const handleConfirmationConfirm = () => {
    performDelete();
    // Hide the confirmation box
    setShowConfirmationBox(false);
  };
  const handleCreateSubmit = async (newTag: Tag) => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newTag.name,
          desc: newTag.desc,
      
        }),
      });

      if (!response.ok) {
        // Display error toast if the creation fails
        toast.error(`Error creating tag: ${response.statusText}`, {
          icon: '❌',
        });
        return;
      }

      // Update the data and filteredData with the created tag
      setData((prevData) => [newTag, ...prevData]);
      setFilteredData((prevFilteredData) => [newTag, ...prevFilteredData]);

      // Display success toast
      toast.success('Tag created successfully!', {
        icon: '✅',
      });

      // Close the create form
      setShowCreateForm(false);
    } catch (error) {
      // Display error toast if an exception occurs
      console.error('Error creating tag:', error);
      toast.error('An error occurred while creating the tag.', {
        icon: '❌',
      });
    }
  };

  const handleEdit = (tagId: number) => {
    const tagToEdit = data.find((tag) => tag.id === tagId);
    if (tagToEdit) {
      setEditTag(tagToEdit);
      setShowEditForm(true);
    }
  };
  const handleEditSubmit = async (updatedTag: Tag) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/tags/${updatedTag.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTag),
      });
  
      if (!response.ok) {
        // Display error toast if the update fails
        toast.error(`Error updating tag: ${response.statusText}`, {
          icon: '❌',
        });
        return;
      }
  
      // Update the data and filteredData with the updated tag
      setData((prevData) =>
        prevData.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
      );
      setFilteredData((prevFilteredData) =>
        prevFilteredData.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
      );
  
      // Display success toast
      toast.success('Tag updated successfully!', {
        icon: '✅',
      });
  
      // Close the edit form
      setShowEditForm(false);
    } catch (error) {
      // Display error toast if an exception occurs
      console.error('Error updating tag:', error);
      toast.error('An error occurred while updating the tag.', {
        icon: '❌',
      });
    }
  };
  const handleSearch = () => {
    const filtered = data.filter((tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1>Community List</h1>
              <button className={styles.searchButton} onClick={() => setShowCreateForm(true)}>
              <PlusIcon
                  className='-ml-1 mr-2 h-5 w-5 text-gray-500 dark:text-gray-100'
                  aria-hidden='true'
                />Create Community</button>

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
                <button onClick={handleSearch}>Search</button>
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
                <th>Name</th>
                <th>Description</th>
                <th>Follower</th>
                <th>Post</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {visibleData.map((tag) => (
                <tr key={tag.id}>
                  <td>{tag.name}</td>
                  <td>{tag.desc}</td>
                  <td>{tag.tag_follow_count}</td>
                  <td>{tag.posts_use}</td>
                  <td>{formatDate(tag.createdAt)}</td>
                  <td>
                  <div className={styles.dropdown}>
  <button onClick={() => router.push(`/tag/${tag.name}`)}>
    <EyeIcon className="w-4 h-4 text-gray-600 mr-1" /> 
  </button>
  <button onClick={() => handleEdit(tag.id)}>
    <PencilIcon className="w-4 h-4 text-gray-600 mr-1" /> 
  </button>
  <button onClick={() => handleDelete(tag.id)}>
    <TrashIcon className="w-4 h-4 text-red-500 mr-1" /> 
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
    
      {showCreateForm && (
        <CreateTagForm onCancel={() => setShowCreateForm(false)} onSubmit={handleCreateSubmit} />
      )}
          {showEditForm && editTag && (
            <EditTagForm
              tag={editTag}
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