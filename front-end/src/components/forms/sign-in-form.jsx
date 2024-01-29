import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signInApi } from "@/api/services/auth";
import { Icons } from "@/components/icons";
import { PasswordInput } from "@/components/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/validations/auth";
import { useAuth } from "@/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../button/loading-button";

export const SignInForm = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  // react-hook-form
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInMutation = useMutation({
    mutationFn: signInApi,
    onSuccess: ({ data }) => {
      navigate("/");
      setToken(data.token);
    },
    onError: (err) => {
      console.log("🚀 ~ SignInForm ~ err:", err);
    },
  });

  const onSubmit = (data) => {
    if (signInMutation.isLoading) return;
    signInMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="nemo@nemo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={signInMutation.isPending}>
          Sign in
          <span className="sr-only">Sign in</span>
        </LoadingButton>
      </form>
    </Form>
  );
};
