import { createGroupApi } from "@/api/services/group";
import { groupSchema } from "@/lib/validations/group";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HelpCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import LoadingButton from "../button/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function CreateGroupForm({ setShowModal }) {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: yupResolver(groupSchema),
    defaultValues: {
      imageUrl: "",
      name: "",
      slug: "",
    },
  });

  const createGroupMutation = useMutation({
    mutationFn: createGroupApi,
    onSuccess: () => {
      toast.success("Group created successfully.");
      form.reset();
      setShowModal(false);
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    if (createGroupMutation.isPending) return;
    createGroupMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full max-x-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Url</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>Group name</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  onChange={(e) => {
                    form.setValue(
                      "slug",
                      slugify(e.target.value, { lower: true })
                    );
                    form.trigger("slug");
                    onChange(e);
                  }}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Slug URL
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    A slug is a human-readable ID that must be unique. It&apos;s
                    often used in URLs.
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton loading={createGroupMutation.isPending}>
          Add Group
          <span className="sr-only">Add Group</span>
        </LoadingButton>
      </form>
    </Form>
  );
}
