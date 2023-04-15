import React from "react";
import ProjectCard from "@/components/ProjectCard";
const Home = () => {
  return (
    <div className="p-14 w-max flex flex-col">
      <ProjectCard
        title="Ethereum Foundation"
        description="The Ethereum Foundation is a Swiss nonprofit, based in Zug, Switzerland. It was established in 2014 to support the development of Ethereum and related technologies."
        price={450}
      />
    </div>
  );
};

export default Home;
