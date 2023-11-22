3
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  reputation: number;
  role: string;
  createdAt: string;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
         
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'username',
    header: 'username'
  },
  {
    accessorKey: 'reputation',
    header: 'Reputation'
  },
  {
    accessorKey: 'role',
    header: 'Role'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(String(row.getValue('createdAt')))
      const formatted = date.toLocaleDateString()
      return <div className='font-medium'>{formatted}</div>
    }
  },
 // ...

{
  header: 'Actions',
  id: 'actions',
  cell: ({ row }) => {
    const user = row.original;
    const handleDelete = () => {
      // Hiển thị thông báo xác nhận
      toast.warn(`Are you sure you want to delete the account for ${user.name}?`, {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: true,
        onClose: () => {
          // Xử lý xác nhận xóa ở đây
          // Nếu người dùng đồng ý xóa, thực hiện hành động xóa
          // Nếu không, bạn có thể không cần thực hiện gì cả hoặc đóng modal/xác nhận
        },
      });
    };
    return (
 
      <DropdownMenu>
      <DropdownMenuTrigger asChild style={{ background: 'white' }}>
        <Button className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' style={{ background: 'white' }}>
        <DropdownMenuItem>View Account</DropdownMenuItem>
        <DropdownMenuItem>Edit Account</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} style={{ color: 'red' }}>
          Delete Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
   
    );
  },
},


]

