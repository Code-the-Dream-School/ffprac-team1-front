
import React, { useState } from "react";
import { Input, Select, Option, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { createProject } from '../../util/fetchData';
import { XCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../AuthContext';
import axios from "axios";


 const CreateProject = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rolesNeeded: ""
  });

  const [ rolesNeeded, setRolesNeeded ] = useState([]);
  const [rolesNeededList, setRolesNeededList ] = useState([" ", "Mentor",
  "Frontend Developer", 
  "Backend Developer", 
  "Fullstack Developer", 
  "Team Lead",
  "UI/UX Designer", 
  "Project Manager", 
  "DevOps Engineer", 
  "Quality Assurance Engineer"]);

  // const [ frontEnd, setFrontEnd ] = useState([]);
  // const [frontEndList, setFrontEndList ] = useState([" ", "HTML/CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Svelte", "Next.js", "Redux", "Bootstrap", "Tailwind CSS", "SASS/LESS"]);
  
  let array = [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  const handleSelectChange=(e)=>{

    if(e !== " "){
      rolesNeeded.forEach((item, index) => {
     array[index] = item
    })
    array.push(e);
    setRolesNeeded(array)
    setFormData({ ...formData, rolesNeeded: array });

    array=[];

    let temp=rolesNeededList.filter((item) => item !== e)
    temp.forEach((item, index) => {
    array[index] = item
     })
    setRolesNeededList(array);
    }
}

  const removeItem = (param) => {
    array = []
    rolesNeededList.map((item, index) => {
      array[index] = item
     })
     array.push(param);
     setRolesNeededList(array);

     array = []
      let rolesNeededFiltered=rolesNeeded.filter((item) => item !== param)
      rolesNeededFiltered.forEach((item, index) => {
      array[index] = item
     })
     setRolesNeeded(array);
     setFormData({ ...formData, rolesNeeded: array });
    }
    
    const create = async () => {
        try {
          const result = await createProject(formData);
          console.log(result)
          console.log(result.data.project._id)
          // navigate to new ptoject
          // setTimeout(() => navigate(`/projects/${ result.data.project._id }`), 1000);
        } catch (error) {
          
        }
      }

    return (
      <div className="h-fit overflow-scrolling" >
        <header className="text-center text-xl pb-6 font-bold text-green"> Create New Project</header>
        <form className="w-full h-[90%] py-6 flex flex-col">
          <div className="flex flex-row justify-center">
            <div className="w-[60%] flex flex-col">
              <Input label="Project Name" name="title"
              value={formData.title} className="text-gray" onChange={ handleChange }/>
              <div className="mt-10">
                <Textarea label="About Project"  name="description"
              value={formData.description}  className="" onChange={ handleChange }/>
              </div>
              <div className=" mt-10 pb-10 flex flex-row bg-black">
                <Select label="Roles Needed" value={rolesNeededList} onChange={handleSelectChange} className="bg-black z-10">
                  {rolesNeededList.map((item, index) => (
                    <Option value={item} key={index}  className="bg-black h-full w-full z-10">{item}</Option>
                  ))}
                </Select>
              </div>
              <div className="">
                { rolesNeeded.map((item, index) => (
                  <div className="flex flex-row">
                     <div key={index}>{item} </div>
                     <XCircleIcon onClick={() => removeItem(item)} strokeWidth="1"  className=" h-5 w-5 stroke-blue/50 hover:stroke-blue hover:cursor-pointer"/>
                  </div>
                ))}
              </div>


            </div>
          </div>
           <div className="flex flex-row w-full justify-end items-end">
            <button
                // variant="gradient"
                color="green"
                className="btn-primary text-black w-[30%] " 
                onClick={ create }
              >Create
              </button>
            </div>
          </form>
      </div>
    )
  }

  export default CreateProject
