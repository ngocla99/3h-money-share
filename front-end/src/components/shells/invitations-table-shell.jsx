import { GROUP_ROLES } from "@/lib/constants/group";
import { formatDate, getLabelFromValue } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import { DataTable } from "../data-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const InvitationsTableShell = ({ dataTable }) => {
  const { data, pageCount } = dataTable;

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User" />
        ),
        cell: ({ cell }) => (
          <p className="font-semibold text-[13px] truncate">
            {cell.getValue()}
          </p>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Invited" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue()),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Role"
            className="min-w-28"
          />
        ),
        cell: ({ cell }) => (
          <p className="text-muted-foreground">
            {getLabelFromValue(GROUP_ROLES, cell.getValue())}
          </p>
        ),
        enableColumnFilter: false,
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
            <DropdownMenuContent align="end">
              <DropdownMenuItem
              // onClick={() => {
              //   const data = { members: [row.original._id] };
              //   deleteUserFromGroup("65f7b2f50421b8c39655f5d4", data);
              // }}
              // disabled={deleteUserFromGroupMutation.isPending}
              >
                Revoke invitation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      enableColumnsFilter={false}
      classes={{ tableRoot: "border-none" }}
    />
  );
};
