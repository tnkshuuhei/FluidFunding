import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import { Progress } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { getContract } from "@/utils/contract";
import { GRANT_CONTRACT_ADDRESS } from "@/utils/constants";
import { useAuth } from "@/contexts/auth";

import grantAbi from "../../utils/abis/grant.json";
import { ethers } from "ethers";

function RegisterProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [step, setStep] = useState(1);
  const [milestoneTitle, setMilestoneTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const { provider } = useAuth();

  const mdParser = new MarkdownIt();

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setBannerImage(file);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Project Name:", projectName);
    console.log("Project Description:", projectDescription);
    console.log("Banner Image:", bannerImage);

    // const contract = await getContract(
    //   grantAbi,
    //   GRANT_CONTRACT_ADDRESS,
    //   provider
    // );
    const contract = new ethers.Contract(
      GRANT_CONTRACT_ADDRESS,
      grantAbi,
      provider.getSigner()
    );
    console.log("contract", contract, await contract.totalProject());
    await contract
      .registerProject(
        projectName,
        "{}",
        "0xE8B0a2B0Ec112294E6c43cdfDe0Ead401be581e9",
        Math.floor(new Date().getTime() / 1000)
      )
      .then((tx: any) => tx.wait());
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Milestone Title:", milestoneTitle);
    console.log("Deadline:", deadline);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-lg shadow-md w-full max-w-2xl"
      >
        <Progress
          className="mb-4"
          value={step === 1 ? 50 : 100}
          size="xs"
          colorScheme="green"
        />
        <h2 className="text-3xl font-bold mb-8">Register Project</h2>
        {step === 1 && (
          <>
            <div className="mb-6">
              <label
                htmlFor="projectName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Project Name
              </label>

              <Textarea
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. My Awesome Project"
                size="md"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="bannerImage"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Banner Image
              </label>
              <input
                type="file"
                id="bannerImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="projectDescription"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Project Description
              </label>
              <Textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="e.g. This project is about..."
                size="md"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={15}
              />
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto bg-green-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 hover:cursor-pointer"
            >
              Next →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="milestoneTitle"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Milestone Title
                </label>
                <input
                  type="text"
                  id="milestoneTitle"
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 hover:cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 hover:cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </form>
          </>
        )}
      </form>
    </div>
  );
}

export default RegisterProject;
