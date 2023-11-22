
import { useState, useEffect } from 'react';

interface Dashboard {
  post_count: number;
  user_count: number;
  tag_count: number;
}
export interface Account {
  imageUrl:string,
  name:string,
  username:string,
}
export interface TagModel {
  id: number
  slug:string
  name: string
  desc: string
  tag_follow_count: number
  createdAt:string
}
interface ContentProps {
  title?: string;
}


export function Content({ title }: ContentProps) {
  const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [tags, setTags] = useState<TagModel[]>([]);
  const [accessToken, setAccessToken] = useState<string>('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMTI0NDQ5M30.dbh_DUAHtryyZwE14RUJ_lZuRwHIwnl3Z5_4Krpb0js'); // Thay YOUR_ACCESS_TOKEN bằng access token của bạn
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/dashboard/total', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data: Dashboard = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/famous');
        const data: Account[] = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tags/popular');
        const data: TagModel[] = await response.json();
        // Only take the first four tags
        const limitedTags = data.slice(0, 4);
        setTags(limitedTags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchDashboardData();
    fetchAccounts();
    fetchTags();
  }, [accessToken]);

  return (
    <div className="flex flex-col flex-wrap sm:flex-row">
          {/* -----------------TOTAL POST---------------------- */}
      <div className="mb-6 w-full pr-2 md:w-4/12">
        <div className="rounded-2xl bg-white p-4 shadow">
          <div className="flex items-center">
            <span className="relative rounded-xl bg-purple-200 p-4">
              <svg
                width="40"
                fill="currentColor"
                height="40"
                className="absolute left-1/2 top-1/2 h-4 -translate-x-1/2 -translate-y-1/2 text-purple-500"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z" />
              </svg>
            </span>
            <p className="text-md ml-2 text-black">{title || "Total Posts"}</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="my-4 text-left text-4xl font-bold text-gray-700">
            <p>{dashboardData?.post_count}  <span className="text-sm"> Posts</span></p>
          
            </p>
            <div className="flex items-center text-sm text-green-500">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z" />
              </svg>
              <span>5.5%</span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </div>
        </div>
      </div>
      {/* -----------------Popular ACCOUNT---------------------- */}
      <div className="mb-6 w-full pr-2 md:w-4/12">
        <div className="rounded-2xl bg-white p-4 shadow">
          <div className="flex items-center">
            <span className="relative rounded-xl bg-purple-200 p-4">
              <svg
                width="40"
                fill="currentColor"
                height="40"
                className="absolute left-1/2 top-1/2 h-4 -translate-x-1/2 -translate-y-1/2 text-purple-500"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z" />
              </svg>
            </span>
            <p className="ml-2 text-black">Total Account</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="my-4 text-left text-4xl font-bold text-gray-700">
            {dashboardData?.user_count}
              <span className="text-sm"> Account</span>
            </p>
            <div className="flex items-center text-sm text-green-500">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z" />
              </svg>
              <span>0.3%</span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </div>
        </div>
      </div>
      {/* -----------------TOTAL TAG---------------------- */}
      <div className="w-full md:w-4/12">
        <div className="rounded-2xl bg-white p-4 shadow">
          <div className="flex items-center">
            <span className="relative rounded-xl bg-purple-200 p-4">
              <svg
                width="40"
                fill="currentColor"
                height="40"
                className="absolute left-1/2 top-1/2 h-4 -translate-x-1/2 -translate-y-1/2 text-purple-500"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z" />
              </svg>
            </span>
            <p className="text-black md:ml-4">Total Community</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="my-4 text-left text-4xl font-bold text-gray-700">
            {dashboardData?.tag_count}
              <span className="text-sm"> Community</span>
            </p>
            <div className="flex items-center text-sm text-green-500">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z" />
              </svg>
              <span>7%</span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </div>
        </div>
      </div>
      
  {/* -----------------ACCOUNT FAMOUS---------------------- */}
  <div className="relative mt-8 w-full overflow-hidden rounded-xl bg-white p-4 shadow-lg md:mr-2 md:w-3/12">
  <p className="mb-6 text-xl font-light text-gray-600">Popular Account</p>
  <div className="grid grid-cols-3 gap-4">
    {accounts.map((account, index) => (
      <div key={index} className="flex flex-col items-center">
        <div className="relative">
          <a className="relative block" >
            {account.imageUrl ? (
              <img
                alt={account.name}
                className="mx-auto h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full flex justify-center items-center bg-yellow-600 text-white">
                {account.name[0]}
                
              </div>
              
            )}
            
          </a>
          <svg
            width="10"
            height="10"
            fill="currentColor"
            className="absolute bottom-0 right-0 -m-1 h-4 w-4 rounded-full bg-blue-600 fill-current p-1 text-white"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z" />
          </svg>
        </div>
        <span className="mt-2 text-xs text-gray-600">{account.name}</span>
      </div>
    ))}
  </div>
</div>
    
      <div className="relative mt-8 w-full overflow-hidden rounded-xl bg-white p-4 text-gray-700 shadow-lg md:ml-2 md:w-4/12">
        <a href="#" className="block h-full w-full">
          <div className="w-full">
            <p className="mb-4 text-2xl font-light text-gray-700">
              Report
            </p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <p>Design</p>
              <p>3/8</p>
            </div>
            <div className="mb-4 h-2 w-full rounded-full bg-green-100">
              <div className="h-full w-1/3 rounded-full bg-green-400 text-center text-xs text-white" />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <p>Development</p>
              <p>6/10</p>
            </div>
            <div className="mb-4 h-2 w-full rounded-full bg-indigo-100">
              <div className="h-full w-2/3 rounded-full bg-indigo-400 text-center text-xs text-white" />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <p>DevOps</p>
              <p>2/8</p>
            </div>
            <div className="mb-4 h-2 w-full rounded-full bg-blue-100">
              <div className="h-full w-1/4 rounded-full bg-blue-400 text-center text-xs text-white" />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <p>Marketing</p>
              <p>8/8</p>
            </div>
            <div className="h-2 w-full rounded-full bg-pink-100">
              <div className="h-full w-full rounded-full bg-pink-400 text-center text-xs text-white" />
            </div>
          </div>
        </a>
      </div>

      <div className="relative mt-8 w-full overflow-hidden rounded-xl bg-white p-4 shadow-lg md:ml-4 md:w-4/12">
        <div className="mb-8 flex w-full items-center justify-between">
          <p className="text-xl text-gray-800">Popolar Tags</p>
          <a href="/tags" className="flex items-center border-0 text-sm text-gray-300 hover:text-gray-600 focus:outline-none">
            VIEW ALL
          </a>
          {/* phần view all sẽ đi đến trang src= /tags */}
        </div>
       {tags.map((tag, index) => (
          <div key={index} className="mb-6 flex items-center justify-between rounded">
            <span className="rounded-lg">
              {/* You can add any styling or additional content for the tag icon here */}
            </span>
            <div className="flex w-full items-center justify-between">
            <div className="ml-2 flex w-full flex-col items-start justify-between text-sm">
              <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>#{tag.name}</h3>
              <p className="text-gray-300">{tag.desc}</p>
            </div>

              <span className="text-green-400">{tag.tag_follow_count} </span>
            </div>
          </div>
        ))}
    
      </div>
    </div>
  );
}
