import { auth } from "@/auth/auth";
import { SignupView } from "@/app/(auth)/auth/signup/PageSignUpView";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await auth()

  if (user) {
    redirect('/admin')
  }
  return <SignupView/>
}