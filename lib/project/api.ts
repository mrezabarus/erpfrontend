const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
//const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://erpfullstack.onrender.com/";


export interface Project {
  id: string;
  nama_project: string;
  description: string;
  status: string;

}
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE_URL}/projects`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

/* Create Project */

export async function createProject(data:{
  nama_project: string;
  description: string;
}){
  const res = await fetch(`${API_BASE_URL}/projects`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if(!res.ok){
    throw new Error('Failed to create project');
  }

  return res.json();
}