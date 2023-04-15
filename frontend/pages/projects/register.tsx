import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import { Progress } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";

function RegisterProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [step, setStep] = useState(1);

  const mdParser = new MarkdownIt();

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setBannerImage(file);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Project Name:", projectName);
    console.log("Project Description:", projectDescription);
    console.log("Banner Image:", bannerImage);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
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
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 hover:cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 hover:cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default RegisterProject;
