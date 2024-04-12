
import React, { useState, useEffect } from "react";
import { Input, Select, Option, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../AuthContext';
import axios from "axios";
// import { createProject } from '../../util/fetchData.js'

 const CreateProject = () => {

  const API_BASE_URL_PROJECTS = 'http://localhost:8000/api/v1/projects';

  const [ projectName, setProjectName ] = useState([]);
  const [ aboutProject, setAboutProject ] = useState([]);
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

    const handleNameChange = (e) => {
      setProjectName(e.target.value);
    }

    const handleAboutChange = (e) => {
      setAboutProject(e.target.value)
    }
  
  let array = [];

    const handleSelectChange=(e)=>{
      array = []
      if(e !== " "){
        rolesNeeded.forEach((item, index) => {
       array[index] = item
      })
      array.push(e);
      setRolesNeeded(array);

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
      rolesNeededList.forEach((item, index) => {
        array[index] = item
       })
       array.push(param);
       setRolesNeededList(array);

       array = []
       let temp=rolesNeeded.filter((item) => item !== param)
      temp.forEach((item, index) => {
      array[index] = item
       })
       setRolesNeeded(array);
      }
    

      // useEffect(() => {
      //   const fetchData = async () => {
      //       try {
      //         const response = await axios.get(
      //           `http://localhost:8000/api/v1/profiles/myProfile`, { withCredentials: true }
      //         );
      //         //console.log(response);
      //         const data = await response;
              
      //         console.log(data.data.profile);
      //         // setLoading(false);      
      //       } catch (error) {
      //       console.error('Error:', error);
      //       // setLoading(false);
      //     }
      //   };
      //   console.log("Got Here")
      //   fetchData();
      // }, [frontEndList]);
      
      useEffect(() => {
      const fetchData = async () => {
        try {
         const response = await axios.get(`http://localhost:8000/api/v1/projects`, { withCredentials: true })
         console.log(response)
         return response;
        } catch (error) {
         throw error.response.data;
        }
       };
       fetchData();
     }, [rolesNeededList]);

    //  const createProject = async ({ title, description, rolesNeeded }) => {
    //   // console.log( { title, description, rolesNeeded } )
    //   try {
    //    const response = await axios.post(`${API_BASE_URL_PROJECTS}`, {
    //     title,
    //     description,
    //     rolesNeeded
    //    }, { withCredentials: true })
    //    return response;
    //   } catch (error) {
    //    throw error.response.data;
    //   }
    //  };

    //   const create = async () => {
    //     const data = {
    //       title: projectName,
    //       description: aboutProject,
    //       rolesNeeded: rolesNeeded
    //     }
    //     try {
    //       const result = await createProject(data);
    //       if (result.status === 200) {
    //         setSuccessMessage("Registration successful!");
    //       }
    //     } catch (error) {
          
    //     }
    //   }


    return (
      <div className="h-fit overflow-scrolling" >
        <header className="text-center text-xl pb-6 font-bold text-green"> Create New Project</header>
        <form className="w-full h-[90%] py-6 flex flex-col">
          <div className="flex flex-row justify-center">
            <div className="w-[60%] flex flex-col">
              <Input label="Project Name"  className="text-gray" onChange={ handleNameChange }/>
              <div className="mt-10">
                <Textarea label="About Project"  className="" onChange={ handleAboutChange }/>
              </div>
              <div className=" mt-10 pb-10 flex flex-row bg-black">
                <Select label="Roles Needed" value={rolesNeededList} onChange={handleSelectChange} className="bg-black z-10">
                  {rolesNeededList.map((item, index) => (
                    <Option value={item} key={index} className="bg-black h-full w-full z-10">{item}</Option>
                  ))}
                </Select>
              </div>
              <div className="">
                {rolesNeeded.map((item, index) => (
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
                // onClick={ create }
              >Create
              </button>
            </div>
          </form>
      </div>
    )
  }

  export default CreateProject
