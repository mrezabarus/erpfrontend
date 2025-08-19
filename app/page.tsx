import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getCookiesSafe() {
  const result = cookies();
  return result instanceof Promise ? await result : result;
}

export default async function HomePage() {
  const cookieStore = await getCookiesSafe(); // ✅ aman untuk versi sync/async
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/login");
  }

  redirect("/home");
}
