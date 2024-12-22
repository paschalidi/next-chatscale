"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateApiKey } from "@/app/(console)/admin/api-keys/_services/api-keys.services";
import { useState } from "react";
import { GetCreateApiKeyResponse } from "@/app/(console)/admin/api-keys/_services/types";

// Define form schema
const apiKeySchema = yup.object({
  name: yup.string()
    .required("Key name is required")
    .min(3, "Key name must be at least 3 characters")
    .max(50, "Key name must be less than 50 characters"),
  key_type: yup.string()
    .required("Select a key type is required")
    .oneOf(["ReadWrite", "ReadOnly"], "Invalid environment selected"),
});

export type ApiKeyFormData = yup.InferType<typeof apiKeySchema>;
// type gk =  async function handleKeyGeneration(     data: ApiKeyFormData, ): Promise<GetCreateApiKeyResponse>

export function GenerateKeyDialog({
                                    open,
                                    onOpenChange,
                                    handleKeyAddition
                                  }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleKeyAddition:  (data: ApiKeyFormData) =>  Promise<GetCreateApiKeyResponse | undefined>;
}) {
  const [generatedKey, setGeneratedKey] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
    control,
    reset,
  } = useForm<ApiKeyFormData>({
    resolver: yupResolver(apiKeySchema),
    defaultValues: {
      name: "",
      key_type: "ReadWrite",
    },
  });

  const onSubmit = async (data: ApiKeyFormData) => {
    try {
      const apiKey = await handleKeyAddition(data);
      if (apiKey) {
        setGeneratedKey(apiKey.key);
      }
    } catch (error) {
      console.error("Failed to generate API key:", error);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setGeneratedKey("");
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <p>Generate new API key</p>
        </DialogHeader>
        {!generatedKey ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">
                Key name
              </label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Production API Key"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Key type</label>
              <Controller
                name="key_type"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className={errors.key_type ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select key type"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ReadWrite">ReadWrite</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.key_type && (
                <p className="text-sm text-red-500">{errors.key_type.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit">Generate key</Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your new API key</label>
              <div className="p-4 bg-muted rounded-md">
                <code className="text-sm break-all">{generatedKey}</code>
              </div>
              <p className="text-sm text-muted-foreground">
                Make sure to copy your API key now. You won&apos;t be able to see it again!
              </p>
            </div>
            <DialogFooter>
              <Button onClick={handleClose}>Done</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}