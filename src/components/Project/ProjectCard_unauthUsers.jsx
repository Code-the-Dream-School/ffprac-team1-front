import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Typography } from '@material-tailwind/react';

const ProjectCard = ({ project }) => {
  return (
    <Card className="max-w-[14rem] min-w-[12rem] overflow-hidden rounded-xl border border-blue/20 hover:border-blue/70 hover:shadow hover:shadow-blue/30 mb-2 mr-8">
      <Link to={`/projects/${project._id}`} 
        state={{ 
          projectId: project._id, 
          projectTitle: project.title, 
          projectStatus: project.status, 
          projectDesc: project.description,
          projectTechnologies: project.technologies,
          projectRolesNeeded: project.rolesNeeded 
        }}> 
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none max-h-24 opacity-70">
          <img
            src="https://source.unsplash.com/white-and-gray-optical-illusion-7JX0-bfiuxQ"
            alt="project img"
          />
        </CardHeader>
        <CardBody className="p-3">
          <div className="flex flex-row pb-2">
            <img
              className="h-10 w-10 rounded-full"
              src="https://source.unsplash.com/a-rubik-cube-is-shown-on-a-white-background-fd6K_OFlnRA"
              alt="project logo"
            />
            <Typography variant="h3" className="text-xs font-[Jura] pl-4 font-medium">
              {project.title}
            </Typography>
          </div>
          <div variant="lead" color="gray" className="mt-2 font-normal text-[10px]">
            <div className="font-normal text-[10px] text-green text-[11px] font-medium">
              Technologies:
            </div>
            <ul>{renderTechnologies(project.technologies)}</ul>
          </div>
          <Typography className="font-[Jura] text-[12px] text-center text-blue font-medium py-2 mt-2">
            {project.status}
          </Typography>
        </CardBody>
        <CardFooter
          variant="h3"
          className="text-[11px] text-right font-[Jura] pl-4 mb-2 mr-2 font-medium">
          See more...
        </CardFooter>
      </Link>
    </Card>
  );
};

const renderTechnologies = technologies => {
  if (!technologies) return null;

  const allTech = [];
  for (const type in technologies) {
    allTech.push(...technologies[type]);
  }

  const displayedTech = allTech.slice(0, 4);
  const etcTechCount = allTech.length - displayedTech.length;

  return (
    <div>
      {displayedTech.map((tech, index) => (
        <li key={index}>• {tech}</li>
      ))}
      {etcTechCount > 0 && <li>etc. ({etcTechCount} more)</li>}
    </div>
  );
};

export default ProjectCard;
