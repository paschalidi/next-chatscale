"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SignInFormValues } from "@/app/(auth)/auth/login/_cargo/types";
import { singInSchema } from "@/app/(auth)/auth/login/_cargo/schema";
import { signInWrapper } from "@/auth/auth.services";
import { useState } from "react";

export function PageLoginView() {
  const [error, setServerError] = useState<string | null>(null);
  const form = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(singInSchema),
  });

  const onSubmit = async ({ email, password }: SignInFormValues) => {
    try {
      await signInWrapper({ email, password });
    } catch (error) {
      setServerError('Invalid credentials')
    }
  };

  return (
    <div className={'w-full max-w-xl mx-auto'}>
      <div className="flex flex-col gap-8 w-full items-center">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-500">Sign in to your account to continue</p>
        </div>

        <Card className="p-6 max-w-md w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
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
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: "Password is required",
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

              </div>
              <FormMessage>{error}</FormMessage>

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                Sign in
              </Button>
            </form>
          </Form>
        </Card>
      </div>

      <div className="text-center mt-3">
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}