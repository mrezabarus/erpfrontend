// ❌ JANGAN tulis "use client"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Ini boleh async atau tidak, bebas, YANG PENTING: cookies() TIDAK DI-AWAIT
export default async function HomePage() {
  const cookieStore = cookies(); // ✅ TANPA AWAIT
  const token = cookieStore.get("access_token"); // ✅ Ini valid

  if (!token) {
    redirect("/login");
  }

  redirect("/home");
}
