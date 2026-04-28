import { useState, useEffect } from 'react';

const HANDLE = 'simonlovestocode';

const useCodeforcesData = () => {
  const [submissions, setSubmissions] = useState([]);
  const [contests, setContests] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [submissionsRes, contestsRes, infoRes] = await Promise.all([
          fetch(
            `https://codeforces.com/api/user.status?handle=${HANDLE}&from=1&count=2`
          ),
          fetch(`https://codeforces.com/api/user.rating?handle=${HANDLE}`),
          fetch(`https://codeforces.com/api/user.info?handles=${HANDLE}`)
        ]);

        const submissionsData = await submissionsRes.json();
        const contestsData = await contestsRes.json();
        const infoData = await infoRes.json();

        let err = null;

        if (submissionsData.status === 'OK') {
          setSubmissions(submissionsData.result);
        } else {
          err = 'Failed to fetch submissions';
        }

        if (contestsData.status === 'OK') {
          const sortedContests = [...contestsData.result].sort(
            (a, b) => b.ratingUpdateTimeSeconds - a.ratingUpdateTimeSeconds
          );
          setContests(sortedContests);
        } else {
          err = err || 'Failed to fetch contest history';
        }

        if (infoData.status === 'OK' && infoData.result?.[0]) {
          setUserInfo(infoData.result[0]);
        }

        setError(err);
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
    userInfo,
    loading,
    error
  };
};

export default useCodeforcesData;
