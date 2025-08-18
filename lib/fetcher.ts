export async function customFetch(url: string, options?: RequestInit){
    const res = await fetch(url, {
        ...options,
        credentials: 'include',
    });

    if (res.status === 401){
        window.dispatchEvent(new Event("token-expired"));
        throw new Error("Unathorized - token expired");
    }

    return res;
}