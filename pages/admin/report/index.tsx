
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts';
import { NextPageWithLayout } from '@/models';
import EditReportForm from './edit_account';
import ConfirmationBox from './confirm';

import styles from './edit_account.module.css'; 
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { EyeIcon,PencilIcon,TrashIcon } from '@heroicons/react/24/outline';


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
const Home: NextPageWithLayout = () => {
  const [data, setData] = useState<Report[]>([]);
  const [token] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMTI0NDQ5M30.dbh_DUAHtryyZwE14RUJ_lZuRwHIwnl3Z5_4Krpb0js');
  const [showEditForm, setShowEditForm] = useState(false);
  const [editReport, setEditReport] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Report[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const router = useRouter();
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleData = filteredData.slice(startIndex, endIndex);
  const [showConfirmationBox, setShowConfirmationBox] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const statusQueryParam = selectedStatus !== 'ALL' ? `&status=${selectedStatus}` : '';
      const response = await fetch(`http://localhost:8080/api/reports?${statusQueryParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error(`Error fetching data: ${response.statusText}`);
        return;
      }
  
      const result: Report[] = await response.json();
  
      // Sort the data in descending order based on the createdAt property
      const sortedData = result.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
  
        return dateB - dateA;
      });
  
      setData(sortedData);
      setFilteredData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };
  const handleDelete = (reportId: number) => {
    setSelectedReportId(reportId);
    setShowConfirmationBox(true);
  };
  
  const performDelete = async () => {
    // Perform the delete operation using the selected report ID
    if (selectedReportId !== null) {
      try {
        const response = await fetch(`http://localhost:8080/api/reports/${selectedReportId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          // Display error toast if deletion fails
          toast.error(`Error deleting report: ${response.statusText}`, {
            icon: '❌',
          });
          return;
        }
  
        // Remove the deleted report from both data and filteredData
        setData((prevData) => prevData.filter((report) => report.id !== selectedReportId));
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter((report) => report.id !== selectedReportId)
        );
  
        // Display success toast
        toast.success('Report deleted successfully!', {
          icon: '✅',
        });
      } catch (error) {
        // Display error toast if an exception occurs
        console.error('Error deleting report:', error);
        toast.error('An error occurred while deleting the report.', {
          icon: '❌',
        });
      } finally {
        // Reset the selected report ID
        setSelectedReportId(null);
      }
    }
  };
  
  const handleConfirmationCancel = () => {
    // Hide the confirmation box and reset the selected report ID
    setShowConfirmationBox(false);
    setSelectedReportId(null);
  };
  const handleConfirmationConfirm = () => {
    performDelete();
    // Hide the confirmation box
    setShowConfirmationBox(false);
  };
  const handleEdit = (reportId: number) => {
    const reportToEdit = data.find((report) => report.id === reportId);
    if (reportToEdit) {
      setEditReport(reportToEdit);
      setShowEditForm(true);
    }
  };
  const handleEditSubmit = async (updatedReport: Report) => {
    try {
      console.log('Dữ liệu được PUT lên:', updatedReport); 
      const { reason, reportType, reportStatus ,status } = updatedReport;
      const updatedData = { reason, reportType, reportStatus, status };
      const response = await fetch(`http://localhost:8080/api/reports/${updatedReport.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        // Hiển thị toast lỗi nếu việc cập nhật thất bại
        // console.error(`Error updating report: ${response.statusText}`);
        toast.error(`Error updating report: ${response.statusText}`, {
          icon: '❌',
        });
        return;
      }
      setData((prevData) =>
        prevData.map((report) => (report.id === updatedReport.id ? updatedReport : report))
      );
      setFilteredData((prevFilteredData) =>
        prevFilteredData.map((report) => (report.id === updatedReport.id ? updatedReport : report))
      );

      // Hiển thị toast thành công
      toast.success('Report updated successfully!', {
        icon: '✅',
      });

  
      // Close the edit form
      // Đóng form chỉnh sửa
      setShowEditForm(false);
    } catch (error) {
      // Hiển thị toast lỗi nếu có lỗi
      console.error('Error updating report:', error);
      toast.error('An error occurred while updating the report.', {
        icon: '❌',
      });
    }
  };
  const handleSearch = () => {
    const filtered = data.filter(
      (report) =>
        report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedStatus === 'ALL' || report.status === selectedStatus)
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
              <h1>Report List</h1>
            <div  className={styles.topTable}  >
            {showConfirmationBox && (
  <div className={`${styles.confirmationBoxContainer} ${styles.backdropFilter}`}>
    <ConfirmationBox onCancel={handleConfirmationCancel} onConfirm={handleConfirmationConfirm} />
  </div>
)}

              <div className={styles.searchContainer}>
                <input
                  placeholder='Search by Type:'
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  id="statusFilter"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option value="ALL">All Statuss</option>
                  <option value="PENDING">PENDING</option>
                  <option value="RESOLVED">RESOLVED</option>
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
                <th>Detail</th>
                <th>Report Type</th>
                <th>Author</th>
                <th>Post Slug</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {visibleData.map((report) => (
                <tr key={report.id}>
                  <td>{report.reason}</td>
                  <td>{report.reportType}</td>
                  <td>{report.username}</td>
                  <td>{report.postId.slug}</td>
                  <td>{report.status}</td>
                  <td>{formatDate(report.createdAt)}</td>
                  <td>
                  <div className={styles.dropdown}>
  <button onClick={() => router.push(`/bai-dang/${report.postId.slug}`)}>
    <EyeIcon className="w-4 h-4 text-gray-600 mr-1" /> 
  </button>
  <button onClick={() => handleEdit(report.id)}>
    <PencilIcon className="w-4 h-4 text-gray-600 mr-1" /> 
  </button>
  <button onClick={() => handleDelete(report.id)}>
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
          {showEditForm && editReport && (
             <EditReportForm
             report={editReport}
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