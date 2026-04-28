import React from 'react';
import useCodeforcesData from '../hooks/useCodeforcesData';
import { formatTime, formatMemory, getVerdictColor, getDifficultyColor, getRatingColor } from '../utils/codeforcesUtils';
import { codeforcesData } from '../data/codeforcesData';
import RatingGraph from './charts/RatingGraph';
import Card from './ui/Card';
import Tag from './ui/Tag';

function codeforcesLedgerStats(contests, userInfo) {
  const contestCount = contests.length;
  const fromHistoryPeak =
    contestCount > 0
      ? Math.max(...contests.map((c) => c.newRating))
      : undefined;
  const current =
    userInfo?.rating ?? (contestCount > 0 ? contests[0].newRating : undefined);
  const peak =
    userInfo?.maxRating != null
      ? Math.max(userInfo.maxRating, fromHistoryPeak ?? 0)
      : fromHistoryPeak;

  return { current, peak, contestCount };
}

function CodeforcesRail() {
  return (
    <div className="cf-rail-stack">
      <div className="mono-label cf-ledger-rail">
        {codeforcesData.ledgerRail.line1}
        <br />
        {codeforcesData.ledgerRail.line2}
      </div>
      <a
        href={codeforcesData.profile.url}
        target="_blank"
        rel="noopener noreferrer"
        className="cf-profile-link"
        aria-label={`@${codeforcesData.profile.handle} on Codeforces`}
      >
        @{codeforcesData.profile.handle}
      </a>
    </div>
  );
}

const Codeforces = () => {
  const { submissions, contests, userInfo, loading, error } = useCodeforcesData();
  const ledger = codeforcesLedgerStats(contests, userInfo);

  if (loading) {
    return (
      <section id="codeforces" className="section">
        <div className="container">
          <div className="section-head">
            <div className="mono-label num">§ 04</div>
            <h2>
              Codeforces <em>— ledger</em>
            </h2>
          </div>
          <div className="cf-ledger">
            <CodeforcesRail />
            <div className="cf-ledger-body">
              <div className="cf-stats-summary cf-stats-summary--loading" aria-busy="true">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="cf-stats-num">—</div>
                    <div className="cf-stats-label">…</div>
                  </div>
                ))}
              </div>
              <p className="cf-loading-msg">{codeforcesData.messages.loading}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="codeforces" className="section">
        <div className="container">
          <div className="section-head">
            <div className="mono-label num">§ 04</div>
            <h2>
              Codeforces <em>— ledger</em>
            </h2>
          </div>
          <div className="cf-ledger">
            <CodeforcesRail />
            <div className="cf-ledger-body">
              <p className="cf-error-msg">
                {codeforcesData.messages.error} {error}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="codeforces" className="section">
      <div className="container">
        <div className="section-head">
          <div className="mono-label num">§ 04</div>
          <h2>
            Codeforces <em>— ledger</em>
          </h2>
        </div>
        <div className="cf-ledger">
          <CodeforcesRail />
          <div className="cf-ledger-body">
            <div className="cf-stats-summary">
              <div>
                <div className="cf-stats-num">
                  {ledger.current != null ? ledger.current : '—'}
                </div>
                <div className="cf-stats-label">
                  {codeforcesData.stats.currentRating}
                </div>
              </div>
              <div>
                <div className="cf-stats-num">
                  {ledger.peak != null ? ledger.peak : '—'}
                </div>
                <div className="cf-stats-label">{codeforcesData.stats.peak}</div>
              </div>
              <div>
                <div className="cf-stats-num">{ledger.contestCount}</div>
                <div className="cf-stats-label">
                  {codeforcesData.stats.contests}
                </div>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Codeforces;

