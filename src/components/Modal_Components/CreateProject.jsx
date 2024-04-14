import React, { useState } from 'react';
import { Input, Select, Option, Textarea } from '@material-tailwind/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const CreateProject = () => {
  const API_BASE_URL_PROJECTS = 'http://localhost:8000/api/v1/projects';
  const [projectName, setProjectName] = useState('');
  const [aboutProject, setAboutProject] = useState('');
  const [rolesNeeded, setRolesNeeded] = useState([]);
  const [rolesNeededList, setRolesNeededList] = useState([
    'Mentor',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
    'Team Lead',
    'UI/UX Designer',
    'Project Manager',
    'DevOps Engineer',
    'Quality Assurance Engineer',
  ]);
  const handleNameChange = e => {
    setProjectName(e.target.value);
  };
  const handleAboutChange = e => {
    setAboutProject(e.target.value);
  };
  const handleSelectChange = selectedRole => {
    if (selectedRole && selectedRole !== ' ') {
      setRolesNeeded(prev => [...prev, selectedRole]);
      setRolesNeededList(prev => prev.filter(item => item !== selectedRole));
    }
  };
  const removeItem = roleToRemove => {
    setRolesNeeded(rolesNeeded.filter(role => role !== roleToRemove));
    setRolesNeededList([...rolesNeededList, roleToRemove]);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    if (!projectName || !aboutProject || rolesNeeded.length === 0) {
      console.error('All fields must be filled and there must be at least one role selected.');
      return;
    }
    const projectData = {
      title: projectName,
      description: aboutProject,
      rolesNeeded: rolesNeeded,
    };
    console.log(projectData);
    try {
      const response = await axios.post(API_BASE_URL_PROJECTS, projectData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log('Project Created:', response.data);
    } catch (error) {
      console.error('Error creating project:', error.response?.data || error);
    }
  };
  return (
    <div className="h-fit overflow-scrolling">
      <header className="text-center text-xl pb-6 font-bold text-green">Create New Project</header>
      <form className="w-full h-[90%] py-6 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center">
          <div className="w-[60%] flex flex-col">
            <Input label="Project Name" value={projectName} onChange={handleNameChange} />
            <Textarea
              label="About Project"
              value={aboutProject}
              onChange={handleAboutChange}
              className="mt-10"
            />
            <div className="mt-10 pb-10">
              <Select label="Roles Needed" className="bg-black z-10" onChange={handleSelectChange}>
                {rolesNeededList.map((item, id) => (
                  <Option key={id} value={item} className="bg-black hover:bg-gray-700">
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              {rolesNeeded.map((item, index) => (
                <div key={index} className="flex flex-row items-center space-x-2">
                  <span>{item}</span>
                  <XCircleIcon
                    onClick={() => removeItem(item)}
                    className="h-5 w-5 stroke-blue/50 hover:stroke-blue cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full mt-4">
          <button type="submit" className="btn-primary text-black w-[30%]">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateProject;