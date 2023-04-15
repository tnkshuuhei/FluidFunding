// components/CustomModal.tsx
import React, { useState } from "react";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PredictionModal: React.FC<CustomModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleConfirm = () => {
    console.log("Confirmed with amount:", amount);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4">
          <div className="flex justify-between">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={() => console.log("Yes")}
            >
              YES
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => console.log("No")}
            >
              NO
            </button>
          </div>
          <div className="mt-4">
            <label
              htmlFor="amount"
              className="block text-sm font-semibold text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900"
            />
          </div>
        </div>
        <div className="border-t border-gray-200 p-4 flex justify-between">
          <button
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Back
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionModal;
