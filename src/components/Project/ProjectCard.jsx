import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../AuthContext';
import { Card, CardHeader, CardBody, CardFooter, Typography } from '@material-tailwind/react';

const ProjectCard = ({ project, profile }) => {
  const {
    _id,
    title,
    status,
    description,
    technologies,
    rolesNeeded,
    likeCount,
    createdBy,
    projectPictureUrl,
    projectCoverPictureUrl,
    participants,
    participatingProjects,
  } = project;
  const { isLoggedIn } = useAuth();

  const renderTechnologies = technologies => {
    if (!technologies) return null;
    const allTech = Object.values(technologies).flat();

    const displayedTech = allTech.slice(0, 4);
    const etcTechCount = allTech.length - displayedTech.length;

    return (
      <div>
        {displayedTech.map(tech => (
          <li key={uuidv4()}>• {tech}</li>
        ))}
        {etcTechCount > 0 && <li>etc. ({etcTechCount} more)</li>}
      </div>
    );
  };
  return (
    <Card className="max-w-[13rem] min-w-[13rem] overflow-hidden bg-gray/10 rounded-xl border border-transparent hover:border-blue/30 mb-6 mr-8 p-4 min-h-[330px]">
      <Link
        to={`/projects/${_id}`}
        state={{
          projectId: _id,
          projectTitle: title,
          projectStatus: status,
          projectDesc: description,
          projectTechnologies: technologies,
          projectRolesNeeded: rolesNeeded,
          projectLikes: likeCount,
          projectCreator: createdBy,
          projectImage: projectPictureUrl,
          projectCoverImage: projectCoverPictureUrl,
          projectParticipants: participants,
          participateInProject: participatingProjects,
          profile: profile,
        }}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none max-h-24 opacity-70"
        >
          <div className=" flex flex-row">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={projectPictureUrl}
              alt="project logo"
            />
            <Typography variant="h3" className="text-xs font-[Jura] text-gray pl-4 font-medium">
              {title}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="">
          <div variant="lead" color="gray" className="mt-2 font-normal text-[10px]">
            <div className="font-normal text-[10px] text-green text-[11px] font-medium">
              Technologies:
            </div>
            <ul>{renderTechnologies(technologies)}</ul>
          </div>
          <Typography className="font-[Jura] text-[10px] text-center text-blue font-medium py-0.5 my-4 border-[0.5px] border-blue/80 rounded-full">
            {status}
          </Typography>
          <div variant="lead" color="gray" className="font-normal text-[10px]"></div>
        </CardBody>
        <CardFooter className="flex items-center justify-start pt-2">See more...</CardFooter>
      </Link>
    </Card>
  );
};

export default ProjectCard;
