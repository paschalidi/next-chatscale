import { auth } from "@/auth/auth";
import { PageLoginView } from "@/app/(auth)/auth/login/PageLoginView";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await auth()

  if (user) {
    redirect('/admin')
  }
  return <PageLoginView/>
}