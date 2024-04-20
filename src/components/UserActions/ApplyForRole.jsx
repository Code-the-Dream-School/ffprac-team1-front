import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchUserProfile, fetchProjects } from '../../util/fetchData';
import { Card } from '@material-tailwind/react';

const ApplyForRole = () => {
  const [profile, setProfile] = useState(null);
  const [applicantsData, setApplicantsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await fetchUserProfile();
        const userProjects = await fetchProjects();
        setProfile({ userProfile, userProjects });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const ownProjects = profile?.userProfile?.profile?.ownProjects;

  useEffect(() => {
    const fetchApplicantsData = async () => {
      if (ownProjects) {
        setLoading(true);
        const applicantsRequests = ownProjects.flatMap(project =>
          project.applicants.map(applicant =>
            axios
              .get(`http://localhost:8000/api/v1/profiles/${applicant.user}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: 'include',
              })
              .then(response => ({
                ...response.data.profile,
                projectId: project._id,
                userId: applicant.user,
              })),
          ),
        );
        const results = await Promise.all(applicantsRequests);
        const newData = results.reduce((acc, curr) => {
          acc[curr.userId] = curr;
          return acc;
        }, {});
        setApplicantsData(newData);
        setLoading(false);
      }
    };
    fetchApplicantsData();
  }, [ownProjects]);

  const handleApprove = (projectId, applicantId) => {
    // Implement approve logic here
  };

  const handleDecline = (projectId, applicantId) => {
    // Implement decline logic here
  };

  return (
    <div className="flex justify-center mt-8">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Card className="w-full max-w-4xl bg-black overflow-scroll">
          <table className="w-full min-w-max table-auto text-white">
            <thead>
              <tr>
                <th className="border-b border-white bg-black p-4">Project Title</th>
                <th className="border-b border-white bg-black p-4">Applicant User</th>
                <th className="border-b border-white bg-black p-4">Role</th>
                <th className="border-b border-white bg-black p-4">Contacts</th>
                <th className="border-b border-white bg-black p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {ownProjects &&
                ownProjects.map((project, index) =>
                  project.applicants.map((applicant, idx) => {
                    const data = applicantsData[applicant.user];
                    if (!data) return null;
                    return (
                      <tr key={`${index}-${idx}`}>
                        <td className="p-4">{project.title}</td>
                        <td className="p-4 bg-black">
                          {data.firstName} {data.lastName}
                        </td>
                        <td className="p-4">{applicant.role}</td>
                        <td className="p-4 bg-black">
                          <a href={`mailto:${data.email}`}>Email: {data.email}</a>
                          {data.contacts &&
                            Object.entries(data.contacts)
                              .filter(([_, value]) => value !== null)
                              .map(([key, value]) => (
                                <div key={key}>
                                  <a href={value} target="_blank" rel="noopener noreferrer">
                                    {key}
                                  </a>
                                </div>
                              ))}
                        </td>
                        <td className="p-4 bg-black">
                          <div className="flex justify-between space-x-2">
                            <button onClick={() => handleApprove(project._id, applicant.user)}>
                              Approve
                            </button>
                            <button onClick={() => handleDecline(project._id, applicant.user)}>
                              Decline
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }),
                )}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};

export default ApplyForRole;
