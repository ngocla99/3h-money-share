import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { deleteBillApi, deletesBillApi } from "@/api/services/bill";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatDate } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function BillsTableShell({ dataTable, isSearchable = true }) {
  const { data, pageCount } = dataTable;
  const [isPending, startTransition] = React.useTransition();
  const [selectedRowIds, setSelectedRowIds] = React.useState([]);
  const queryClient = useQueryClient();

  const deleteBillsMutation = useMutation({
    mutationFn: deletesBillApi,
    onMutate: () => toast.loading("Deleting..."),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      setSelectedRowIds([]);
      toast.dismiss();
      toast.success("Bills deleted successfully.");
    },
    onError: () => {
      setSelectedRowIds([]);
      toast.dismiss();
      toast.error("Bills deleted unsuccessfully.");
    },
  });

  const deleteBillMutation = useMutation({
    mutationFn: deleteBillApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
    onError: () => {},
  });

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedRowIds((prev) =>
                prev.length === data.length ? [] : data.map((row) => row._id)
              );
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, row.original._id]
                  : prev.filter((id) => id !== row.original._id)
              );
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue()),
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Title" />
        ),
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ cell }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Badge
                  variant="outline"
                  className={cn(
                    "pointer-events-none text-sm capitalize text-white",
                    "bg-blue-500"
                  )}
                >
                  {cell.getValue()}
                </Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Đang giao</DropdownMenuItem>
                <DropdownMenuItem>Hoàn thành</DropdownMenuItem>
                <DropdownMenuItem>Xếp lên xe</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "payers",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Payers" />
        ),
        cell: ({ cell }) => {
          return cell.getValue()[0].name;
        },
        enableSorting: false,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link
                // href={`/dashboard/stores/${storeId}/products/${row.original.id}`}
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link>View</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  startTransition(() => {
                    row.toggleSelected(false);

                    toast.promise(
                      deleteBillMutation.mutateAsync(row.original._id),
                      {
                        loading: "Deleting...",
                        success: () => "Bill deleted successfully.",
                        error: (err) => catchError(err),
                      }
                    );
                  });
                }}
                disabled={isPending}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [data, deleteBillMutation, isPending]
  );

  const deleteSelectedRow = () => {
    if (deleteBillsMutation.isPending) return;
    deleteBillsMutation.mutate({ bills: selectedRowIds });
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      searchableColumns={
        isSearchable
          ? [
              {
                id: "status",
                title: "Status",
              },
            ]
          : []
      }
      newRowLink="/bills/new"
      deleteRowsAction={deleteSelectedRow}
      //   filterableColumns={[
      //     {
      //       id: "status",
      //       title: "Trạng thái",
      //       options: statusesFilter,
      //     },
      //   ]}
    />
  );
}
