import Link from "next/link";
import { getProjects, Project } from "@/lib/project/api";

export default async function Home() {
  const projects = await getProjects();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-3">
        <h1 className="text-2xl font-bold">Daftar Project</h1>
        
      </div>
      <div className="grid gap-4">
        {projects.map((project: Project) =>(
          <div
            key={project.id}
            className="bg-white shadow border border-gray-200 p-4 rounded"
          >
            <h2 className="text-lg font-semibold text-blue-600">
              {project.nama_project}
            </h2>
            <p className="text-sm text-gray-700">{project.description}</p>
            <p className="text-sm text-gray-700 italic mt-1">
              Status: {project.status }
            </p>
          </div>
        ))}  
      </div>
    </div>
  );
}
        