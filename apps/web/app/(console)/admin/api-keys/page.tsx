import { fetchApiKeys } from "@/app/(console)/admin/api-keys/_services/api-keys.services";
import { ApiKeysPageView } from "@/app/(console)/admin/api-keys/_components/ApiKeysPageView";

export default async function APIKeys() {
  const apiKeys = await fetchApiKeys();

  return <ApiKeysPageView apiKeys={apiKeys}/>
}