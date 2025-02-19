import { toast } from "@/hooks/use-toast";
import { danger} from "@/lib/toastClass";
import { AppDispatch, RootState } from "@/redux/store";
import DataTable, { TableProps } from "@/templates/DashTemp"
import { RejectedPayload, UserInt} from "@/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {columns} from "@/pages/dashboard/tenants/columns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { getAllTenants } from "@/redux/tenant/tenantAsync";
import ViewTenant from "./modals/ViewTenant";
import EditTenant from "./modals/EditTenant";
const Tenants: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {userInfo} = useSelector((state : RootState) => state.user)
  const {
    loading,
    tenants
  } = useSelector((state :RootState) => state.tenant)
  useEffect(() =>{
    dispatch(getAllTenants({adminId : userInfo?.user._id as string})).unwrap().catch((error: RejectedPayload) => {
      toast({
          title: "Failed!",
          description: error.message,
          className: danger,
      });
  });
  }, [dispatch, userInfo?.user._id]);
  const [modalState,setModalState] = useState<{
    type : "edit" | "view" |null,
    data : Row<UserInt["user"]> | null
  }>({
    type : null,
    data : null
  })
  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: "edit"| "view" |null,
    row : Row<UserInt["user"]>
) => {
    event.stopPropagation();
    setModalState({
        type,
        data: row,
    });
};
  const tableProps: TableProps<UserInt["user"], string | number> = {
    tableTitle : "Tenants",
    data : tenants,
    columns : [...columns,
       {
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
                      handleClick(e,"view",row);
                  }}
              >
                  View Tenant
              </DropdownMenuItem>
              <DropdownMenuItem
                  className="flex w-full cursor-pointer justify-center"
                  onClick={(e) => {
                      handleClick(e,"edit",row);
                  }}
              >
                  Edit Tenant
              </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>)
      }
    }],
    searchKey : "name",
    isLoading : loading.get,
    noData : <div>No tenant yet add one</div>
    
};

  return (
    <section>
        <DataTable {...tableProps}/>
        <ViewTenant open={modalState.type==="view"} onClose={() => setModalState({type : null, data : null})} rowData={modalState.data}/>
        <EditTenant
        open={modalState.type === "edit"}
        onClose={ () => setModalState({type : null, data : null})}
        rowData={modalState.data as  Row<UserInt["user"]>}
         />
    </section>
  )
}

export default Tenants

