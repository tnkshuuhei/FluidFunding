import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/utils/external-services/curveGrid";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(async (res: any) => {
      setProjects(
        res.data.result.map((result: any) => {
          const [sender, name, jsonDataStringified, fundingRecipient] =
            result.event.inputs;
          return {
            sender: sender.value,
            name: name.value,
            fundingRecipient: fundingRecipient.value,
            data: JSON.parse(jsonDataStringified.value),
          };
        })
      );
    });
  }, []);

  return (
    <div className="p-14 w-full flex flex-wrap justify-center">
      {projects.map((project: any, idx) => {
        return (
          <ProjectCard
            key={idx}
            title={project.name}
            description={project.data?.description}
            price={450}
          />
        );
      })}
    </div>
  );
};

export default Home;
