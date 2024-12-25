export const config = {
  chat_scale_api_url: process.env.API_URL ?? "http://127.0.0.1:3001",
  auth_secret: process.env.AUTH_SECRET,
  rechat_app_id: process.env.RECHAT_APP_ID,
  rechat_api_key: process.env.REACHAT_API_KEY
}