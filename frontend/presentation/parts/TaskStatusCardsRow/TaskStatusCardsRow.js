import { Box } from "@material-ui/core";
import { getData } from "../../../handler/apiHandler";
import StatusCard from "../../Components/Cards/StatusCard/StatusCard";
import { useState, useEffect } from "react";
import cookie from 'js-cookie'

const TaskStatusCardsRow = () => {
  const [projectsCounter, setProjectsCounter] = useState({});
  const [generatorCounter, setGeneratorCounter] = useState({});
  const seekerUser = cookie.get("seekerUser");
  const generatorUser = cookie.get("generatorUser");
  
  useEffect(() => {
    if (seekerUser) {
      getTotalSeekerProjects();
    }
    if (generatorUser) {
      getTotalGeneratorProjects();
    }
  }, []);

  const getTotalSeekerProjects = () => {
    getData(`/seeker/projects-count`, seekerUser).then((result) => {
      let response = result;
      setProjectsCounter(response?.data?.projectsCount);
    });
  };

  const getTotalGeneratorProjects = () => {
    getData(`/generator/projects-count`, generatorUser).then((result) => {
      let response = result;
      console.log(response)
      setGeneratorCounter(response?.data?.projectsCount);
    });
  };
  
  return (
    /* task status row */
    <Box
      mb={5}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {generatorUser ? (
        <span className="flex">
          <StatusCard text="Total Task" number={generatorCounter?.totalTask} />
          <StatusCard
            text="Ongoing"
            bgc="#84cb5b"
            number={generatorCounter?.ongoing}
          />
          <StatusCard
            text="Revision Request"
            bgc="#fe5292"
            number={generatorCounter?.revisionRequested}
          />
        </span>
      ) : (
        <span className="flex">
          <StatusCard text="Total Task" number={projectsCounter?.totalTask} />
          <StatusCard
            text="Ongoing"
            bgc="#84cb5b"
            number={projectsCounter?.ongoing}
          />
          <StatusCard
            text="Pending Payment"
            bgc="#fe5292"
            number={projectsCounter?.pendingPayment}
          />
        </span>
      )}
    </Box>
  );
};

export default TaskStatusCardsRow;
