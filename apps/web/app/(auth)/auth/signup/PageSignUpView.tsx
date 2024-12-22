'use client'

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createOrgSchema } from "@/app/(auth)/auth/signup/_cargo/schema";
import { CreateOrgFormValues } from "@/app/(auth)/auth/signup/_cargo/types";
import { useMutateCreateAccountOrg } from "@/app/(auth)/auth/signup/_cargo/actions";
import Link from "next/link";
import { useState } from "react";


export const SignupView = () => {
  const [error, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<CreateOrgFormValues>({
    defaultValues: {
      email: "",
      password: "",
      organization_name: "",
    },
    resolver: yupResolver(createOrgSchema),
  });

  const { mutateAsync } = useMutateCreateAccountOrg();
  const onSubmit = async (data: CreateOrgFormValues) => {
    try {
      await mutateAsync(data);
      router.push("/admin");
    } catch (error) {
      setServerError("Please use a different email.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className={'w-full max-w-xl mx-auto'}>
      <div className="flex flex-col gap-8 w-full items-center">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="text-gray-500">Create your organization to continue</p>
        </div>
        <Card className="p-6 w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work email</FormLabel>
                    <FormControl>
                      <Input required type="email" placeholder="you@company.com" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input required type="password" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization_name"
                rules={{ required: "Organization name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization name</FormLabel>
                    <FormControl>
                      <Input required placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormMessage>{error}</FormMessage>
            </div>

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              Create account
            </Button>
          </form>
        </Form>
      </Card>
      </div>
      <div className="text-center mt-3">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login " className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}