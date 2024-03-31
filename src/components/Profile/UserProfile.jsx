import React from 'react';
import { useNavigate } from 'react-router-dom';

import Project from '../Project/ProjectCard.jsx';
import Modal from '../Modal_Components/Modal.jsx';
import CreateProject  from '../Modal_Components/CreateProject.jsx'
import EditIcon  from '../Modal_Components/EditIcon.jsx'



// this infirmation will be fassed as a prop from
const profile = {
  firstName: 'Emma',
  lastName:'Smith',
  title: "Front End Developer",
  lookingFor: ['project', 'people'],
  about: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam eum obcaecati recusandae animi velit eveniet tempora reiciendis, optio, quisquam corporis possimus, impedit fugiat ab? Rem mollitia delectus doloribus odio nesciunt.",
  offering: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam eum obcaecati recusandae animi velit eveniet tempora reiciendis.",
  links: {
    linkedIn: 'linkedIn', 
    GitHub: 'GitHub', 
    Portfolio:'Portfolio',
  },
  technologies: ['React', 'Tailwind', 'Node.js', 'Express'],
  status: 'Seeking Team Members',
};
 

const Profile = () => (
  <div className="contanier-primary px-64 flex flex-col text-gray">
    
    <div className="flex flex-col w-full border border-transparent rounded-lg bg-gray/5">
      <img
            src="https://source.unsplash.com/white-and-gray-optical-illusion-7JX0-bfiuxQ"
            alt="project img"
            className="max-h-60 object-cover object-center border rounded-t-lg"
          />
        <div className="px-8 pb-8">
          <img
            size="sm"
            variant="circular"
            alt="tania andrew"
            src="https://source.unsplash.com/a-rubik-cube-is-shown-on-a-white-background-fd6K_OFlnRA"
            className="border-[5px] border-white h-36 w-36 rounded-full bject-cover object-center -mt-24"
          />
          <div className="flex flex-row pt-4">
            <div className="flex flex-col w-1/2">
            <div className="text-2xl font-bold  pb-1">{profile.firstName + " " + profile.lastName} </div>
            <div className="font-sans font-extralight text-sm text-blue italic pb-2">{profile.title} </div>
            </div>
            <div className="flex flex-col w-1/2 items-end">
             < Modal  buttonClassName={""} openModalButton ={EditIcon() } modalBody={""}/>
              <div className="font-sans font-extralight text-xs italic pb-2 pr-2">Looking for: </div>
                <div className="flex flex-row items-end">
                  <div className="font-sans font-extralight text-[13px] p-0.5 px-4 ml-2 border rounded-full text-green/80">{ profile.lookingFor[0]} </div>
                  <div className="font-sans font-extralight text-[13px] p-0.5 px-4 ml-2 border rounded-full text-green/80">{ profile.lookingFor[1]} </div>
                </div>
            </div>
          </div>
      </div>
    </div>
      <div className="">
        <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
          <header className="pb-3 text-xl text-green/85">About:</header>
          <p className="font-sans font-extralight text-sm">
            { profile.about }
          </p>
        </div>
        <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
          <header className="pb-3 text-xl text-green/85">What can I bring to the table:</header>
          <p className="font-sans font-extralight text-sm">
            { profile.about }
          </p>
        </div>
        <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
          <h3 className="text-lg text-green/80">Links:</h3>
          {Object.keys(profile.links).map((item, index) => (
            <li key={index} className="font-sans font-extralight text-[14px]">
              { item + ", "}
            </li>
          ))}
        </div>

        <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
          <div className="flex flex-row w-full justify-between">
            <h3 className="text-lg text-green/80">Your Projects:</h3>
            <div>
            < Modal openModalButton={"+ Add New Project"} buttonClassName={"btn-primary font-[Jura] min-w-44"} modalBody={CreateProject() } className=""/>
            </div>
          </div>
          
          <div className="py-4 flex flex-row">
            < Project/>
            {/* <div className="max-w-[13rem] min-w-[12rem] overflow-hidden bg-gray/10 rounded-xl border border-transparent hover:border-blue/30 mb-6 mr-8 p-4">
            <i className="fa-sharp fa-thin fa-plus fa-2xl text-blue/40 rounded-xl border border-blue/40 hover:border-gray px-3 py-5"></i>
            </div> */}
           
          </div>
        </div>
        <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
          <h3 className="text-lg text-green/80">Projects you are involved in:</h3>
          <div className="py-4 flex flex-row">

          </div>
        </div>
      </div>
  </div>
);

export default Profile;
