
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts';
import { NextPageWithLayout } from '@/models';
import EditUserForm from './edit_account';
import ConfirmationBox from './confirm';

import styles from './edit_account.module.css'; 
import toast from 'react-hot-toast';
import { EyeIcon,PencilIcon,TrashIcon } from '@heroicons/react/24/outline';
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  reputation: number;
  role: string;
  createdAt: string;
}
const Home: NextPageWithLayout = () => {
  const [data, setData] = useState<User[]>([]);
  const [token] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMTI0NDQ5M30.dbh_DUAHtryyZwE14RUJ_lZuRwHIwnl3Z5_4Krpb0js');
  const [showEditForm, setShowEditForm] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<User[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const router = useRouter();
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleData = filteredData.slice(startIndex, endIndex);
  const [showConfirmationBox, setShowConfirmationBox] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const roleQueryParam = selectedRole !== 'ALL' ? `&role=${selectedRole}` : '';
      const response = await fetch(`http://localhost:8080/api/admin/accounts?${roleQueryParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Error fetching data: ${response.statusText}`);
        return;
      }
      const result: User[] = await response.json();
      setData(result.reverse());
        setFilteredData(result.reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };
  const handleDelete = (userId: number) => {
    setSelectedUserId(userId);
    setShowConfirmationBox(true);
  };
  
  const performDelete = async () => {
    // Perform the delete operation using the selected user ID
    if (selectedUserId !== null) {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/accounts/${selectedUserId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          // Display error toast if deletion fails
          toast.error(`Error deleting user: ${response.statusText}`, {
            icon: '❌',
          });
          return;
        }
  
        // Remove the deleted user from both data and filteredData
        setData((prevData) => prevData.filter((user) => user.id !== selectedUserId));
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter((user) => user.id !== selectedUserId)
        );
  
        // Display success toast
        toast.success('User deleted successfully!', {
          icon: '✅',
        });
      } catch (error) {
        // Display error toast if an exception occurs
        console.error('Error deleting user:', error);
        toast.error('An error occurred while deleting the user.', {
          icon: '❌',
        });
      } finally {
        // Reset the selected user ID
        setSelectedUserId(null);
      }
    }
  };
  
  const handleConfirmationCancel = () => {
    // Hide the confirmation box and reset the selected user ID
    setShowConfirmationBox(false);
    setSelectedUserId(null);
  };
  const handleConfirmationConfirm = () => {
    performDelete();
    // Hide the confirmation box
    setShowConfirmationBox(false);
  };
  const handleEdit = (userId: number) => {
    const userToEdit = data.find((user) => user.id === userId);
    if (userToEdit) {
      setEditUser(userToEdit);
      setShowEditForm(true);
    }
  };
  const handleEditSubmit = async (updatedUser: User) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/accounts/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (!response.ok) {
        // Display error toast if the update fails
        toast.error(`Error updating user: ${response.statusText}`, {
          icon: '❌',
        });
        return;
      }
  
      // Update the data and filteredData with the updated user
      setData((prevData) =>
        prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setFilteredData((prevFilteredData) =>
        prevFilteredData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
  
      // Display success toast
      toast.success('User updated successfully!', {
        icon: '✅',
      });
  
      // Close the edit form
      setShowEditForm(false);
    } catch (error) {
      // Display error toast if an exception occurs
      console.error('Error updating user:', error);
      toast.error('An error occurred while updating the user.', {
        icon: '❌',
      });
    }
  };
  const handleSearch = () => {
    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRole === 'ALL' || user.role === selectedRole)
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
              <h1>User List</h1>
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
                <select
                  id="roleFilter"
                  value={selectedRole}
                  onChange={handleRoleChange}
                >
                  <option value="ALL">All Roles</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
                <button className={styles.searchButton} onClick={handleSearch}>
                  Search
                </button>
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
                <th>Email</th>
                <th>Username</th>
                <th>Reputation</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {visibleData.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.reputation}</td>
                  <td>{user.role}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                  <div className={styles.dropdown}>
  <button onClick={() => router.push(`/nguoi-dung/${user.username}`)}>
    <EyeIcon className="w-4 h-4 text-gray-600 mr-1" /> 
  </button>
  <button onClick={() => handleEdit(user.id)}>
    <PencilIcon className="w-4 h-4 text-gray-600 mr-1" /> 
  </button>
  <button onClick={() => handleDelete(user.id)}>
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
          {showEditForm && editUser && (
            <EditUserForm
              user={editUser}
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
