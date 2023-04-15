import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import PredictionModal from "./Modal/PredictModal";
type ProjectDetailProps = {
  title: string;
  description: string;
  price: number;
  // imageUrl: string;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  title,
  description,
  price,
  // imageUrl,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-white rounded-lg max-w-3xl mx-auto">
      <div className="relative h-96">
        <Image
          src="/next.svg"
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-blue-600 text-3xl mb-4">Funded: ${price}</p>
      </div>
      <div className="border-t border-gray-200">
        <div className="p-4 flex justify-between">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => router.push("/user")}
          >
            Back to Project List
          </button>
          <button
            className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 hover:cursor-pointer"
            onClick={handleOpenModal}
          >
            Deposit
          </button>
          <PredictionModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
