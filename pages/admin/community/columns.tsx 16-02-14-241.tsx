
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

export type Tag = {
  id: number,
  icon:string,
  color_bg:string,
  name: string,
  desc: string,
  tag_follow_count: number,
  follow: boolean,
  posts_use:number,
  bg_color:string,
  important:boolean
  createdAt: string;
}

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}  > Name <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  // {
  //   accessorKey: 'icon',
  //   header: 'Icon'
  // },
  {
    accessorKey: 'desc',
    header: 'desciption'
  },
  {
    accessorKey: 'tag_follow_count',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}  > Follow <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'posts_use',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}  > Post <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}  > Create At <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
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
    const tag = row.original;
    const handleDelete = () => {
      confirmAlert({
        message: `Are you sure you want to delete the account for "${tag.name}"?`, 
        buttons: [
          {
            label: 'No',
            onClick: () => {
              // Tag clicked 'No', do nothing or add additional logic if needed
              toast.info('Deletion canceled.', {
                position: 'top-left',
                autoClose: 300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            },
          },
          {
            label: 'Yes',
            onClick: () => {
              // Tag clicked 'Yes', proceed with the delete action
              // Implement your delete logic here
              toast.success(`${tag.name}'s account has been deleted successfully.`, {
                position: 'top-right',
                autoClose: 300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            },
          },
         
        ],
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
        <DropdownMenuItem>View </DropdownMenuItem>
        <DropdownMenuItem>Edit </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} style={{ color: 'red' }}>
          Delete 
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
   
    );
  },
},


]

