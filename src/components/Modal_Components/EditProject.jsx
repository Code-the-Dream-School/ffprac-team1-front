import React, { useState } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate} from "react-router-dom";


const EditProject = ({ projectId, projectTitle: initialProjectTitle, projectDesc: initialProjectDesc, projectRolesNeeded: initialProjectRolesNeeded }) => {
  const navigate = useNavigate()
  
  const [projectTitle, setProjectTitle] = useState(initialProjectTitle);
  // console.log(projectTitle);
  // console.log(projectId)

  const [projectDesc, setProjectDesc] = useState(initialProjectDesc);
  const [projectRolesNeeded, setProjectRolesNeeded] = useState(initialProjectRolesNeeded);
  
  const [frontEnd, setFrontEnd] = useState([]);
  const [selectedFrontEnd, setSelectedFrontEnd] = useState("");
  const [frontEndList, setFrontEndList] = useState([" ", "HTML/CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Svelte", "Next.js", "Redux", "Bootstrap", "Tailwind CSS", "SASS/LESS"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "projectTitle") {
      setProjectTitle(value);
    } else if (name === "projectDesc") {
      setProjectDesc(value);
    } else if (name === "projectRolesNeeded") {
      setProjectRolesNeeded(value);
    } else if (name.startsWith("technologies")) {
      const [, technologyKey] = name.split(".");
      setTechnologies((prevTechnologies) => ({
        ...prevTechnologies,
        [technologyKey]: value,
      }));
    } else {
      setSelectedFrontEnd(value);
    }
  };
  

  const handleAddFrontEnd = () => {
    if (selectedFrontEnd.trim() !== "") {
      setFrontEnd((prevFrontEnd) => [...prevFrontEnd, selectedFrontEnd]);
      setFrontEndList((prevList) => prevList.filter((item) => item !== selectedFrontEnd));
      setSelectedFrontEnd("");
    }
  };

  const removeItem = (param) => {
    setFrontEnd((prevFrontEnd) => prevFrontEnd.filter((item) => item !== param));
    setFrontEndList((prevList) => [...prevList, param]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = {
      title: projectTitle,
      description: projectDesc,
      rolesNeeded: projectRolesNeeded,
      // frontEnd
    };

    // console.log("New data:", updatedProject);

    try {
      const response = await fetch(`http://localhost:8000/api/v1/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      credentials: 'include' 
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }
      // console.log(response)
      console.log('Project updated successfully', response);
      // setProjectTitle(updatedProject.projectTitle);
      // console.log(updatedProject.projectTitle)
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
            <Input label="Project Title" name="projectTitle" className="text-gray" value={projectTitle} onChange={handleChange} />
            <div className="mt-10">
              <Textarea label="About Project" name="projectDesc" className="text-gray" value={projectDesc} onChange={handleChange} />
            </div>
            <div className="mt-10 pb-10 flex flex-row bg-black">
              <select name="selectedFrontEnd" value={selectedFrontEnd} onChange={handleChange} className="bg-black z-10 text-white outline-none">
                <option value="">Select a technology</option>
                {frontEndList.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
              <button type="button" onClick={handleAddFrontEnd} className="ml-2 px-4 py-1 bg-green text-white rounded-md">Add</button>
            </div>
            <div>
              {frontEnd.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <div>{item}</div>
                  <XCircleIcon onClick={() => removeItem(item)} strokeWidth="1" className="h-5 w-5 stroke-blue/50 hover:stroke-blue hover:cursor-pointer" />
                </div>
              ))}
            </div>
            <div>
              <Textarea label="Roles needed" name="projectRolesNeeded" className="text-gray" value={projectRolesNeeded} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-end items-end">
          <button
            variant="gradient"
            color="green"
            // onClick={""}
            className="btn-primary text-black w-[30%] "
          >Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProject;