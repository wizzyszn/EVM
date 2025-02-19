import { ColumnDef } from '@tanstack/react-table'; // Assuming IUser is imported from a types file
import { format } from 'date-fns';
import {UserInt} from "@/types"
export const columns: ColumnDef<UserInt["user"]>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => getValue() as string,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => getValue() as string,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ getValue }) => getValue() as string,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => getValue() as string,
  },
  {
    accessorKey: 'properties',
    header: 'Properties',
    cell: ({ getValue }) => (getValue() as string[]).length,
  },
  {
    accessorKey: 'estate.name',
    header: 'Estate'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ getValue }) =>
      format(new Date(getValue() as string), 'dd/MM/yyyy HH:mm'),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ getValue }) =>
      format(new Date(getValue() as string), 'dd/MM/yyyy HH:mm'),
  },
];
