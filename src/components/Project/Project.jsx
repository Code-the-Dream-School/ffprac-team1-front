import React from 'react';

import { IconButton } from "@material-tailwind/react";
import { Avatar, Tooltip } from "@material-tailwind/react";


// this infirmation will be fassed as a prop from 
const project = {
    name: "Revolutionary New Social Platform",
    description: "project description",
    technologies: ["React", "Tailwind", "Node.js", "Express"],
    status: "Seeking Team Members",
    rolesNeeded: ["UI designer", "React Developer", "Backend Developer"]
  }

  

const Project = () => (
  <div className="contanier-primary px-64 flex flex-col text-gray">
     <img
          src="https://source.unsplash.com/white-and-gray-optical-illusion-7JX0-bfiuxQ"
          alt="project img"
          className="max-h-60 object-cover object-center"
        />
    <div className='p-10'>
        <div className='flex flex-row'>
                <div className='flex flex-col w-1/2'>
                    <div className='text-2xl font-medium pb-4'>{ project.name } </div>
                    <img
                        size="sm"
                        variant="circular"
                        alt="tania andrew"
                        src="https://source.unsplash.com/a-rubik-cube-is-shown-on-a-white-background-fd6K_OFlnRA"
                        className="border-\4 border-grey h-36 w-36 rounded-full bject-cover object-center" 
                    />
                </div>
                <div className='flex flex-col w-1/2 items-end'>
                    <button className="btn-primary w-32 mt-3"> Apply</button>
                    <h2 className="text-[20px] font-semibold text-blue pt-1"> Project Status:</h2>
                    <p className="font-sans text-[12px] text-center font-medium pb-3">{ project.status }</p>
                    <div className="pt-2">
                        <IconButton variant="outlined" className="text-blue rounded-lg bg-blue mr-4">
                            <i className="fas fa-heart fa-xl text-black" />
                        </IconButton>
                        <IconButton variant="outlined" className="text-blue rounded-lg bg-blue">
                        <i className="fas fa-thumbs-up fa-xl text-black" />
                        </IconButton>

                    </div>
                </div>
            </div>
            {/* <hr className="my-3 text-grey/80"></hr> */}
        <div className="my-10">
            <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
                <header className="pb-3 text-xl text-blue ">About the project:</header>
                <p className="font-sans font-extralight text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, dolor repellat error soluta perspiciatis accusantium 
                        provident aperiam officiis alias? Deserunt at, saepe aut adipisci eos debitis omnis incidunt maiores animi.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, dolor repellat error soluta perspiciatis accusantium 
                        provident aperiam officiis alias? Deserunt at, saepe aut adipisci eos debitis omnis incidunt maiores animi.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, dolor repellat error soluta perspiciatis accusantium 
                        provident aperiam officiis alias? Deserunt at, saepe aut adipisci eos debitis omnis incidunt maiores animi.
                </p>
            </div>
            <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
                <h3 className="text-lg text-green/80">Technologies and languages:</h3>
                {project.technologies.map((item, index) => (
                <span key={index} className="font-sans font-extralight text-[14px]"> {item + ", "} </span>
                 ))}

                <h3 className="pt-4 text-lg text-green/80">Roles Needed::</h3>
                {project.rolesNeeded.map((item, index) => (
                <span key={index} className="font-sans font-extralight text-[14px]"> {item + ", "} </span>
                ))}

            </div>

            <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
                <h3 className="text-lg text-green/80">Project Creator:</h3>
                <div className='py-4 flex flex-row'>
                    <Tooltip content="Tania Andrew">
                        <Avatar
                        size="sm"
                        variant="circular"
                        alt="tania andrew"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        className="border-2 border-gray h-12 w-12 rounded-full hover:z-10 hover:border-green hover:cursor-pointer" 
                        />
                    </Tooltip>
                    <div className="pl-4">
                        <header>Tania Andrew</header>
                        <p className="font-sans font-extralight italic text-[11px] text-blue"> Project Manager</p>
                    </div>
                </div> 
            </div>
            <div className="my-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
                <h3 className="text-lg text-green/80">Team:</h3>
                <div className='py-4 flex flex-row'>
                    <Tooltip content="Tania Andrew">
                        <Avatar
                        size="sm"
                        variant="circular"
                        alt="tania andrew"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        className="border-2 border-gray h-10 w-10 rounded-full hover:z-10 hover:border-green hover:cursor-pointer" 
                        />
                    </Tooltip>
                    <div className="pl-4">
                        <header>Tania Andrew</header>
                        <p className="font-sans font-extralight italic text-[11px] text-blue"> Full Stack Developer</p>
                    </div>
                </div> 
                <div className='py-4 flex flex-row'>
                    <Tooltip content="Tania Andrew">
                        <Avatar
                        size="sm"
                        variant="circular"
                        alt="tania andrew"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        className="border-2 border-gray h-10 w-10 rounded-full hover:z-10 hover:border-green hover:cursor-pointer" 
                        />
                    </Tooltip>
                    <div className="pl-4">
                        <header>Tania Andrew</header>
                        <p className="font-sans font-extralight italic text-[11px] text-blue"> Designer</p>
                    </div>
                </div> 
            </div>

        </div>
    </div>
    {/* <h1>Here is a Project.</h1> */}


  </div>
);

export default Project;