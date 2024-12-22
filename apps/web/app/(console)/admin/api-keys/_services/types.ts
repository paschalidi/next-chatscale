export type ApiKey = {
  id: string;
  name: string;
  key: string;
  key_type: string;
  created_at: string;
  last_used_at?: string;
};

export type GetAllApiKeysResponse = ApiKey[];
export type GetCreateApiKeyResponse = ApiKey;

export type ApiKeyFormData = {
  name: string;
  key_type: ApiKey['key_type'];
};