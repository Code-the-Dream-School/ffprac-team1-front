import React, { useState, useEffect } from 'react';
import {
  fetchUserProfile,
  fetchProjects,
  fetchApplicantsData,
  approveApplicant,
  declineApplicant,
} from '../../util/fetchData';
import { Card } from '@material-tailwind/react';

const ApplyForRole = () => {
  const [profile, setProfile] = useState(null);
  const [applicantsData, setApplicantsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [declineMessage, setDeclineMessage] = useState('');

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
    fetchApplicantsData(ownProjects, setApplicantsData, setLoading);
  }, [ownProjects]);

  const handleApprove = async (projectId, applicantId) => {
    await approveApplicant(projectId, applicantId, ownProjects, applicantsData, setSuccessMessage);
  };

  const handleDecline = async (projectId, applicantId) => {
    await declineApplicant(projectId, applicantId, ownProjects, applicantsData, setDeclineMessage);
  };

  return (
    <div className="flex justify-center mt-8 min-h-[80vh]">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Card className="w-full max-w-5xl bg-black overflow-scroll">
          {successMessage && (
            <div className="bg-green text-black text-center py-2 rounded-md">{successMessage}</div>
          )}
          {declineMessage && (
            <div className="bg-green text-black text-center py-2 rounded-md">{declineMessage}</div>
          )}
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
                            <button onClick={() => handleApprove(project._id, applicant._id)}>
                              Approve
                            </button>
                            <button onClick={() => handleDecline(project._id, applicant._id)}>
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
