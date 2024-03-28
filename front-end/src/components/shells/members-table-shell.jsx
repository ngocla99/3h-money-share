import { deleteUserFromGroupApi, updateGroupApi } from "@/api/services/group";
import { GROUP_ROLES } from "@/lib/constants/group";
import { formatDate } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { DataTable } from "../data-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const MembersTableShell = ({ dataTable, isSearchable = true, user }) => {
  const { data, pageCount } = dataTable;
  const queryClient = useQueryClient();

  const updateUserRoleMutation = useMutation({
    mutationFn: updateGroupApi,
    onMutate: () => toast.loading("Updating..."),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["group", "65f7b2f50421b8c39655f5d4"],
      });
      toast.dismiss();
      toast.success("Role user updated successfully.");
    },
    onError: (err) => {
      toast.dismiss();
      toast.error("Role user updated unsuccessfully.");
    },
  });

  const deleteUserFromGroupMutation = useMutation({
    mutationFn: deleteUserFromGroupApi,
    onMutate: () => toast.loading("Deleting..."),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["group", "65f7b2f50421b8c39655f5d4"],
      });
      toast.dismiss();
      toast.success("User deleted successfully.");
    },
    onError: (err) => {
      toast.dismiss();
      toast.error("User deleted unsuccessfully.");
    },
  });

  const columns = React.useMemo(
    () => [
      {
        id: "user",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User" />
        ),
        cell: ({ row }) => {
          const { _id, name, email } = row.original;
          return (
            <div className="flex gap-4">
              <Avatar className="size-11">
                <AvatarImage src="https://github.com/shadcn.png" alt={name} />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
              <div className="max-w-[30ch]">
                <div className="flex gap-1 items-center">
                  <span>{name}</span>
                  {user?._id === _id && (
                    <Badge className="px-1.5 text-[11px] leading-[1.1]">
                      You
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-[13px] truncate">
                  {email}
                </p>
              </div>
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Joined" />
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
        cell: ({ cell, row }) => {
          return (
            <Select
              value={cell.getValue()}
              disabled={updateUserRoleMutation.isPending}
              onValueChange={(value) => {
                const data = {
                  members: [{ userId: row.original._id, role: value }],
                };
                updateUserRole("65f7b2f50421b8c39655f5d4", data);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {GROUP_ROLES.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          );
        },
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
                onClick={() => {
                  const data = { members: [row.original._id] };
                  deleteUserFromGroup("65f7b2f50421b8c39655f5d4", data);
                }}
                disabled={deleteUserFromGroupMutation.isPending}
              >
                Remove member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [user]
  );

  const updateUserRole = (id, data) => {
    if (updateUserRoleMutation.isPending) return;
    updateUserRoleMutation.mutate({ id, data });
  };

  const deleteUserFromGroup = (id, data) => {
    if (updateUserRoleMutation.isPending) return;
    deleteUserFromGroupMutation.mutate({ id, data });
  };

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
