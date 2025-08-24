import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies(); // ✅ pakai await
  const token = cookieStore.get("access_token");
  

  if (!token) {
    return <div>Unauthorized</div>;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    headers: {
      Cookie: `access_token=${token.value}`,
    },
  });

  if (!res.ok) {
    return <div>Gagal mengambil data user</div>;
  }

  const data = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Selamat datang, {data.email} ({data.name})</p>
    </div>
  );
}
