import { useState, useEffect } from 'react';

const useCodeforcesData = () => {
  const [submissions, setSubmissions] = useState([]);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch submissions
        const submissionsResponse = await fetch('https://codeforces.com/api/user.status?handle=simonlovestocode&from=1&count=2');
        const submissionsData = await submissionsResponse.json();
        
        // Fetch contest history
        const contestsResponse = await fetch('https://codeforces.com/api/user.rating?handle=simonlovestocode');
        const contestsData = await contestsResponse.json();
        
        if (submissionsData.status === 'OK') {
          setSubmissions(submissionsData.result);
        } else {
          setError('Failed to fetch submissions');
        }
        
        if (contestsData.status === 'OK') {
          // Sort contests in descending order (newest first)
          const sortedContests = contestsData.result.sort((a, b) => b.ratingUpdateTimeSeconds - a.ratingUpdateTimeSeconds);
          setContests(sortedContests);
        } else {
          setError('Failed to fetch contest history');
        }
      } catch (err) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    submissions,
    contests,
    loading,
    error
  };
};

export default useCodeforcesData;
