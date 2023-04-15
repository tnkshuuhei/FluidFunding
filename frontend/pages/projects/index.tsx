// index.tsx
import React from "react";
import Header from "@/components/Header";
import Link from "next/link";

function Projects() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-16">
            Welcome! Let's get started with registration
          </h1>
          <Link href="/projects/register">
            <button className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 hover:cursor-pointer">
              Start Registration
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Projects;
