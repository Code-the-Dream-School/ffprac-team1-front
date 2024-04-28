import React, { useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { updateProject } from '../../util/fetchData';

const EditProject = ({
  projectId,
  projectTitle: initialProjectTitle,
  projectDesc: initialProjectDesc,
  projectRolesNeeded: initialProjectRolesNeeded,
  closeModal,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const allRoles = [
    'Mentor',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
    'Team Lead',
    'UI/UX Designer',
    'Project Manager',
    'DevOps Engineer',
    'Quality Assurance Engineer',
  ];

  const [projectData, setProjectData] = useState({
    title: initialProjectTitle,
    description: initialProjectDesc,
    rolesNeeded: initialProjectRolesNeeded,
  });

  const [technologies, setTechnologies] = useState({
    frontend: [],
    backend: [],
    design: [],
    projectManagement: [],
    devOps: [],
    qualityAssurance: [],
    database: [],
  });

  const availableTechnologies = {
    frontend: [
      'HTML/CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Angular',
      'Vue.js',
      'Svelte',
      'Next.js',
      'Redux',
      'Bootstrap',
      'Tailwind CSS',
      'SASS/LESS',
    ],
    backend: [
      'Node.js',
      'Express.js',
      'Django',
      'Ruby on Rails',
      'Java',
      'PHP Laravel',
      'Kotlin',
      'Go',
      'C#',
    ],
    design: ['Adobe XD', 'Sketch', 'Figma', 'InVision', 'Photoshop', 'Illustrator'],
    projectManagement: ['Jira', 'Trello', 'Asana', 'Confluence', 'Linear'],
    devOps: ['Docker', 'AWS', 'Azure', 'GCP', 'Jenkins', 'GitHub Actions', 'GitLab CI/CD'],
    qualityAssurance: ['Selenium', 'Jest', 'Mocha', 'Chai', 'Cypress', 'Postman', 'JMeter'],
    database: ['SQL', 'NoSQL', 'PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Cassandra'],
  };

  const handleProjectChange = e => {
    const { name, value } = e.target;
    setProjectData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleRoleChange = roleName => {
    setProjectData(prevData => ({
      ...prevData,
      rolesNeeded: prevData.rolesNeeded.includes(roleName)
        ? prevData.rolesNeeded.filter(role => role !== roleName)
        : [...prevData.rolesNeeded, roleName],
    }));
  };

  const handleTechnologyChange = (e, techType) => {
    const { value } = e.target;
    setTechnologies(prevTech => ({
      ...prevTech,
      [techType]: value !== '' ? [...prevTech[techType], value] : prevTech[techType],
    }));
  };

  const removeTechnology = (techType, technology) => {
    setTechnologies(prevTech => ({
      ...prevTech,
      [techType]: prevTech[techType].filter(tech => tech !== technology),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedTechnologies = { ...technologies };

    for (const techType in updatedTechnologies) {
      if (
        updatedTechnologies.hasOwnProperty(techType) &&
        updatedTechnologies[techType].length === 0
      ) {
        delete updatedTechnologies[techType];
      }
    }
    const updatedProject = {
      ...projectData,
      technologies: updatedTechnologies,
    };

    try {
      await updateProject(projectId, updatedProject);

      closeModal();
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Error updating project:', error.message);
      setError('Failed to update project. Please try again later.');
    }
  };

  return (
    <div className="max-h-[700px] overflow-y-auto">
      <header className="text-center text-xl pb-6 font-bold text-green"> Edit your project</header>
      <form className="w-full h-[90%] py-6 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center">
          <div className="w-[60%] flex flex-col">
            <label className="text-lg text-green/85">Project Title</label>
            <input
              type="text"
              name="title"
              placeholder=""
              value={projectData.title}
              onChange={handleProjectChange}
              className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent modal-input"
            />
            <label className="text-lg text-green/85">About Project</label>
            <textarea
              name="description"
              value={projectData.description}
              onChange={handleProjectChange}
              className="w-full min-h-fit bg-gray/5 text-white/80 p-4 rounded border border-transparent modal-input"
            />
            <div>
              <h2 className="ext-lg text-green/85 mt-5">Select technologies:</h2>
              {Object.entries(availableTechnologies).map(([techType, techList]) => (
                <div key={techType} className="mt-3 flex flex-row bg-black">
                  <select
                    name={`selected${techType.charAt(0).toUpperCase() + techType.slice(1)}`}
                    value={''}
                    onChange={e => handleTechnologyChange(e, techType)}
                    className="bg-black z-10 text-white outline-none "
                  >
                    <option
                      value=""
                      className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      {techType}
                    </option>
                    {techList
                      .filter(tech => !technologies[techType].includes(tech))
                      .map((tech, index) => (
                        <option value={tech} key={index}>
                          {tech}
                        </option>
                      ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="flex flex-row mt-8 mb-4 flex-wrap">
              {Object.entries(technologies).map(([techType, techArray]) =>
                techArray.map((tech, index) => (
                  <div className="flex flex-row items-center mr-1" key={`${techType}-${index}`}>
                    <div>{tech}</div>
                    <XCircleIcon
                      onClick={() => removeTechnology(techType, tech)}
                      strokeWidth="1"
                      className="h-5 w-5 stroke-blue/50 hover:stroke-blue hover:cursor-pointer ml-1"
                    />
                  </div>
                )),
              )}
            </div>
            <h2 className="ext-lg text-green/85 mt-5">Select roles:</h2>
            <div className="mt-2 pb-10 grid grid-cols-2">
              {allRoles.map((role, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    name={role}
                    value={role}
                    checked={projectData.rolesNeeded.includes(role)}
                    onChange={() => handleRoleChange(role)}
                    className="mr-2 h-4 w-4 cursor-pointer checkbox border-blue/60 checked:border-greenDark [--chkbg:theme(colors.greenDark)] [--chkfg:black]"
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="flex flex-row w-full justify-center items-center pt-8">
          <button variant="gradient" color="green" className="btn-primary text-black w-[30%] ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
