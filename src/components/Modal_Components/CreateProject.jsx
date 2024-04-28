import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../util/fetchData';
import { XCircleIcon } from '@heroicons/react/24/outline';

const CreateProject = ({ closeModal }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rolesNeeded: '',
  });

  const [rolesNeeded, setRolesNeeded] = useState([]);
  const [rolesNeededList, setRolesNeededList] = useState([
    ' ',
    'Mentor',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
    'Team Lead',
    'UI/UX Designer',
    'Project Manager',
    'DevOps Engineer',
    'Quality Assurance Engineer',
  ]);

  let array = [];

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(error);
  };

  const handleSelectChange = e => {
    if (e !== ' ') {
      rolesNeeded.forEach((item, index) => {
        array[index] = item;
      });
      array.push(e.target.value);
      setRolesNeeded(array);
      setFormData({ ...formData, rolesNeeded: array });

      array = [];

      let temp = rolesNeededList.filter(item => item !== e.target.value);
      temp.forEach((item, index) => {
        array[index] = item;
      });
      setRolesNeededList(array);
    }
  };

  const removeItem = param => {
    array = [];
    rolesNeededList.map((item, index) => {
      array[index] = item;
    });
    array.push(param);
    setRolesNeededList(array);

    array = [];
    let rolesNeededFiltered = rolesNeeded.filter(item => item !== param);
    rolesNeededFiltered.forEach((item, index) => {
      array[index] = item;
    });
    setRolesNeeded(array);
    setFormData({ ...formData, rolesNeeded: array });
  };

  const create = async () => {
    try {
      const result = await createProject(formData);
      closeModal();
      navigate(`/profile`);
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating project');
    }
  };

  return (
    <div className="max-h-[700px] overflow-y-auto">
      <header className="text-center text-xl pb-6 font-bold text-green"> Create New Project</header>
      <form className="w-full h-[90%] py-6 flex flex-col">
        <div className="flex flex-row justify-center">
          <div className="w-[60%] flex flex-col">
            <label className="text-lg text-green/85">Project Name</label>
            <input
              type="text"
              name="title"
              placeholder=""
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent modal-input"
            />

            <label className="text-lg text-green/85">About Project</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent modal-input"
            />
            <div className=" mt-6 pb-10 flex flex-row bg-black">
              <select
                label="Roles Needed"
                value={rolesNeededList.toString()}
                onChange={handleSelectChange}
                className="w-full bg-gray/5 p-2 border border-transparent focus:outline-none focus:border-blue/40 rounded border border-transparent"
              >
                {rolesNeededList.map((item, index) => (
                  <option value={item} key={index} className="bg-black h-full w-full z-10">
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-h-28">
              {rolesNeeded.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <div>{item} </div>
                  <XCircleIcon
                    onClick={() => removeItem(item)}
                    strokeWidth="1"
                    className="h-4 w-4 mt-2 ml-2 stroke-blue/50 hover:stroke-blue hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="flex flex-row w-full justify-center items-center pt-8">
          <button
            // variant="gradient"
            color="green"
            className="btn-primary text-black w-[30%] "
            onClick={create}
            type="button"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
