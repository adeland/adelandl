import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const CompetitiveProgramming = () => {
  const [submissions, setSubmissions] = useState([]);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch submissions
        const submissionsResponse = await fetch('https://codeforces.com/api/user.status?handle=Znoheart&from=1&count=2');
        const submissionsData = await submissionsResponse.json();
        
        // Fetch contest history
        const contestsResponse = await fetch('https://codeforces.com/api/user.rating?handle=Znoheart');
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

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatMemory = (bytes) => {
    if (bytes === 0) return '0 KB';
    const kb = bytes / 1024;
    return `${Math.round(kb)} KB`;
  };

  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case 'OK':
        return '#28a745';
      case 'WRONG_ANSWER':
        return '#dc3545';
      case 'TIME_LIMIT_EXCEEDED':
        return '#ffc107';
      case 'MEMORY_LIMIT_EXCEEDED':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  const getDifficultyColor = (rating) => {
    if (rating <= 800) return '#808080';
    if (rating <= 1000) return '#008000';
    if (rating <= 1200) return '#03a89e';
    if (rating <= 1400) return '#0000ff';
    if (rating <= 1600) return '#aa00aa';
    if (rating <= 1800) return '#ff8c00';
    if (rating <= 2000) return '#ff0000';
    return '#ff0000';
  };

  const getRatingColor = (rating) => {
    if (rating < 1200) return '#808080'; // Gray
    if (rating < 1400) return '#008000'; // Green
    if (rating < 1600) return '#03a89e'; // Cyan
    if (rating < 1900) return '#0000ff'; // Blue
    if (rating < 2200) return '#aa00aa'; // Purple
    if (rating < 2400) return '#ff8c00'; // Orange
    return '#ff0000'; // Red
  };

  const RatingGraph = ({ contests }) => {
    if (!contests || contests.length === 0) return null;

    // Sort contests chronologically for graph display (oldest to newest)
    const sortedContests = [...contests].sort((a, b) => a.ratingUpdateTimeSeconds - b.ratingUpdateTimeSeconds);
    
    // Transform data for Recharts
    const chartData = sortedContests.map(contest => ({
      date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      }),
      rating: contest.newRating,
      contestName: contest.contestName
    }));

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p className="tooltip-label">{label}</p>
            <p className="tooltip-rating">{`Rating: ${payload[0].value}`}</p>
          </div>
        );
      }
      return null;
    };
    
    return (
      <div className="rating-graph">
        <h3>Rating Progression</h3>
        <div className="graph-container">
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={chartData}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 8, fill: '#888', fontWeight: 300 }}
              />
              <YAxis 
                domain={['dataMin - 50', 'dataMax + 50']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 8, fill: '#888', fontWeight: 300 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="#666" 
                strokeWidth={2}
                dot={{ fill: '#666', strokeWidth: 0, r: 4 }}
                activeDot={{ fill: '#1a1a1a', strokeWidth: 0, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="competitive-programming" className="section">
        <div className="container">
          <h2 className="section-title">competitive programming</h2>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#666' }}>Loading submissions...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="competitive-programming" className="section">
        <div className="container">
          <h2 className="section-title">Competitive programming</h2>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#dc3545' }}>Error loading submissions: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="competitive-programming" className="section">
      <div className="container">
        <h2 className="section-title">Competitive Programming</h2>
        <div className="cp-content">
          <p className="cp-description">
            I enjoy solving algorithmic problems and participating in competitive programming contests. 
            Here are my past two submissions and contest history from Codeforces.
          </p>
          
          <div className="cp-sections">
            <div className="submissions-section">
              <h3>Recent Submissions</h3>
              <div className="submissions-grid">
                {submissions.map((submission) => (
                  <div key={submission.id} className="submission-card">
                    <div className="submission-header">
                      <div className="problem-info">
                        <h4 className="problem-name">
                          <a 
                            href={`https://codeforces.com/contest/${submission.contestId}/problem/${submission.problem.index}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="problem-link"
                          >
                            {submission.problem.index}. {submission.problem.name}
                          </a>
                        </h4>
                        <div className="problem-meta">
                          <span 
                            className="problem-rating"
                            style={{ color: getDifficultyColor(submission.problem.rating || submission.problem.points) }}
                          >
                            {submission.problem.rating || submission.problem.points}
                          </span>
                          <span className="contest-id">
                            Contest {submission.contestId}
                          </span>
                        </div>
                      </div>
                      <div 
                        className="verdict"
                        style={{ color: getVerdictColor(submission.verdict) }}
                      >
                        {submission.verdict}
                      </div>
                    </div>
                    
                    <div className="submission-details">
                      <div className="detail-row">
                        <span className="detail-label">Language:</span>
                        <span className="detail-value">{submission.programmingLanguage}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Time:</span>
                        <span className="detail-value">{submission.timeConsumedMillis} ms</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Memory:</span>
                        <span className="detail-value">{formatMemory(submission.memoryConsumedBytes)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Tests Passed:</span>
                        <span className="detail-value">{submission.passedTestCount}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Submitted:</span>
                        <span className="detail-value">{formatTime(submission.creationTimeSeconds)}</span>
                      </div>
                    </div>
                    
                    <div className="problem-tags">
                      {submission.problem.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contests-section">
              <h3>Contest History</h3>
              <RatingGraph contests={contests} />
              <div className="contests-list">
                {contests.map((contest) => (
                  <div key={contest.contestId} className="contest-card">
                    <div className="contest-header">
                      <h4 className="contest-name">
                        <a 
                          href={`https://codeforces.com/contest/${contest.contestId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contest-link"
                        >
                          {contest.contestName}
                        </a>
                      </h4>
                      <div className="contest-meta">
                        <span className="contest-date">
                          {formatTime(contest.ratingUpdateTimeSeconds)}
                        </span>
                        <span className="contest-rank">
                          Rank: {contest.rank}
                        </span>
                      </div>
                    </div>
                    <div className="rating-change">
                      <span className="old-rating">{contest.oldRating}</span>
                      <span className="arrow">→</span>
                      <span 
                        className="new-rating"
                        style={{ color: getRatingColor(contest.newRating) }}
                      >
                        {contest.newRating}
                      </span>
                      <span className="rating-delta">
                        ({contest.newRating - contest.oldRating > 0 ? '+' : ''}{contest.newRating - contest.oldRating})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="cp-footer">
            <p className="cp-note">
              View more on my{' '}
              <a 
                href="https://codeforces.com/profile/Znoheart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cp-link"
              >
                Codeforces profile
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveProgramming;
