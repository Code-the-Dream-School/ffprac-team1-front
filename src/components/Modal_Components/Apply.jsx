import React, { useState, useEffect } from 'react';

const Apply = ({ projectTitle, projectRolesNeeded, projectId }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Selected role:', selectedRole);
  }, [selectedRole]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/projects/${projectId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: selectedRole }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      alert('You have successfully applied for the role');
    } catch (error) {
      setError(error.message || 'Error submitting application');
    }
  };

  return (
    <div className="h-fit overflow-scrolling">
      <header className="text-center text-xl pb-6 font-bold text-green">
        Apply for the {projectTitle} project as:
      </header>
      <form className="w-full h-[90%] py-6 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center">
          <div>
            <label htmlFor="roleSelect">Roles needed:</label>
            {/* Добавляем классы Tailwind для изменения фона выпадающего списка */}
            <select
              id="roleSelect"
              value={selectedRole}
              onChange={handleRoleChange}
              className="bg-black text-white border-none px-4 py-2 rounded-md"
            >
              <option value="">Select a role</option>
              {projectRolesNeeded.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && <div className="text-red">{error}</div>}
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
