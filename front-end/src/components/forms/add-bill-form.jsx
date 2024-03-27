import { createBillApi } from "@/api/services/bill";
import { getUserGroupsApi } from "@/api/services/group";
import { billSchema } from "@/lib/validations/bill";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoadingButton from "../button/loading-button";
import { MultiSelect } from "../multi-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function AddBillForm() {
  const [payers, setPayers] = React.useState([]);
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: yupResolver(billSchema),
    defaultValues: {
      title: "",
      price: 0,
      group: "",
      payers: [],
    },
  });

  const { watch } = form;

  const { data: groups } = useQuery({
    queryKey: ["groups"],
    queryFn: getUserGroupsApi,
    select: ({ data }) =>
      data.map((group) => ({
        label: group.name,
        value: group._id,
        members: group.members.map(({ userId: user }) => ({
          label: user.name,
          value: user._id,
        })),
      })),
  });

  const createBillMutation = useMutation({
    mutationFn: createBillApi,
    onSuccess: () => {
      toast.success("Bill added successfully.");
      form.reset();
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const groupId = watch("group");
  let users = [];
  if (groupId) {
    users = groups.find((group) => group.value === groupId).members;
  }

  const onSubmit = (data) => {
    if (createBillMutation.isPending) return;
    createBillMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full max-x-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={Number.isNaN(field.value) ? "" : field.value}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group</FormLabel>
              <Select
                value={field.value?.toString()}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {(groups ?? []).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {users?.length > 0 && (
          <FormField
            control={form.control}
            name="payers"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Payers</FormLabel>
                <FormControl>
                  <MultiSelect
                    placeholder="Select payers"
                    selected={payers}
                    setSelected={setPayers}
                    options={users}
                    onChange={(data) => {
                      field.onChange((data ?? []).map((el) => el.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <LoadingButton loading={createBillMutation.isPending}>
          Add Bill
          <span className="sr-only">Add Bill</span>
        </LoadingButton>
      </form>
    </Form>
  );
}
