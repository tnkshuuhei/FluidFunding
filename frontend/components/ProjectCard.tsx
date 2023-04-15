import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type ProjectCardProps = {
  title: string;
  description: string;
  price: number;
  // imageUrl: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  price,
}) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow-md rounded-lg max-w-sm mx-5 my-4">
      <div className="relative h-64">
        <Image
          src="/next.svg"
          alt={title}
          width={500}
          height={500}
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-blue-600 text-2xl mb-4">${price}</p>
      </div>
      <div className="border-t border-gray-200">
        <div className="p-4 flex justify-between">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => router.push("/user/projectdetail")}
          >
            Check detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
