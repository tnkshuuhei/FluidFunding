import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import PredictionModal from "./Modal/PredictModal";
import SuperfluidSDK from "@superfluid-finance/js-sdk";
import Web3 from "web3";
import { useAuth } from "@/contexts/auth";
type ProjectDetailProps = {
  title: string;
  description: string;
  price: number;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  title,
  description,
  price,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moneystream, setMoneystream] = useState(null);
  const { provider, address } = useAuth();

  //     const recipientAddress = "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669"; //test account
  //     const userAddress = "0xd4dB78F13Bc28c84211f2D8795B1aAd6c24e56bB";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // Use API to get amount from blockchain
  const startdate = new Date("2023-04-01"); // started date of the grant distribution(timestamp)
  const deadline = new Date("2023-05-01"); // deadline of the grant and project milestone achievements
  const sumamount = 1000000; // the amount of money that the project will receive till the deadline
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateReceivedAmount = () => {
      const elapsedTimeInMilliseconds =
        currentDate.getTime() - startdate.getTime();
      const totalPeriodInMilliseconds =
        deadline.getTime() - startdate.getTime();
      const flowRatePerMillisecond = sumamount / totalPeriodInMilliseconds;
      const newReceivedAmount =
        elapsedTimeInMilliseconds * flowRatePerMillisecond;
      setReceivedAmount(newReceivedAmount);
      console.log(receivedAmount);
    };

    updateReceivedAmount();
  }, [startdate, deadline, sumamount, currentDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
        <p className="text-blue-600 text-3xl mb-4">
          Funded: ${receivedAmount.toFixed(2)}
        </p>
        {/* {moneystream ? (
          <p className="text-green-600 text-xl mb-4">
            Moneystream: {moneystream} tokens/sec
          </p>
        ) : (
          <p>Loading moneystream...</p>
        )} */}
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
