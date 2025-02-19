import { Property } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Property>[] = [
    {
      accessorKey: "name",
      header: "Property Name",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "estate.name",
      header: "Estate",
    },
    {
      accessorKey: "size",
      header: "Size (sqm)",
    },
    {
      accessorKey: "price",
      header: "Price (#)",
      cell: ({ getValue }) => `#${getValue()}`,
    },
    {
      accessorKey: "owner.name",
      header: "Owner",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
   
  ];