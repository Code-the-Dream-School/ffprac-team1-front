import React, { useState, useEffect } from 'react';


const Apply = ({ projectTitle, projectRolesNeeded, projectId }) => {

  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    console.log('Selected roles:', selectedRoles);
  }, [selectedRoles]);

  const handleRoleToggle = (role) => {
    setSelectedRoles((prevSelectedRoles) => {
      if (prevSelectedRoles.includes(role)) {
        return prevSelectedRoles.filter((selectedRole) => selectedRole !== role);
      } else {
        return [...prevSelectedRoles, role];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedRoles.length === 0) {
      alert('Please select one role');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/projects/${projectId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: selectedRoles
        }),
        withCredentials: 'include', 
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      alert('You have successfully applied for the role');
    } catch (error) {
      console.error('Error submitting application:', error.message);
    }
  };

  return (
    <div className="h-fit overflow-scrolling">
      <header className="text-center text-xl pb-6 font-bold text-green">
        {' '}
        Apply for the {projectTitle} project as:{' '}
      </header>
      <form className="w-full h-[90%] py-6 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center">
          <div>
            <label>Roles needed:</label>
            <ul>
              {projectRolesNeeded.map((role) => (
                <li key={role}>
                  <input
                    type="checkbox"
                    id={`role_${role}`}
                    value={role}
                    onChange={() => {
                      handleRoleToggle(role);
                    }}
                    checked={selectedRoles.includes(role)}
                  />
                  <label htmlFor={`role_${role}`}>{role}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-row w-full justify-end items-end">
          <button
            type="submit"
            variant="gradient"
            color="green"
            className="btn-primary text-black w-[30%] "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Apply;
