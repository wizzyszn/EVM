import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    Table as ReactTable,
  } from "@tanstack/react-table";
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Input } from "@/components/ui/input";
  import {
    ReactNode,
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import { Search } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import {
    FaFileExport,
    FaLongArrowAltLeft,
    FaLongArrowAltRight,
  } from "react-icons/fa";
  import { IoFilterSharp } from "react-icons/io5";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { DateRange } from "react-day-picker";
  import { Calendar } from "@/components/ui/calendar";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
  import { Label } from "@/components/ui/label";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  
  // Helper type for nested object keys
  type NestedKeys<T> = {
    [K in keyof T]: K extends string | number
      ? T[K] extends object
        ? K | `${K}.${NestedKeys<T[K]>}`
        : K
      : never;
  }[keyof T];
  
  export interface TableProps<TData, TValue> {
    columns?: ColumnDef<TData, TValue>[];
    data?: TData[];
    tableTitle: string;
    searchKey?: NestedKeys<TData>;
    noData?: ReactNode;
    children?: ReactNode;
    filterSection?: ReactNode;
    isLoading?: boolean;
    currentPage?: number;
    totalPages?: number;
    setCurrentPage?: Dispatch<SetStateAction<number>>;
    onRowClick?: (row: TData) => void;
    multipleDeletion?: {
      enabled: boolean;
      actionHandler: (table: ReactTable<TData>) => Promise<void>;
      isLoading: boolean;
      isOpen: boolean;
      setIsOpen: Dispatch<SetStateAction<boolean>>;
    };
    exportOptions?: {
      enabled: boolean;
      showDatePicker: boolean;
      buttonTitle: string;
      loading: boolean;
      minDate?: Date;
      maxDate?: Date;
      availableDates?: string[];
      actionHandler: (
        format: string,
        setExportOpen: Dispatch<SetStateAction<boolean>>,
        setDate: Dispatch<SetStateAction<DateRange | undefined>>,
        setExportFormat: Dispatch<SetStateAction<string>>,
        startDate?: Date,
        endDate?: Date
      ) => Promise<void>;
      formats: {
        label: string;
        value: string;
      }[];
    };
    hideFilter?: boolean;
  }
  
  function DataTable<TData, TValue>({
    columns,
    data,
    tableTitle,
    searchKey,
    noData,
    children,
    filterSection,
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    onRowClick,
    multipleDeletion,
    exportOptions,
    hideFilter,
  }: TableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const tableRef = useRef<HTMLTableElement | null>(null);
    const tableContainerRef = useRef<HTMLDivElement | null>(null);
    const [exportOpen, setExportOpen] = useState(false);
    const [exportFormat, setExportFormat] = useState("");
    const [date, setDate] = useState<DateRange | undefined>({
      from: undefined,
      to: undefined,
    });
  
    const table = useReactTable({
      data: data ?? [],
      columns: columns ?? [],
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
        columnFilters,
        rowSelection,
      },
      enableRowSelection: true,
    });

    const rowCount = useMemo(() => {
      if (!table || !data) return 0;
      return table.getRowModel().rows.length;
    }, [table, isLoading, data]);
  
    useEffect(() => {
      const containerEl = tableContainerRef.current;
      const tableEl = tableRef.current;
  
      if (containerEl && tableEl) {
        containerEl.style.height =
          tableEl.getBoundingClientRect().height + 20 + "px";
      } else if (containerEl && rowCount === 0) {
        containerEl.style.height = "320px";
      }
  
      return () => setRowSelection({});
    }, [currentPage, rowCount]);
    useEffect(() => {
      console.log("Data:", data);
      console.log("Columns:", columns);
      console.log("Table Rows:", table.getRowModel().rows);
    }, [data, columns, table]);
    return (
      <section className="relative my-7 overflow-hidden rounded-md border">
        <header className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-semibold">{tableTitle}</h3>
  
          {searchKey && (
            <div className="relative flex w-[50%] min-w-[150px] max-w-[600px] items-center">
              <Search size={15} className="absolute left-3 opacity-50" />
              <Input
                placeholder="Search here..."
                value={
                  (table
                    ?.getColumn(searchKey.toString())
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    ?.getColumn(searchKey.toString())
                    ?.setFilterValue(event.target.value)
                }
                className="w-full pl-8"
              />
            </div>
          )}
  
          <div className="flex items-center gap-4">
            {multipleDeletion?.enabled &&
              (table.getIsSomePageRowsSelected() ||
                table.getIsAllPageRowsSelected()) && (
                <Dialog
                  open={multipleDeletion.isOpen}
                  onOpenChange={
                    multipleDeletion.isLoading
                      ? undefined
                      : multipleDeletion.setIsOpen
                  }
                >
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      Delete Selected (
                      {table.getFilteredSelectedRowModel().rows.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action will permanently delete{" "}
                        {table.getFilteredSelectedRowModel().rows.length} selected
                        items. This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="ghost"
                        onClick={() => multipleDeletion.setIsOpen(false)}
                        disabled={multipleDeletion.isLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => multipleDeletion.actionHandler(table)}
                        disabled={multipleDeletion.isLoading}
                      >
                        {multipleDeletion.isLoading ? "Deleting..." : "Delete"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
  
            {exportOptions?.enabled && (
              <DropdownMenu open={exportOpen} onOpenChange={setExportOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="opacity-70">
                    <FaFileExport size={15} className="mr-2" /> Export
                  </Button>
                </DropdownMenuTrigger>
  
                <DropdownMenuContent className="w-[350px]">
                  <DropdownMenuLabel>Download data</DropdownMenuLabel>
  
                  {exportOptions.showDatePicker && (
                    <>
                      <h5 className="mb-1 mt-2 px-2 text-sm">
                        Select your date range
                      </h5>
                      <div className="mx-2 mb-3 rounded-md border border-input px-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-4 p-0 text-xs font-semibold hover:bg-transparent"
                            >
                              <span className="flex flex-grow gap-2">
                                From
                                <span className="text-muted-foreground">
                                  {date?.from
                                    ? date.from.toLocaleDateString()
                                    : "dd/mm/yy"}
                                </span>
                              </span>
                              <span className="flex flex-grow gap-2">
                                To
                                <span className="text-muted-foreground">
                                  {date?.to
                                    ? date.to.toLocaleDateString()
                                    : "dd/mm/yy"}
                                </span>
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={exportOptions.minDate}
                              selected={date}
                              onSelect={setDate}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </>
                  )}
  
                  <div className="px-2">
                    <h5 className="mb-1 text-sm">Select format</h5>
                    <RadioGroup onValueChange={setExportFormat}>
                      {exportOptions.formats.map((format, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={format.value}
                            id={format.label}
                          />
                          <Label htmlFor={format.label} className="text-sm">
                            {format.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
  
                  <div className="flex justify-end gap-2 px-2 py-4">
                    <Button
                      variant="outline"
                      className="text-xs"
                      onClick={() => setExportOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="text-xs"
                      onClick={() => {
                        exportOptions.actionHandler(
                          exportFormat,
                          setExportOpen,
                          setDate,
                          setExportFormat,
                          date?.from as Date,
                          date?.to as Date
                        );
                      }}
                    >
                      {exportOptions.loading
                        ? "Exporting..."
                        : exportOptions.buttonTitle}
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
  
            {!hideFilter && filterSection && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="opacity-70">
                    <IoFilterSharp size={15} className="mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>{filterSection}</DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>
  
        {children || (
          <>
            <div
              className="relative w-full overflow-x-auto overflow-y-hidden"
              ref={tableContainerRef}
            >
              {isLoading ? (
                <div className="h-[200px] w-full animate-pulse bg-muted" />
              ) : (
                <Table
                  className={` min-w-[1200px] border-b ${
                    rowCount ? "" : "h-[300px]"
                  }`}
                  ref={tableRef}
                >
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          className={onRowClick ? "cursor-pointer" : ""}
                          onClick={() => onRowClick?.(row.original)}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns?.length}
                          className="text-center"
                        >
                          {noData || "No results."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
            {!!rowCount && (
              <div className="flex items-center justify-between px-4 py-3">
                <div className="text-xs text-muted-foreground">
                  Page {currentPage} of {totalPages ?? 0}
                </div>
  
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages ?? 0 }, (_, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`${
                        (currentPage ?? 0) - 1 === index
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                      } px-3 text-xs`}
                      onClick={() => setCurrentPage?.(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
  
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage?.((prev) => prev - 1)}
                    disabled={currentPage === undefined || currentPage === 1}
                    className="h-fit gap-2 py-1 text-xs"
                  >
                    <FaLongArrowAltLeft /> Previous
                  </Button>
  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage?.((prev) => prev + 1)}
                    disabled={
                      currentPage === undefined || currentPage === totalPages
                    }
                    className="h-fit gap-2 py-1 text-xs"
                  >
                    Next <FaLongArrowAltRight />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    );
  }
  
  export default DataTable;