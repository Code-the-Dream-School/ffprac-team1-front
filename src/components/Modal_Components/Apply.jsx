import React, { useState, useEffect } from 'react';
import { Alert } from '@material-tailwind/react';
import { applyForProject } from '../../util/fetchData';

const Apply = ({ projectTitle, projectRolesNeeded, projectId, participants }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRoleChange = e => {
    setSelectedRole(e.target.value);
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    try {
      await applyForProject(projectId, selectedRole);

      setSuccess(true);
      setSelectedRole('');
    } catch (error) {
      setError(error.message || 'Error submitting application');
    }
  };

  return (
    <div className="h-fit overflow-scrolling">
      <header className="text-center text-xl pb-6 font-bold text-green">
        Apply for the {projectTitle} project {participants.map(participant => participant.role)} as:
      </header>
      <form className="w-full h-[90%] py-6 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center">
          <div>
            <label htmlFor="roleSelect">Roles needed:</label>
            <select
              id="roleSelect"
              value={selectedRole}
              onChange={handleRoleChange}
              className="bg-black text-white border-none px-4 py-2 rounded-md"
            >
              <option value="">Select a role</option>
              {projectRolesNeeded.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && <Alert color="red">{error}</Alert>}
        {success && <Alert color="green">You have successfully applied for the role</Alert>}
        <div className="flex flex-row w-full justify-end items-end">
          <button type="submit" className="btn-primary text-black w-[30%]">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Apply;
