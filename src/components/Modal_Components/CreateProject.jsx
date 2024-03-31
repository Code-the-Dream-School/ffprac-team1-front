
import React, { useState } from "react";
import { Input, Select, Option, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";



 const CreateProject = () => {



  const [newProject, setNewProject] = useState({ technologies: [], positionsOpen: [] });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e);
    // setNewProject(...newProject)
    // setNewProject({ ...newProject, [e.target.name]: [e.target.value] });
    // setErrors({ ...errors, [e.target.name]: '', form: '' });
  };

  const AddTechnologies = () => {

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  console.log(newProject.technologies)
    return (
      <div>
        <header className="text-center text-xl pb-6 font-bold text-green"> Create New Project</header>
        <form className="w-full py-6">
          <div className="flex flex-row justify-center">
            <div className="w-[60%] flex flex-col">
              <Input label="Project Name"  className="text-gray"/>
              <div className="mt-10">
                <Textarea label="About Project"  className=""/>
              </div>
              <div className=" mt-10 flex flex-row">
                <Select label="Select Technolohies" onClick={(e) => handleChange(e)}>
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
                <button className="btn-primary ml-8 max-w-[20%]" > Add</button>
              </div>
              <div>
                {newProject.technologies}
              </div>
              <div className=" mt-10 flex flex-row">
                <Select label="Technolohies" >
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
                <button className="btn-primary ml-8 max-w-[20%]" onClick={AddTechnologies()}> Add</button>
              </div>
            </div>
          </div>
           <div className="flex flex-row w-full justify-end">
            <button
                variant="gradient"
                color="green"
                // onClick={""}
                className="btn-primary text-black w-[30%] " 
              >Create
              </button>
            </div>
          </form>
      </div>
    )
  }

  export default CreateProject


  // Roles Needed


  // <div className="max-w-md mx-auto">
  //     <form onSubmit={handleSubmit} className="space-y-4">
  //       <div>
  //         <input
  //           type="email"
  //           name="email"
  //           value={formData.email}
  //           onChange={handleChange}
  //           placeholder="Email"
  //           className="input-area w-full"
  //         />
  //         {errors.email && <div className="text-red-500">{errors.email}</div>}
  //       </div>
  //       <div>
  //         <input
  //           type="password"
  //           name="password"
  //           value={formData.password}
  //           onChange={handleChange}
  //           placeholder="Password"
  //           className="input-area w-full"
  //         />
  //         {errors.password && <div className="text-red-500">{errors.password}</div>}
  //       </div>
  //       <button type="submit" className="btn-primary">Sign In</button>
  //       {errors.form && <div className="text-red-500">{errors.form}</div>}
  //     </form>
  //   </div>