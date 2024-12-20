import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default async function AuthLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  const session = await auth();



  if (session?.user.id) {
    return redirect("/admin");
  }

  return (
    <div>
      <Header/>
      <div className="min-h-[calc(100vh-193px)] bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4">
          {children}
        </main>
      </div>
      <Footer/>
    </div>
  );
}