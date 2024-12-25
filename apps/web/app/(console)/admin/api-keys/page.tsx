import { fetchApiKeys } from "@/app/(console)/admin/api-keys/_services/api-keys.services";
import { ApiKeysPageView } from "@/app/(console)/admin/api-keys/_components/ApiKeysPageView";
import { auth } from "@/auth/auth";
import { notFound } from "next/navigation";

export default async function APIKeys() {
  const apiKeys = await fetchApiKeys();
  const { user } = await auth() ?? {};

  if (!user) {
    return notFound();
  }

  return <ApiKeysPageView apiKeys={apiKeys} organizationId={user?.organizationId}/>
}