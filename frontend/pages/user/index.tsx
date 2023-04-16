import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/utils/external-services/curveGrid";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [matchedFunding, setMatchedFunding] = useState([]);

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

  // Calculate match for each grant
  const calculateMatch = (data: any, match: any) => {
    let newData = data; // Collect data
    let summed = 0; // Setup summed grant contributions
    let urlParams = "?";

    // Loop over each grant
    for (let i = 0; i < newData.length; i++) {
      let sumAmount = 0;
      urlParams += i == 0 ? "grant=" : "&grant=";

      // Sum the square root of each grant contribution
      for (let j = 0; j < newData[i].funding.length; j++) {
        urlParams +=
          j == 0 ? newData[i].funding[j] : "," + newData[i].funding[j];
        sumAmount += Math.sqrt(newData[i].funding[j]);
      }

      // Square the total value of each summed grants contributions
      sumAmount *= sumAmount;
      newData[i].match = sumAmount;
      summed += sumAmount;
    }

    urlParams += `&match=${match}`;

    // Setup a divisor based on available match
    let divisor = match / summed;
    // Multiply matched values with divisor to get match amount in range of available funds
    for (let i = 0; i < newData.length; i++) {
      newData[i].match *= divisor;
    }

    // Set url parameters
    history.pushState({}, null, urlParams);

    // // Set new data
    // setData([...newData]);
  };

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
