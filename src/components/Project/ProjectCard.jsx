import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from '@material-tailwind/react';

// this infirmation will be fassed as a prop from
const project = {
  name: 'Revolutionary New Social Platform',
  description: 'project description',
  technologies: ['React', 'Tailwind', 'Node.js', 'Express'],
  status: 'Seeking Team Members',
  rolesNeeded: ['UI designer', 'React Developer', 'Backend Developer'],
};

const ProjectCard = ({}) => {
  return (
    <Card className="max-w-[14rem] min-w-[12rem] overflow-hidden rounded-xl border border-blue/20 hover:border-blue/70 hover:shadow hover:shadow-blue/30 mb-6 mr-8">
      <a href="url-to-the-individual-project">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none max-h-24 opacity-70"
        >
          <img
            src="https://source.unsplash.com/white-and-gray-optical-illusion-7JX0-bfiuxQ"
            alt="project img"
          />
        </CardHeader>
        <CardBody className="p-3">
          <div className=" flex flex-row pb-2">
            <img
              className="h-10 w-10 rounded-full"
              src="https://source.unsplash.com/a-rubik-cube-is-shown-on-a-white-background-fd6K_OFlnRA"
              alt="project logo"
            />
            <Typography variant="h3" className="text-xs font-[Jura] pl-4 font-medium">
              {project.name}
            </Typography>
          </div>
          {/* <Typography variant="lead" color="gray" className="mt-2 font-normal text-[10px] max-h-20">
            {project.description}
          </Typography> */}
          <div variant="lead" color="gray" className="mt-2 font-normal text-[10px]">
            <div className="font-normal text-[10px] text-green text-[11px] font-medium">
              Technologies:
            </div>
            {project.technologies.map((item, index) => (
              <span key={index} className="font-sans font-extralight text-[10px]">
                {' '}
                {item + ', '}{' '}
              </span>
            ))}
          </div>
          <Typography className="font-[Jura] text-[12px] text-center text-blue font-medium py-2 mt-2">
            {project.status}
          </Typography>
          <div variant="lead" color="gray" className="font-normal text-[10px]">
            <div className="font-normal text-[10px] text-green text-[11px] font-medium">
              Rooles Needed:
            </div>
            {project.rolesNeeded.map((item, index) => (
              <span key={index} className="font-sans font-extralight text-[10px]">
                {' '}
                {item + ', '}{' '}
              </span>
            ))}
          </div>
        </CardBody>
      </a>
      {/* This will be part of Authorized rout */}
      <CardFooter className="flex items-center justify-start p-4">
        <div className="font-normal text-[10px] text-green text-[11px] font-medium pr-4">
          Participants:
        </div>
        <div className="flex items-center -space-x-3">
          <Tooltip content="Natali Craig" className="font-sans font-extralight text-[10px]">
            {/* Avatar can be linked to the profile of the user on Authorized rout */}
            <a href="/profile">
              <Avatar
                alt="natali craig"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                className="border-2 border-blue  h-8 w-8 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
              />
            </a>
          </Tooltip>
          <Tooltip content="Tania Andrew" className="font-sans font-extralight text-[10px]">
            <a href="/profile">
              <Avatar
                size="sm"
                variant="circular"
                alt="tania andrew"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                className="border-2 border-blue h-8 w-8 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
              />
            </a>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
