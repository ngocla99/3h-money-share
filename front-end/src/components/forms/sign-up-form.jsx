import { signUpApi } from "@/api/services/auth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/validations/auth";
import { useAuth } from "@/providers/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import LoadingButton from "../button/loading-button";
import { PasswordInput } from "../password-input";

export function SignUpForm() {
  const { setToken } = useAuth();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUpApi,
    onSuccess: ({ data }) => {
      redirect("/");
      setToken(data.token);
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      console.log("🚀 ~ SignUpForm ~ err:", err);
    },
  });

  const onSubmit = (data) => {
    if (signUpMutation.isLoading) return;
    try {
      signUpMutation.mutate(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => {
          console.log(err);
        })}
        className='grid gap-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='nemo' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='nemo@nemo.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={signUpMutation.isLoading}>
          Continue
          <span className='sr-only'>Continue to email verification page</span>
        </LoadingButton>
      </form>
    </Form>
  );
}
