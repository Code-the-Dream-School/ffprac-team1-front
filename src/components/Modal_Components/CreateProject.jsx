import React, { useState } from "react";
import { Input, Select, Option, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from '@heroicons/react/24/outline';

const CreateProject = () => {
  const [frontEnd, setFrontEnd] = useState([]);
  const [frontEndList, setFrontEndList] = useState([
    " ",
    "HTML/CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Vue.js",
    "Svelte",
    "Next.js",
    "Redux",
    "Bootstrap",
    "Tailwind CSS",
    "SASS/LESS"
  ]);
  const [selectedFrontEnd, setSelectedFrontEnd] = useState("");

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedFrontEnd(selectedValue);

    if (selectedValue !== " ") {
      setFrontEnd([...frontEnd, selectedValue]);
      setFrontEndList(frontEndList.filter((item) => item !== selectedValue));
    }
  };

  const removeItem = (param) => {
    setFrontEnd(frontEnd.filter((item) => item !== param));
    setFrontEndList([...frontEndList, param]);
  };

  return (
    <div className="h-fit overflow-scrolling">
      <header className="text-center text-xl pb-6 font-bold text-green">
        Create New Project
      </header>
      <form className="w-full h-[90%] py-6 flex flex-col">
        <div className="flex flex-row justify-center">
          <div className="w-[60%] flex flex-col">
            <Input label="Project Name" className="text-gray" />
            <div className="mt-10">
              <Textarea label="About Project" className="" />
            </div>
            <div className="mt-10 pb-10 flex flex-row bg-black">
              <Select
                label="Front End Technologies"
                value={selectedFrontEnd}
                onChange={handleChange}
                className="bg-black z-10"
              >
                {frontEndList.map((item, index) => (
                  <Option
                    value={item}
                    key={index}
                    className="bg-black h-full w-full z-10"
                  >
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="">
              {frontEnd.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <div>{item} </div>
                  <XCircleIcon
                    onClick={() => removeItem(item)}
                    strokeWidth="1"
                    className="h-5 w-5 stroke-blue/50 hover:stroke-blue hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-end items-end">
          <button
            variant="gradient"
            color="green"
            // onClick={""}
            className="btn-primary text-black w-[30%]"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
