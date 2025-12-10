import React from 'react';
import useCodeforcesData from '../hooks/useCodeforcesData';
import { formatTime, formatMemory, getVerdictColor, getDifficultyColor, getRatingColor } from '../utils/codeforcesUtils';
import { codeforcesData } from '../data/codeforcesData';
import RatingGraph from './charts/RatingGraph';
import Card from './ui/Card';
import Tag from './ui/Tag';

const Codeforces = () => {
  const { submissions, contests, loading, error } = useCodeforcesData();

  if (loading) {
    return (
      <section id="codeforces" className="section">
        <div className="container">
          <h2 className="section-title">Codeforces</h2>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#666' }}>{codeforcesData.messages.loading}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="codeforces" className="section">
        <div className="container">
          <h2 className="section-title">Codeforces</h2>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#dc3545' }}>{codeforcesData.messages.error} {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="codeforces" className="section">
      <div className="container">
        <h2 className="section-title">Codeforces</h2>
        <div className="cf-content">
          <p className="cf-description">
            {codeforcesData.description}
          </p>
          
          <div className="cf-sections">
            <div className="submissions-section">
              <h3>{codeforcesData.sections.submissions}</h3>
              <div className="submissions-grid">
                {submissions.map((submission) => (
                  <Card key={submission.id} variant="submission">
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
                          <Tag 
                            variant="rating"
                            color={getDifficultyColor(submission.problem.rating || submission.problem.points)}
                          >
                            {submission.problem.rating || submission.problem.points}
                          </Tag>
                          <span className="contest-id">
                            {codeforcesData.labels.contest} {submission.contestId}
                          </span>
                        </div>
                      </div>
                      <Tag 
                        variant="verdict"
                        color={getVerdictColor(submission.verdict)}
                      >
                        {submission.verdict}
                      </Tag>
                    </div>
                    
                    <div className="submission-details">
                      <div className="detail-row">
                        <span className="detail-label">{codeforcesData.labels.language}</span>
                        <span className="detail-value">{submission.programmingLanguage}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">{codeforcesData.labels.time}</span>
                        <span className="detail-value">{submission.timeConsumedMillis} ms</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">{codeforcesData.labels.memory}</span>
                        <span className="detail-value">{formatMemory(submission.memoryConsumedBytes)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">{codeforcesData.labels.testsPassed}</span>
                        <span className="detail-value">{submission.passedTestCount}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">{codeforcesData.labels.submitted}</span>
                        <span className="detail-value">{formatTime(submission.creationTimeSeconds)}</span>
                      </div>
                    </div>
                    
                    <div className="problem-tags">
                      {submission.problem.tags.map((tag, index) => (
                        <Tag key={index} variant="default">{tag}</Tag>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="contests-section">
              <h3>{codeforcesData.sections.contests}</h3>
              <RatingGraph contests={contests} />
              <div className="contests-list">
                {contests.slice(0, 3).map((contest) => (
                  <Card key={contest.contestId} variant="contest">
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
                          {codeforcesData.labels.rank} {contest.rank}
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
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <div className="cf-footer">
            <p className="cf-note">
              {codeforcesData.profile.footerText}{' '}
              <a 
                href={codeforcesData.profile.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="cf-link"
              >
                {codeforcesData.profile.linkText}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Codeforces;

