import { toast } from "@/hooks/use-toast";
import { danger} from "@/lib/toastClass";
import { getProperty } from "@/redux/properties/propertyAsync";
import { AppDispatch, RootState } from "@/redux/store";
import DataTable, { TableProps } from "@/templates/DashTemp"
import { Property, RejectedPayload} from "@/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {columns} from "@/pages/dashboard/Properties/columns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { AddTenant } from "./modals/AddTenant";
import MainPageHeader from "@/templates/MainPageHeader";
const Properties: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {userInfo} = useSelector((state : RootState) => state.user)
  const {
    properties,
    loading
  } = useSelector((state :RootState) => state.property)
  useEffect(() =>{
    dispatch(getProperty({estateId : userInfo?.user.estate as string})).unwrap().catch((error: RejectedPayload) => {
      toast({
          title: "Failed!",
          description: error.message,
          className: danger,
      });
  });
  }, [dispatch, userInfo?.user.estate]);
  const [modalState,setModalState] = useState<{
    type : "add" | null,
    data : Row<Property> | null
  }>({
    type : null,
    data : null
  })
  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: "add"|null,
    row : Row<Property>
) => {
    event.stopPropagation();
    setModalState({
        type,
        data: row,
    });
};
  const tableProps: TableProps<Property, string | number> = {
    tableTitle : "Properties",
    data : properties,
    columns : [...columns, {
      id : "actions",
      cell : ({row}) =>{
        return (<DropdownMenu>
          <DropdownMenuTrigger asChild>
              <div className="flex size-8 cursor-pointer items-center justify-center rounded-md border p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-5 w-5" />
              </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
              align="end"
              className="flex flex-col items-center"
          >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                  className="flex w-full cursor-pointer justify-center"
                  onClick={(e) => {
                      handleClick(e,"add",row);
                  }}
              >
                  Add Tenant
              </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>)
      }
    }],
    searchKey : "name",
    isLoading : loading.get,
    noData : <div>No property yet add one</div>
    
};

  return (
    <section>
        <MainPageHeader
        title=""
        btnTitle="Add a Property"
         />
        <DataTable {...tableProps}/>
        <AddTenant rowData={modalState.data} open={modalState.type === 'add'} onClose={() => setModalState({type : null, data : null})} />
    </section>
  )
}

export default Properties

