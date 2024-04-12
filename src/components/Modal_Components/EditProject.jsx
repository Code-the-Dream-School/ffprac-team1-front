import React, { useState } from "react";
import { Input, Select, Option, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from '@heroicons/react/24/outline';

const EditProject = () => {

  const [ frontEnd, setFrontEnd ] = useState([]);
  const [selectedFrontEnd, setSelectedFrontEnd] = useState("");


  const [frontEndList, setFrontEndList ] = useState([" ", "HTML/CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Svelte", "Next.js", "Redux", "Bootstrap", "Tailwind CSS", "SASS/LESS"]);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedFrontEnd(selectedValue);
  }

  const handleAddFrontEnd = () => {
    if (selectedFrontEnd.trim() !== "") {
      setFrontEnd(prevFrontEnd => [...prevFrontEnd, selectedFrontEnd]);
      setFrontEndList(prevList => prevList.filter(item => item !== selectedFrontEnd));
      setSelectedFrontEnd("");
    }
  }

  const removeItem = (param) => {
    setFrontEnd(prevFrontEnd => prevFrontEnd.filter(item => item !== param));
    setFrontEndList(prevList => [...prevList, param]);
  }

  return (
    <div className="h-fit overflow-scrolling">
      <header className="text-center text-xl pb-6 font-bold text-green"> Edit your project</header>
      <form className="w-full h-[90%] py-6 flex flex-col">
        <div className="flex flex-row justify-center">
          <div className="w-[60%] flex flex-col">
            <Input label="Project Title" className="text-gray" />
            <div className="mt-10">
              <Textarea label="About Project" className="" />
            </div>
            <div className="mt-10 pb-10 flex flex-row bg-black">
              <select value={selectedFrontEnd} onChange={handleChange} className="bg-black z-10 text-white outline-none">
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
                <Textarea label="Roles needed" className="" />
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
