import { customFetch } from "./fetcher";

//const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://erpfullstack.onrender.com/";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string){
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
    });

    console.log('Login response status:', res.status); // 🔍 Tambahkan ini

    if(!res.ok) throw new Error('Gagal Login');
    return res.json();
}

export async function logout() {
    const res = await customFetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
    });
    return res.json();
}

// export async function logout() {
//     const res = await fetch(`${API_BASE_URL}/auth/logout`, {
//         method: 'POST',
//         credentials: 'include',
//     });

//     console.log('Login response status:', res.status); // 🔍 Tambahkan ini

//     if(!res.ok) throw new Error('Logout Gagal');
// }

export async function getMe(){
    const res = await customFetch(`${API_BASE_URL}/auth/me`);
    return res.json();
};

// export async function getMe(){
//     const res = await fetch(`${API_BASE_URL}/auth/me`,{
//         method: 'GET',
//         credentials: 'include',
//     });

//     if(!res.ok) throw new Error('Gagal mengambil data');
//     return res.json();
// }