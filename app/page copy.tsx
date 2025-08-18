'use client';

import { useState } from "react";
import { getProjects, Project } from "@/lib/project/api";

export default async function Home() {
  const projects = await getProjects();
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      
      <h1>Home</h1>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </div>
  );
}
