import _ from 'lodash'
import React, { useState, useEffect } from 'react';
import { User, columns } from './columns';
import { DataTable } from './data-table';
import { AdminLayout } from '@/components/layouts'
import { NextPageWithLayout, PostModel } from '@/models'
import { Content } from "@/components/Content";
const Home: NextPageWithLayout = () => {
  function Page() {
    const [data, setData] = useState<User[] | null>(null);

    const [token, setToken] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMDM4NDA0Mn0.GiolGkFY74uweBihRIUSoO96I2YQteLbPQOM5eBDtUE'); // Added state for the authentication token
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        // Make sure to include the protocol (http/https)
        const response = await fetch('http://localhost:8080/api/admin/accounts', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the authentication token in the request headers
          },
        });
    
        if (!response.ok) {
          // Handle error response
          console.error(`Error fetching data: ${response.statusText}`);
          return;
        }
    
        const result: User[] = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const handleDelete = async (postId: number) => {
      // Similar implementation as in columns.tsx
      // ...

      // Update the state after successful deletion
      fetchData();
    };

    const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setToken(event.target.value);
    };

    return (
      <section className='py-24'>
        <div className='container'>
        <input type="text" value={token} onChange={handleTokenChange} />
          <h1 className='mb-6 text-3xl font-bold'>All Users</h1>
          {data ? (
            <DataTable columns={columns} data={data} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <Content />
  
  );
}

Home.Layout = AdminLayout
Home.sidebarRight = true
Home.SidebarLeft = true
Home.requestAuth = false
export default Home
