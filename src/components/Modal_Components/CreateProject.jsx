
import React, { useState, useEffect } from "react";
import { Input, Select, Option, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../AuthContext';
import axios from "axios";
import { createProject } from '../../util/fetchData.js'

 const CreateProject = () => {

  const [ frontEnd, setFrontEnd ] = useState([]);
  const [frontEndList, setFrontEndList ] = useState([" ", "HTML/CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Svelte", "Next.js", "Redux", "Bootstrap", "Tailwind CSS", "SASS/LESS"]);
  
  let array = [];

    const handleChange=(e)=>{
      array = []
      if(e !== " "){
      frontEnd.forEach((item, index) => {
       array[index] = item
      })
      array.push(e);
      setFrontEnd(array);

      array=[];

      let temp=frontEndList.filter((item) => item !== e)
      temp.forEach((item, index) => {
      array[index] = item
       })
      setFrontEndList(array);
      }
 }

    const removeItem = (param) => {
      array = []
      frontEndList.forEach((item, index) => {
        array[index] = item
       })
       array.push(param);
       setFrontEndList(array);

       array = []
       let temp=frontEnd.filter((item) => item !== param)
      temp.forEach((item, index) => {
      array[index] = item
       })
      setFrontEnd(array);
      }
    
      // useEffect(() => {
      //   const fetchData = async () => {
      //       try {

      //         const response = await fetch(
      //           `http://localhost:8000/api/v1/projects`
      //         );
      //         const data = await response.json();
      //         console.log(data)
      //         // setSearchResults(sortedResults);
      //         //setLoading(false);      
      //       } catch (error) {
      //       console.error('Error:', error);
      //       //setLoading(false);
      //     }
      //   }

      //   console.log("Got Here")
      //   fetchData();
      // }, [frontEndList]);


      useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(
                `http://localhost:8000/api/v1/profiles/myProfile`, { withCredentials: true }
              );
              //console.log(response);
              const data = await response;
              
              console.log(data.data);
              // setLoading(false);      
            } catch (error) {
            console.error('Error:', error);
            // setLoading(false);
          }
        };
        console.log("Got Here")
        fetchData();
      }, [frontEndList]);
      

    return (
      <div className="h-fit overflow-scrolling" >
        <header className="text-center text-xl pb-6 font-bold text-green"> Create New Project</header>
        <form className="w-full h-[90%] py-6 flex flex-col">
          <div className="flex flex-row justify-center">
            <div className="w-[60%] flex flex-col">
              <Input label="Project Name"  className="text-gray"/>
              <div className="mt-10">
                <Textarea label="About Project"  className=""/>
              </div>
              <div className=" mt-10 pb-10 flex flex-row bg-black">
                <Select label="Front End Technolohies" value={frontEndList} onChange={handleChange} className="bg-black z-10">
                  {frontEndList.map((item, index) => (
                    <Option value={item} key={index} className="bg-black h-full w-full z-10">{item}</Option>
                  ))}
                </Select>
              </div>
              <div className="">
                {frontEnd.map((item, index) => (
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
