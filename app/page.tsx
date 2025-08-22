import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();   // ✅ harus di-await
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/login");
  }

  redirect("/home");
}
