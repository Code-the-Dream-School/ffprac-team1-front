import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../util/fetchData';
import { XCircleIcon } from '@heroicons/react/24/outline';

const CreateProject = ({ closeModal }) => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rolesNeeded: [],
  });

  const [rolesNeeded, setRolesNeeded] = useState([]);
  const [rolesNeededList, setRolesNeededList] = useState([
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors([]);
  };

  const handleSelectChange = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole !== 'Select...') {
      setRolesNeeded((prevRoles) => {
        const newRoles = [...prevRoles, selectedRole];
        setFormData({ ...formData, rolesNeeded: newRoles });
        return newRoles;
      });

      setRolesNeededList((prevList) => prevList.filter((item) => item !== selectedRole));
    }
  };

  const removeItem = (param) => {
    setRolesNeeded((prevRoles) => {
      const newRoles = prevRoles.filter((item) => item !== param);
      setFormData({ ...formData, rolesNeeded: newRoles });
      return newRoles;
    });

    setRolesNeededList((prevList) => {
      const newList = [...prevList, param];
      return newList.sort();
    });
  };

  const create = async () => {
    try {
      await createProject(formData);
      closeModal();
      navigate('/profile');
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors([{ message: 'Error creating project' }]);
      }
    }
  };

  return (
    <div className="max-h-[700px] overflow-y-auto">
      <header className="text-center text-xl pb-6 font-bold text-green" data-testid="header">
        Create New Project
      </header>
      <form className="w-full h-[90%] py-6 flex flex-col" data-testid="form">
        <div className="flex flex-row justify-center">
          <div className="w-[60%] flex flex-col">
            <label className="text-lg text-green/85" htmlFor="title">
              Project Name
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder=""
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent modal-input"
              data-testid="title-input"
            />

            <label className="text-lg text-green/85" htmlFor="description">
              About Project
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent modal-input"
              data-testid="description-input"
            />
            <div className="mt-6 pb-10 flex flex-row bg-black">
              <select
                label="Roles Needed"
                onChange={handleSelectChange}
                className="w-full bg-gray/5 p-2 border border-transparent focus:outline-none focus:border-blue/40 rounded border border-transparent"
                data-testid="roles-select"
                value="Select..."
              >
                <option value="Select..." className="bg-black h-full w-full z-10">Select...</option>
                {rolesNeededList.map((item, index) => (
                  <option value={item} key={index} className="bg-black h-full w-full z-10">
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-h-28" data-testid="roles-list">
              {rolesNeeded.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  <div>{item}</div>
                  <XCircleIcon
                    onClick={() => removeItem(item)}
                    strokeWidth="1"
                    className="h-4 w-4 mt-2 ml-2 stroke-blue/50 hover:stroke-blue hover:cursor-pointer"
                    data-testid={`remove-${item}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {errors.length > 0 && (
          <div className="text-red-500 text-center" data-testid="error-message">
            {errors.map((err, idx) => (
              <div key={idx}>{Object.values(err)}</div>
            ))}
          </div>
        )}
        <div className="flex flex-row w-full justify-center items-center pt-8">
          <button
            color="green"
            className="btn-primary text-black w-[30%]"
            onClick={create}
            type="button"
            data-testid="create-button"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
