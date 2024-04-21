import React, { useState } from 'react';
import { Input, Textarea } from '@material-tailwind/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const EditProject = ({
  projectId,
  projectTitle: initialProjectTitle,
  projectDesc: initialProjectDesc,
  projectRolesNeeded: initialProjectRolesNeeded,
}) => {
  const navigate = useNavigate();

  const [projectTitle, setProjectTitle] = useState(initialProjectTitle);
  const [projectDesc, setProjectDesc] = useState(initialProjectDesc);
  const [selectedRoles, setSelectedRoles] = useState(initialProjectRolesNeeded);

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
  const allFrontEndTechnologies = ["HTML/CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Svelte", "Next.js", "Redux", "Bootstrap", "Tailwind CSS", "SASS/LESS"];
  const allBackEndTechnologies = [ "Node.js", "Express.js", "Django", "Ruby on Rails", "Java", "PHP Laravel", "Kotlin", "Go", "C#" ];
  const allDesignTechnologies = ["Adobe XD", "Sketch", "Figma", "InVision", "Photoshop", "Illustrator"];
  const allProjectManagement = ["Jira", "Trello", "Asana", "Confluence", "Linear"];
  const allDevOps = ["Docker", "AWS", "Azure", "GCP", "Jenkins", "GitHub Actions", "GitLab CI/CD"];
  const allQualityAssurance = ["Selenium", "Jest", "Mocha", "Chai", "Cypress", "Postman", "JMeter"];
  const allDatabase = ["SQL", "NoSQL", "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Cassandra"];

  const [frontEnd, setFrontEnd] = useState([]);
  const [selectedFrontEnd, setSelectedFrontEnd] = useState('');
  const [frontEndList, setFrontEndList] = useState(allFrontEndTechnologies);

  const [backEnd, setBackEnd] = useState([]);
  const [selectedBackEnd, setSelectedBackEnd] = useState('');
  const [backEndList, setBackEndList] = useState(allBackEndTechnologies);

  const [design, setDesign] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState('');
  const [designList, setDesignList] = useState(allDesignTechnologies);

  const [projectManagement, setProjectManagement] = useState([]);
  const [selectedProjectManagement, setSelectedProjectManagement] = useState('');
  const [projectManagementList, setProjectManagementList] = useState(allProjectManagement);

  const [devOps, setDevOps] = useState([]);
  const [selectedDevOps, setSelectedDevOps] = useState('');
  const [devOpsList, setDevOpsList] = useState(allDevOps);

  const [qualityAssurance, setQualityAssurance] = useState([]);
  const [selectedQualityAssurance, setSelectedQualityAssurance] = useState('');
  const [qualityAssuranceList, setQualityAssuranceList] = useState(allQualityAssurance);

  const [database, setDatabase] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [databaseList, setDatabaseList] = useState(allDatabase);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'projectTitle') {
      setProjectTitle(value);
    } else if (name === 'projectDesc') {
      setProjectDesc(value);
    } else if (name === 'selectedFrontEnd') {
      setSelectedFrontEnd(value);
    } else if (name === 'selectedBackEnd') {
      setSelectedBackEnd(value);
    } else if (name === 'selectedDesign') {
      setSelectedDesign(value);
    } else if (name === 'selectedProjectManagement') {
      setSelectedProjectManagement(value);
    } else if (name === 'selectedDevOps') {
      setSelectedDevOps(value);
    } else if (name === 'selectedQualityAssurance') {
      setSelectedQualityAssurance(value);
    } else if (name === 'selectedDatabase') {
      setSelectedDatabase(value);
    } 
  };

  const handleChanges = e => {
    const { value } = e.target;
    setSelectedRoles(prevSelectedRoles => {
      if (prevSelectedRoles.includes(value)) {
        return prevSelectedRoles.filter(role => role !== value);
      } else {
        return [...prevSelectedRoles, value];
      }
    });
  };

  const handleAddFrontEnd = () => {
    if (selectedFrontEnd.trim() !== '') {
      setFrontEnd(prevFrontEnd => [...prevFrontEnd, selectedFrontEnd]);
      setFrontEndList(prevList => prevList.filter(item => item !== selectedFrontEnd));
      setSelectedFrontEnd('');
    }
  };

  const handleAddBackEnd = () => {
    if (selectedBackEnd.trim() !== '') {
      setBackEnd(prevBackEnd => [...prevBackEnd, selectedBackEnd]);
      setBackEndList(prevList => prevList.filter(item => item !== selectedBackEnd));
      setSelectedBackEnd('');
    }
  };

  const handleAddDesign = () => {
    if (selectedDesign.trim() !== '') {
      setDesign(prevDesign => [...prevDesign, selectedDesign]);
      setDesignList(prevList => prevList.filter(item => item !== selectedDesign));
      setSelectedDesign('');
    }
  };

  const handleAddProjectManagement = () => {
    if (selectedProjectManagement.trim() !== '') {
      setProjectManagement(prevProjectManagement => [...prevProjectManagement, selectedProjectManagement]);
      setProjectManagementList(prevList => prevList.filter(item => item !== selectedProjectManagement));
      setSelectedProjectManagement('');
    }
  };

  const handleAddDevOps = () => {
    if (selectedDevOps.trim() !== '') {
      setDevOps(prevDevOps => [...prevDevOps, selectedDevOps]);
      setDevOpsList(prevList => prevList.filter(item => item !== selectedDevOps));
      setSelectedDevOps('');
    }
  };

  const handleAddQualityAssurance = () => {
    if (selectedQualityAssurance.trim() !== '') {
      setQualityAssurance(prevQualityAssurance => [...prevQualityAssurance, selectedQualityAssurance]);
      setQualityAssuranceList(prevList => prevList.filter(item => item !== selectedQualityAssurance));
      setSelectedQualityAssurance('');
    }
  };

  const handleAddDatabase = () => {
    if (selectedDatabase.trim() !== '') {
      setDatabase(prevDatabase => [...prevDatabase, selectedDatabase]);
      setDatabaseList(prevList => prevList.filter(item => item !== selectedDatabase));
      setSelectedDatabase('');
    }
  };

  const removeItem = param => {
    setFrontEnd(prevFrontEnd => prevFrontEnd.filter(item => item !== param));
    setFrontEndList(prevList => [...prevList, param]);
    setBackEnd(prevBackEnd => prevBackEnd.filter(item => item !== param));
    setBackEndList(prevList => [...prevList, param]);
    setDesign(prevDesign => prevDesign.filter(item => item !== param));
    setDesignList(prevList => [...prevList, param]);
    setProjectManagement(prevProjectManagement => prevProjectManagement.filter(item => item !== param));
    setProjectManagementList(prevList => [...prevList, param]);
    setDevOps(prevDevOps => prevDevOps.filter(item => item !== param));
    setDevOpsList(prevList => [...prevList, param]);
    setQualityAssurance(prevQualityAssurance => prevQualityAssurance.filter(item => item !== param));
    setQualityAssuranceList(prevList => [...prevList, param]);
    setDatabase(prevDatabase => prevDatabase.filter(item => item !== param));
    setDatabaseList(prevList => [...prevList, param]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedProject = {
      title: projectTitle,
      description: projectDesc,
      rolesNeeded: selectedRoles,
      technologies: {
        frontend: frontEnd,
        backend: backEnd,
        design: design,
        projectManagement: projectManagement,
        devOps: devOps, 
        qualityAssurance: qualityAssurance,
        database: database,
      },
    };
    console.log('Data being sent to backend:', updatedProject); 

    try {
      const response = await fetch(`http://localhost:8000/api/v1/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
        credentials: 'include',
      });

      if (response.ok) {
        navigate(`/profile`);
      } else {
        throw new Error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error.message);
    }
  };

  return (
    <div className="h-fit overflow-scrolling">
      <header className="text-center text-xl pb-6 font-bold text-green"> Edit your project</header>
      <form className="w-full h-[90%] py-6 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center">
          <div className="w-[60%] flex flex-col">
            <Input
              label="Project Title"
              name="projectTitle"
              className="text-gray"
              value={projectTitle}
              onChange={handleChange}
            />
            <div className="mt-10">
              <Textarea
                label="About Project"
                name="projectDesc"
                className="text-gray"
                value={projectDesc}
                onChange={handleChange}
              />
            </div>
            <div className="mt-10 flex flex-row bg-black">
              <select
                name="selectedFrontEnd"
                value={selectedFrontEnd}
                onChange={handleChange}
                className="bg-black z-10 text-white outline-none"
              >
                <option value="">Select a frontend technology</option>
                {frontEndList
                  .filter(item => !frontEnd.includes(item))
                  .map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddFrontEnd}
                className="ml-2 px-4 py-1 bg-green text-black rounded-md"
              >
                Add
              </button>
            </div>
            <div className="flex flex-row mt-2">
              {frontEnd.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <div>{item}</div>
                  <XCircleIcon
                    onClick={() => removeItem(item)}
                    strokeWidth="1"
                    className="h-5 w-5 stroke-blue/50 hover:stroke-blue hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-row bg-black">
              <select
                name="selectedBackEnd"
                value={selectedBackEnd}
                onChange={handleChange}
                className="bg-black z-10 text-white outline-none"
              >
                <option value="">Select a backend technology</option>
                {backEndList
                  .filter(item => !backEnd.includes(item))
                  .map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddBackEnd}
                className="ml-2 px-4 py-1 bg-green text-black rounded-md"
              >
                Add
              </button>
            </div>
            <div className="flex flex-row mt-2">
              {backEnd.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <div>{item}</div>
                  <XCircleIcon
                    onClick={() => removeItem(item)}
                    strokeWidth="1"
                    className="h-5 w-5 stroke-blue/50 hover:stroke-blue hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-row bg-black">
              <select
                name="selectedDesign"
                value={selectedDesign}
                onChange={handleChange}
                className="bg-black z-10 text-white outline-none"
              >
                <option value="">Select a design technology</option>
                {designList
                  .filter(item => !design.includes(item))
                  .map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddDesign}
                className="ml-2 px-4 py-1 bg-green text-black rounded-md"
              >
                Add
              </button>
            </div>
            <div className="flex flex-row mt-2">
              {design.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <div>{item}</div>
                  <XCircleIcon
                    onClick={() => removeItem(item)}
                    strokeWidth="1"
                    className="h-5 w-5 stroke-blue/50 hover:stroke-blue hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-row bg-black">
              <select
                name="selectedProjectManagement"
                value={selectedProjectManagement}
                onChange={handleChange}
                className="bg-black z-10 text-white outline-none"
              >
                <option value="">Select a project management technology</option>
                {projectManagementList
                  .filter(item => !projectManagement.includes(item))
                  .map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddProjectManagement}
                className="ml-2 px-4 py-1 bg-green text-black rounded-md"
              >
                Add
              </button>
            </div>
            <div className="flex flex-row mt-2">
              {projectManagement.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <div>{item}</div>
                  <XCircleIcon
                    onClick={() => removeItem(item)}
                    strokeWidth="1"
                    className="h-5 w-5 stroke-blue/50 hover:stroke-blue hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-row bg-black">
              <select
                name="selectedDevOps"
                value={selectedDevOps}
                onChange={handleChange}
                className="bg-black z-10 text-white outline-none"
              >
                <option value="">Select a devOps technology</option>
                {devOpsList
                  .filter(item => !devOps.includes(item))
                  .map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddDevOps}
                className="ml-2 px-4 py-1 bg-green text-black rounded-md"
              >
                Add
              </button>
            </div>
            <div className="flex flex-row mt-2">
              {devOps.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <div>{item}</div>
                  <XCircleIcon
                    onClick={() => removeItem(item)}
                    strokeWidth="1"
                    className="h-5 w-5 stroke-blue/50 hover:stroke-blue hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-row bg-black">
              <select
                name="selectedQualityAssurance"
                value={selectedQualityAssurance}
                onChange={handleChange}
                className="bg-black z-10 text-white outline-none"
              >
                <option value="">Select a Quality Assurance technology</option>
                {qualityAssuranceList
                  .filter(item => !qualityAssurance.includes(item))
                  .map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddQualityAssurance}
                className="ml-2 px-4 py-1 bg-green text-black rounded-md"
              >
                Add
              </button>
            </div>
            <div className="flex flex-row mt-2">
              {qualityAssurance.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <div>{item}</div>
                  <XCircleIcon
                    onClick={() => removeItem(item)}
                    strokeWidth="1"
                    className="h-5 w-5 stroke-blue/50 hover:stroke-blue hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-row bg-black">
              <select
                name="selectedDatabase"
                value={selectedDatabase}
                onChange={handleChange}
                className="bg-black z-10 text-white outline-none"
              >
                <option value="">Select a Database technology</option>
                {databaseList
                  .filter(item => !database.includes(item))
                  .map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddDatabase}
                className="ml-2 px-4 py-1 bg-green text-black rounded-md"
              >
                Add
              </button>
            </div>
            <div className="flex flex-row mt-2">
              {database.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <div>{item}</div>
                  <XCircleIcon
                    onClick={() => removeItem(item)}
                    strokeWidth="1"
                    className="h-5 w-5 stroke-blue/50 hover:stroke-blue hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 pb-10 grid grid-cols-2 gap-4">
              {allRoles.map((role, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    name={role}
                    value={role}
                    checked={selectedRoles.includes(role)}
                    onChange={handleChanges}
                    className="mr-2"
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-end items-end">
          <button variant="gradient" color="green" className="btn-primary text-black w-[30%] ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
