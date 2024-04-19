import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchUserProfile, fetchProjects } from '../../util/fetchData';
import { Card } from "@material-tailwind/react";

const ApplyForRole = () => {
  const [profile, setProfile] = useState('');
  const [projects, setProjects] = useState([]);
  const [applicantFirstName, setApplicantFirstName] = useState('');
  const [applicantLastName, setApplicantLastName] = useState('');
  const [applicantContacts, setApplicantContacts] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await fetchUserProfile();
        const userProjects = await fetchProjects();

        setProfile(userProfile);
        setProjects(userProjects);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const ownProjects = profile && profile.profile && profile.profile.ownProjects;

  const handleApprove = (projectId, applicantId) => {
  };

  const handleDecline = (projectId, applicantId) => {
  };

  useEffect(() => {
    const fetchApplicant = async (userId) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/profiles/${userId}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: 'include',
          },
        );
        const { firstName, lastName, contacts, email } = response.data.profile;
        setApplicantFirstName(firstName);
        setApplicantLastName(lastName);
        setApplicantContacts(contacts);
        setApplicantEmail(email);
        if (response.status === 200) {
        }
      } catch (error) {
        console.error(
          'Error fetching applicant profile:',
          error.response ? error.response.data : error.message,
        );
      }
    };

    const fetchDataForApplicants = () => {
      if (ownProjects) {
        ownProjects.forEach(project => {
          if (project.applicants) {
            project.applicants.forEach(applicant => {
                fetchApplicant(applicant.user);
            });
          }
        });
      }
    };

    fetchDataForApplicants();
  }, [ownProjects]);

  return (
    <div className="flex justify-center mt-8">
      <Card className="w-full max-w-4xl bg-black overflow-scroll">
        <table className="w-full min-w-max table-auto text-white">
          <thead>
            <tr>
              <th className="border-b border-white bg-black p-4">
                Project Title
              </th>
              <th className="border-b border-white bg-black p-4">
                Applicant User
              </th>
              <th className="border-b border-white bg-black p-4">
                Role
              </th>
              <th className="border-b border-white bg-black p-4">
                Contacts
              </th>
              <th className="border-b border-white bg-black p-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {ownProjects &&
              ownProjects.map((project, index) => {
                const hasApplicants = project.applicants && project.applicants.length > 0;
                if (hasApplicants) {
                  return project.applicants.map((applicant, idx) => {
                    return (
                      <tr key={`${index}-${idx}`}>
                        <td className="p-4">
                          {project.title}
                        </td>
                        <td className="p-4 bg-black">
                        {applicantFirstName} {applicantLastName}
                        </td>
                        <td className="p-4">
                          {applicant.role}
                        </td>
                        <td className="p-4 bg-black">
                           <a href='mailto:' >Email: {applicantEmail}</a>
                         {applicantContacts && (
                            <>
                              {Object.entries(applicantContacts)
                                .filter(([key, value]) => value !== null)
                                .map(([key, value]) => (
                                  <div key={key}>
                                    <a href={value} target="_blank" rel="noopener noreferrer">{key}</a>
                                  </div>
                                ))}
                            </>
                          )}
                        </td>
                        <td className="p-4 bg-black">
                          <div className="flex justify-between space-x-2">
                            <button onClick={() => handleApprove(project._id, applicant.user)}>Approve</button>
                            <button onClick={() => handleDecline(project._id, applicant.user)}>Decline</button>
                          </div>
                        </td>
                      </tr>
                    );
                  });
                }
                return null;
              })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ApplyForRole;