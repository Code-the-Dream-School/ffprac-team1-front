import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';

const Projects = ({ isLoggedIn }) => {
    const location = useLocation();
    const projectTitle = location.state.projectTitle;
    const projectDesc = location.state.projectDesc;
    const projectStatus = location.state.projectStatus;
    const projectTechnologies = location.state.projectTechnologies;
    const projectRolesNeeded = location.state.projectRolesNeeded;
    
    const [projectImageFile, setProjectImageFile] = useState(null);

    const renderProjectTechnologies = technologies => {
        if (!technologies) return null;

        const allTech = [];
        for (const type in technologies) {
            allTech.push(...technologies[type]);
        }

        return (
            <div>
                {allTech.map((tech, index) => (
                    <li key={index}>• {tech}</li>
                ))}
            </div>
        );
    };

    const changeProjectImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', projectImageFile);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const responseData = await response.json();
            console.log('File uploaded successfully:', responseData);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    return (
        <div className="container-primary px-64 flex flex-col text-gray">
            <input type="file" onChange={(e) => setProjectImageFile(e.target.files[0])} />
            <img
                src={projectImageFile ? URL.createObjectURL(projectImageFile) : "https://source.unsplash.com/white-and-gray-optical-illusion-7JX0-bfiuxQ"}
                alt="project img"
                className="max-h-40 object-cover object-center"
                onClick={changeProjectImage}
            />
            <div className="p-5">
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/2">
                        <div className="text-2xl font-medium pb-4">{projectTitle}</div>
                        <img
                            size="sm"
                            variant="circular"
                            alt="project_logo"
                            src="https://source.unsplash.com/a-rubik-cube-is-shown-on-a-white-background-fd6K_OFlnRA"
                            className="border-4 border-gray h-36 w-36 rounded-full object-cover object-center"
                        />
                    </div>
                    <div className="flex flex-col w-1/2 items-end">
                        <h2 className="text-[20px] font-semibold text-blue pt-1"> Project Status:
                            <p className="font-sans text-[14px] text-center font-medium pb-3">{projectStatus}</p>
                        </h2>
                        <div className="pt-2 ">
                            <IconButton variant="outlined" className="text-blue rounded-lg bg-blue mr-4">
                                <i className="fas fa-heart fa-xl text-black" />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="my-10">
                    <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
                        <header className="pb-3 text-xl text-blue ">About the project:</header>
                        <p className="font-sans font-extralight text-sm">{projectDesc}</p>
                    </div>
                    <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
                        <h3 className="text-lg text-green/80">Technologies and languages:</h3>
                        <ul>{renderProjectTechnologies(projectTechnologies)}</ul>
                        <h3 className="pt-4 text-lg text-green/80">Roles Needed:</h3>
                        <p>{projectRolesNeeded.join(', ')}</p>
                    </div>
                    {isLoggedIn && (
                        <>
                            <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
                                <h3 className="text-lg text-green/80">Project Creator:</h3>
                                <ul>projectCreatorName</ul>
                             </div>  
                             <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
                                <h3 className="pt-4 text-lg text-green/80">Team:</h3>
                                <p>projectTeam</p>
                            </div> 
                        </>   
                    )}
                    {isLoggedIn && projectStatus === 'Seeking Team Members' && (
                        <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5 flex flex-col items-center">
                            <Link to="/apply" className="btn-primary w-32 mt-4 text-center">Apply</Link>
                        </div>
                    )}
                    {!isLoggedIn && (
                        <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5 flex flex-col items-center ">
                            <p className="text-center">
                                <em>To see more details about this project or to <strong><Link to="/register">Sign Up</Link></strong></em>
                            </p>
                            <Link to="/register" className="btn-primary w-32 mt-4 text-center">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects;
