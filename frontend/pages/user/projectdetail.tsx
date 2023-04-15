import ProjectDetail from "../../components/ProjectDetail";

const ProjectDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <ProjectDetail
        title="Ethereum Foundation"
        description="The Ethereum Foundation is a Swiss nonprofit, based in Zug, Switzerland. It was established in 2014 to support the development of Ethereum and related technologies."
        price={450}
      />
    </div>
  );
};

export default ProjectDetailPage;
