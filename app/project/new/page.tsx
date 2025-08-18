'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/project/api";

export default function NewProjectPage() {
    const [nama, setNama] = useState('');
    const [desc, setDesc] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createProject({
                nama_project: nama, 
                description: desc,
            });

            router.push('/project');
        }catch (err) {
            alert("gagal membuat project");
            console.error(err)
        }
    };

    return (
        <div className="w-full px-5 mt-5">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Tambah Project Baru</h1>
            <div className="bg-white shadow-md rounded-xl p-8 border border-gray-200">
                <div className="max-w-md">
                    {/* <h1 className="text-2xl font-bold mb-6 text-gray-800">Tambah Project Baru</h1> */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nama Project */}
                        <div className="flex items-center">
                            <label className="w-1/4 min-w-[120px] text-sm text-gray-700 font-medium">
                            Nama Project
                            </label>
                            <input
                            type="text"
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nama Project"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                            />
                        </div>

                        {/* Deskripsi */}
                        <div className="flex items-start">
                            <label className="w-1/4 min-w-[120px] text-sm text-gray-700 font-medium mt-2">
                            Deskripsi
                            </label>
                            <textarea
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Deskripsi"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>

                        {/* Tombol Submit */}
                        <div className="flex">
                            <div className="w-1/4 min-w-[120px]"></div>
                            <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                            >
                            Simpan
                            </button>
                        </div>
                        </form>
                </div>
            </div>
        </div>
    );
}